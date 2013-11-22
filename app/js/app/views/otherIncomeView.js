// View.js
// -------
define(["jquery",
        "backbone",
        "models/Model",
        "helpers/Helper",
        "helpers/Util",
        "helpers/Constants",
        "helpers/Mixins",
        "text!templates/global/container.html"
        ],

    function ($,
            Backbone,
            Model,
            Helper,
            Util,
            Constants,
            Mixins,
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
            },

            events: {
                'click input[type=checkbox]': 'toggleIncomeInfo'
            },

            toggleIncomeInfo: function (e) {
                var target = $(e.target).attr('data-target');
                var currentSection = $(e.target).attr('value');

                this._createSubTemplates(target, currentSection);

            },

            _createSubTemplates: function (target, currentSection) {
                if ($(target).children().length == 0) {

                    this.content = JSON.parse(Helper.getFile(Helper.getContentLocation(Constants.defaultLocale, this.card)));
                    this.sub_markup = Helper.getFile(Helper.getMarkupLocation("otherincome_sub1"));
                    this.sub_template = _.template(this.sub_markup, { content: this.content, Helper: Helper, Constants: Constants, Section: currentSection });

                    $(target).html(this.sub_template);

                    if (currentSection == "Otherincome") {
                        var markup2 = '<div class="control-group"><div class="controls"><label for="<%=Section %>Type"><%- content.otherIncomeSpecifyType_text %></label>' +
                                       '<input id="<%=Section %>Type" name="<%=Section %>Type" type="text" value=""/></div></div> ';
                        var template2 = _.template(markup2, { content: this.content, Helper: Helper, Constants: Constants, Section: currentSection });
                        $(target).prepend(template2);
                    }
                }
            },

            render: function () {
                _.bind(Mixins.renderCardTemplate, this)();

                var self = this;
                setTimeout(function () {
                    _.each(self.$el.find('input[type=checkbox]:checked'), function (el) {
                        var target = $(el).attr('data-target');
                        var currentSection = $(el).attr('value');
                        self._createSubTemplates(target, currentSection);
                        var modelBinder = new Backbone.ModelBinder();
                        modelBinder.bind(self.personModel, $(target));
                    });
                }, 0);

                // Maintains chainability
                return this;
            }
        });

        // Returns the View class
        return View;

    }

);
