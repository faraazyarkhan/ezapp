// View.js
// -------
define(["jquery",
        "backbone",
        "models/Model",
        "helpers/Helper",
        "helpers/Util",
        "helpers/Constants",
        "text!templates/global/bottomNavigationBar.html"
        ],

    function ($,
            Backbone,
            Model,
            Helper,
            Util,
            Constants,
            navigationTemplate) {

        var View = Backbone.View.extend({

            // View constructor
            initialize: function () {
                this.forwardText = "NEXT";

                if (this.options.card == "validation") {
                    this.forwardText = "GET ELIGIBILITY RESULTS"
                }
            },

            events: {
                'click #NextButton': 'Next',
                'click #BackButton': 'Back'
            },

            // Renders the view's template to the UI
            render: function () {
                var markup = navigationTemplate;
                var template = _.template(markup, { forwardText: this.forwardText });

                this.$el.html(template);

                if (this.options.card == 'application' || this.options.card == 'challenge')
                    this.$('#BackButton').hide();

                if (this.options.card == "validation") {
                    this.hideNext();
                }
                return this;
            },

            Next: function (e) {
                e.preventDefault();
                this.options.parent.Next();
                return false;
            },

            Back: function (e) {
                e.preventDefault();
                this.options.parent.Back();
                return false;
            },

            hideNext: function () {
                this.$el.find('#NextButton').css('visibility', 'hidden');
            },

            showNext: function () {
                this.$el.find('#NextButton').css('visibility', 'visible');
            }


        });

        // Returns the View class
        return View;

    }

);
