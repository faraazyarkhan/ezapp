// View.js
// -------
define(["jquery",
        "backbone",
        "helpers/Helper",
        "helpers/Util",
        "helpers/Constants",
        "helpers/Mixins",
        "views/employerView",
        "text!templates/global/container.html",
        "maskedinput"
        ],

    function ($,
            Backbone,
            Helper,
            Util,
            Constants,
            Mixins,
            employerView,
            questionContainer,
            maskedinput) {

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            //el: ".main-body-content", // set outside
            card: "",
            id: "",
            params: "",
            ezmodel: "",
            maxEmployers: 10,

            initialize: function (options) {
                this.card = options.card;
                this.person = options.person;
                this.params = options.params;
                this.ezmodel = options.ezmodel;
                this.personModel = Helper.modelGetter(this.ezmodel, this.person);

                /*var content = JSON.parse(Helper.getFile(Helper.getContentLocation(Constants.defaultLocale, this.card)));
                var sub_markup = Helper.getFile(Helper.getMarkupLocation("employment_sub1"));
                sub_template = _.template(sub_markup, { content: content, Helper: Helper, Constants: Constants });*/

            },

            events: { 'click #addEmployer': 'addEmployers' },

            addEmployers: function (e, i) {
                e.preventDefault();
                if (this.personModel.get('numEmployers') < this.maxEmployers) {

                    this.personModel.set("numEmployers", this.empViews.length + 1);
                    this.empViews.push(new employerView(this.card, this.person, this.params, this.ezmodel, this.personModel.get("employers").at(this.empViews.length), this.empViews.length + 1));
                    this.$el.find('#employers').append(this.empViews[this.empViews.length - 1].render().$el);

                    //update employer text with number
                    this.$el.find('label#empNumber:last').text("Who's the employer " + this.empViews.length + "?");
                    //add mask input for new employer
                    this.$el.find('input#phoneNumber').mask("999-999-9999");
                    this.$el.find('input#zipCode').mask("99999?-9999");

                    if (this.personModel.get('numEmployers') == this.maxEmployers) {
                        this.$el.find('#addEmployer').addClass('hidden');
                        this.$el.find('hr:last').remove();
                    }
                }
            },

            isValid: function () {
                var isValid = true;

                isValid = this.personModel.set({ employmentStatusYes: this.$el.find('[name=employmentStatusYes]').is(':checked') }, { validate: true, validateAll: false })

                if (!isValid)
                    return false;

                if (this.$el.find('[name=employmentStatusYes]').is(':checked')) {
                    for (var i = 0; i < this.empViews.length; ++i) {
                        if (this.empViews[i].isValid(true) == false)
                            isValid = false;
                    }
                } else if (this.$el.find('[name=employmentStatusSelf]').is(':checked')) {
                    var data = $("#expBox2 input:visible, #expBox2 select:visible").serializeObject();
                    data = Helper.checkAllElemCovered(data, $("#expBox2"));
                    isValid = this.personModel.set(data, { validate: true, validateAll: false })
                }

                return isValid;
            },

            render: function () {
                _.bind(Mixins.renderCardTemplate, this)();

                //Create an EmployerView for each employer of this person
                if (this.personModel.get('numEmployers') < 1)
                    this.personModel.set('numEmployers', 1);

                var empCount = this.personModel.get('numEmployers');
                this.empViews = [];
                for (var i = 0; i < empCount; ++i) {
                    this.empViews.push(new employerView(this.card, this.person, this.params, this.ezmodel, this.personModel.get("employers").at(i), i + 1));
                    this.$el.find('#employers').append(this.empViews[i].render().$el);
                }


                //Bind the attributes for the current person (there are only two on this page)
                var outerBinder = new Backbone.ModelBinder();
                outerBinder.bind(this.personModel, this.$el.find('#person'), { employmentStatusYes: '[name=employmentStatusYes]',
                    employmentStatusNo: '[name=employmentStatusNo]',
                    employmentStatusSelf: '[name=employmentStatusSelf]',
                    employeeAmount: '[name=selfEmployeeAmount]',
                    employeeHowOften: '[name=selfEmployeeHowOften]',
                    employeeAverageHoursPerWeek: '[name=selfEmployeeAverageHoursPerWeek]'
                });
                Backbone.Validation.bind(this, { model: this.personModel });

                // Maintains chainability
                return this;
            }
        });

        // Returns the View class
        return View;

    }

);
