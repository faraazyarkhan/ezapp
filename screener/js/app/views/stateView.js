// View.js
// -------
define(["jquery",
        "backbone",
        "models/Model",
        "helpers/Helper",
        "helpers/Util",
        "helpers/Constants",
        "text!templates/global/container.html",
        "views/questionView"
        ],

    function ($,
            Backbone,
            Model,
            Helper,
            Util,
            Constants,
            questionContainer,
            questionView) {

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            //el: ".main-body-content", // set outside
            card: "",
            id: "",
            params: "",

            // View constructor
            initialize: function (options) {
                this.card = options.card;
                this.id = options.id;
                this.params = options.params;
            },

            // Renders the view's template to the UI
            render: function () {

                var markup = Helper.getFile(Helper.getMarkupLocation(this.card));
                try {
                    var content = JSON.parse(Helper.getFile(Helper.getContentLocation(Constants.defaultLocale, this.card)));
                    var containerMarkup = _.template(questionContainer, { content: content, Helper: Helper, Constants: Constants });
                    var template = _.template(markup, { content: content, Helper: Helper, Constants: Constants }); ///Todo: pass existing data
                    this.$el.html(containerMarkup);
                    this.$el.find('.censusGroup').html(template)
                } catch (e) {
                    this.$el.html("There was an error parsing the JSON request.");
                }

                // Maintains chainability
                return this;
            },




        });

        // Returns the View class
        return View;

    }

);
