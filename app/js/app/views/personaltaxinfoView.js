// View.js
// -------
define(["jquery",
        "backbone",
        "models/Model",
        "helpers/Helper",
        "helpers/Util",
        "helpers/Constants",
        "helpers/Mixins",
        "modelbinder",
        "text!templates/global/container.html"
        ],

    function ($,
            Backbone,
            Model,
            Helper,
            Util,
            Constants,
            Mixins,
            ModelBinder,
            questionContainer) {

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            //el: ".main-body-content", // set outside
            card: "",
            id: "",
            params: "",

            initialize: function (options) {
                this.card = options.card;
                this.person = options.person;
                this.params = options.params;
                this.ezmodel = options.ezmodel;
                this.personModel = Helper.modelGetter(this.ezmodel, this.person);

                this.primaryId = '';
                this.spouseId = '';
                this.triggerValidationOnChange = false;

                //create 2 sub templates
                this.primaryTemplate = Helper.getFile(Helper.getMarkupLocation("personaltaxinfo_sub1"));
                this.spouseTemplate = Helper.getFile(Helper.getMarkupLocation("personaltaxinfo_sub2"));

                //create a model solely for the purpse of validating fields on the page
                this.validationModel = new Model();
                this.validationModel.validation = {}
                this.validationModel.set('primary', this.ezmodel.get('primaryFiler'))
                this.validationModel.validation.primary = { required: true, msg: Constants.radioErrorMessage };
                this.validationModel.set('claimDependents', this.ezmodel.get('claimDependents'));
                this.validationModel.validation.claimDependents = { required: true, msg: Constants.radioErrorMessage };
                Backbone.Validation.bind(this, { model: this.validationModel });
                this.modelBinder = new ModelBinder();
            },

            events: {
                'click input[type=radio][name=primary]': 'togglePrimary',
                'click .spouseList input[type=radio]': 'setSpouse'
            },

            togglePrimary: function (e) {
                var id = $(e.target).attr('id').replace('primary', '');
                this.primaryId = id;
                this.spouseId = '';
                this._expandPrimary(id);
                this._updateDependentList();
            },

            setSpouse: function (e) {
                var id = $(e.target).attr('id').replace('spouse' + this.primaryId, '');
                this.spouseId = id;
                this._updateDependentList();
            },

            _expandPrimary: function (id) {
                //create the content if necessary (person id)
                var self = this;

                if (this.$('#spouseList' + id + ' [type=radio]').length == 1) {

                    _.each(this.ezmodel.get("persons"), function (person, i) {
                        if (i != id) {
                            var radioControl = _.template(self.spouseTemplate, { content: self.content, Helper: Helper, Constants: Constants, name: person.getFullName(), index: i, outerIndex: id });
                            self.$el.find('#spouseList' + id).append(radioControl);
                        }
                    });

                    //Add name of radio group to local model
                    if (this.$('#spouseList' + id + ' [type=radio]').length > 1) {
                        var newName = this.$('#spouseList' + id + ' [type=radio]:eq(1)').attr('name');
                        this.validationModel.set(newName, this.ezmodel.get('spouseOfPrimary'));
                        this.ezmodel.set('spouseOfPrimary', '');
                        this.validationModel.validation[newName] = { required: true, msg: Constants.radioErrorMessage };
                        this.modelBinder.bind(this.validationModel, this.$el);
                    }
                }
            },

            _updateDependentList: function () {
                var self = this;

                $('.dependent').each(function () {
                    var $this = $(this)

                    var depId = $this.attr('id').replace('dependent', '');
                    if (depId == self.primaryId || depId == self.spouseId) {
                        $this.attr('checked', false);
                        $this.addClass('hidden');
                        self.$('[for=' + $this.attr('id') + ']').addClass('hidden');
                    } else {
                        $this.removeClass('hidden');
                        self.$('[for=' + $this.attr('id') + ']').removeClass('hidden');
                    }

                });
            },

            render: function () {
                var self = this;
                _.bind(Mixins.renderCardTemplate, this)();

                var dependentTemplate = "<input type=\"checkbox\" class=\"dependent\" name=\"dependent<%=index%>\" id=\"dependent<%=index%>\"/>" +
                " <label class=\"checkbox-label\" for=\"dependent<%=index%>\" ><span></span><%=firstName%></label>";

                _.each(this.ezmodel.get("persons"), function (person, i) {
                    var checkbox = _.template(dependentTemplate, { firstName: person.getFullName(), index: i });
                    self.$el.find('#dependentList').append(checkbox);


                    depList = self.ezmodel.get('dependentsOfPrimary');
                    var isDep = _.contains(depList, i.toString()) ? 'on' : '';
                    self.ezmodel.set('dependentsOfPrimary', _.without(depList, i.toString()));

                    self.validationModel.set('dependent' + i, isDep);
                    self.validationModel.validation['dependent' + i] = { fn: function (value, attr, computedState) {
                        if (computedState.claimDependents == 'Yes') {
                            if (self.$('.dependent:visible').length >= 0 && self.$('.dependent:visible:checked').length == 0)
                                return Constants.checkBoxErrorMessage;
                        }
                    }
                    };

                    if (i.toString() == self.ezmodel.get('primaryFiler') || i.toString() == self.ezmodel.get('spouseOfPrimary')) {
                        self.$('#dependent' + i).attr('checked', false);
                        self.$('#dependent' + i).addClass('hidden');
                        self.$('[for=dependent' + i + ']').addClass('hidden');
                    }

                });

                //Create primary List
                _.each(this.ezmodel.get("persons"), function (person, i) {
                    var radioControl = _.template(self.primaryTemplate, { content: this.content, Helper: Helper, Constants: Constants, name: person.getFullName(), index: i });
                    self.$el.find('#primaryList').append(radioControl);

                    if (self.ezmodel.get('primaryFiler') == i) {
                        self._expandPrimary(i);
                    }
                });

                this.modelBinder.bind(this.validationModel, this.$el);

                // Maintains chainability
                return this;
            },

            isValid: function () {
                var data = this.$("input:visible, select:visible").serializeObject();
                data = Helper.checkAllVisibleElemCovered(data, this.$el);

                if (this.validationModel.set(data, { validate: true, validateAll: false })) {
                    this._saveDataToModels();
                    return true;
                }

                return false;
            },

            _saveDataToModels: function () {

                var persons = this.ezmodel.get('persons');

                var primary = this.validationModel.get('primary');
                var spouse = this.validationModel.get('spouse' + primary);
                var claimDependents = this.validationModel.get('claimDependents');

                this.ezmodel.set('primaryFiler', primary);
                this.ezmodel.set('spouseOfPrimary', spouse);
                this.ezmodel.set('claimDependents', claimDependents);

                if (claimDependents == 'Yes') {
                    var depList = _.select(_.pairs(this.validationModel.toJSON()), function (val) {
                        return (val[0].indexOf('dependent') != -1 && val[1] == 'on');
                    });
                    var depList = _.map(depList, function (val) {
                        return val[0].replace('dependent', '');
                    });

                    this.ezmodel.set('dependentsOfPrimary', depList);
                }

            }
        });

        // Returns the View class
        return View;

    }

);
