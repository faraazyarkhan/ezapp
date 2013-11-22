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

            },

            events: {
                'click #NextButton': 'Next',
                'click #BackButton': 'Back'
            },

            // Renders the view's template to the UI
            render: function () {
                var markup = navigationTemplate;
                var template = _.template(markup, {});

                this.$el.html(template);

                if (this.options.card == 'application' || this.options.card == 'challenge')
                    this.$('#BackButton').hide();

                return this;
            },

            Next: function () {
                this.options.parent.Next();
                return false;
            },

            Back: function () {
                this.options.parent.Back();
                return false;
            },

            hideNext: function () {
                this.$el.find('#NextButton').css('visibility', 'hidden');
                this.$el.find('#NextButton').css('opacity', '0');

            },

            showNext: function () {
                this.$el.find('#NextButton').css('visibility', 'visible');
                this.$el.find('#NextButton').css('opacity', '1');
            }

        });

        // Returns the View class
        return View;

    }

);
