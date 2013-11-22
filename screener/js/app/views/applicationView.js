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
                this.id = options.id;
                this.params = options.params;

                this.message = "Placeholder text";
            },

            render: function () {
                _.bind(Mixins.renderCardTemplate, this)();
                _.bind(Mixins.dynamicBlockingMessage, this)('app', 'app-yes', 'app-message', this.message, this.options.parent);

                // Maintains chainability
                return this;
            }
        });

        // Returns the View class
        return View;

    }

);
