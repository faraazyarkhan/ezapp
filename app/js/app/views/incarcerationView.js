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
            },

            render: function () {
                var self = this;
                _.bind(Mixins.renderCardTemplate, this)();

                var content = JSON.parse(Helper.getFile(Helper.getContentLocation(Constants.defaultLocale, this.card)));
                var personListTemplate = Helper.getFile(Helper.getMarkupLocation("incarceration_sub1"));;
                _.each(this.ezmodel.get("persons"), function (person) {
                    var checkbox1 = _.template(personListTemplate, { name: person.get("firstName"), content: content });
                    self.$el.find('#nameList').append(checkbox1);                    
                });

                // Maintains chainability
                return this;
            }
        });

        // Returns the View class
        return View;

    }

);
