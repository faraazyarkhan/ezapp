// View.js
// -------
define(["jquery",
        "backbone",
        "helpers/Helper",
        "helpers/Util",
        "helpers/Constants",
        "helpers/Mixins",
        "text!templates/global/container.html",
        "text!templates/aian_sub.html"
        ],

    function ($,
            Backbone,
            Helper,
            Util,
            Constants,
            Mixins,
            questionContainer,
            aian_sub
            ) {

        var AIANView = Backbone.View.extend({

            // The DOM Element associated with this view
            //el: ".main-body-content", // set outside
            card: "",
            id: "",
            params: "",

            // View constructor
            initialize: function (options) {
                this.card = options.card;
                this.person = options.person;
                this.params = options.params;
                this.ezmodel = options.ezmodel;
            },

            // Renders the view's template to the UI
            render: function () {

                _.bind(Mixins.renderCardTemplate, this)();

                var outerBinder = new Backbone.ModelBinder();
                outerBinder.bind(this.ezmodel, this.$el.find('#ezapp'), { aian: '[name=aian]' });
                Backbone.Validation.bind(this, { model: this.ezmodel });

//                this.content = JSON.parse(Helper.getFile(Helper.getContentLocation(Constants.defaultLocale, this.card)));
//                var thisView = this;
//                _.each(this.ezmodel.get("persons"), function (personmodel) {
//                    thisView.subtemp = _.template(aian_sub, { content: thisView.content, name: personmodel.get("firstName") });
//                    thisView.$el.find("#dynamicNamesBox").append(thisView.subtemp);
//                    outerBinder = new Backbone.ModelBinder();
//                    outerBinder.bind(personmodel, thisView.$el.find('#' + personmodel.get("firstName")));
//                    Backbone.Validation.bind(thisView, { model: personmodel });
//                });

                return this;
            }
        });

        // Returns the View class
        return AIANView;

    }

);
