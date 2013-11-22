// View.js
// -------
define(["jquery",
        "backbone",
        "helpers/Helper",
        "helpers/Util",
        "helpers/Constants",
        "helpers/Mixins",
        "text!templates/global/container.html",
        "text!templates/summary_sub.html"
        ],

    function ($,
            Backbone,
            Helper,
            Util,
            Constants,
            Mixins,
            questionContainer,
            personsummary) {

        var SummaryView = Backbone.View.extend({

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

                var modelBinder = new Backbone.ModelBinder();
                modelBinder.bind(this.ezmodel.get("poc"), this.$el.find('#poc'));

                this.content = JSON.parse(Helper.getFile(Helper.getContentLocation(Constants.defaultLocale, this.card)));
                this.subtemp = _.template(personsummary, { content: this.content, persons: this.ezmodel.get("persons") });
                this.$el.find('#persons').html(this.subtemp);

                // Maintains chainability
                return this;
            }
        });

        // Returns the View class
        return SummaryView;

    }

);
