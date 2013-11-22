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
                this.parent = options.parent;
            },

            events: {
                "click [name=attestation]": 'toggleNext'
            },

            toggleNext: function (e) {
                if ($(e.target).attr('value').toLowerCase() == 'yes') {
                    this.parent.navView.showNext()
                } else {
                    this.parent.navView.hideNext()
                }
            },

            render: function () {
                _.bind(Mixins.renderCardTemplate, this)();

                // Maintains chainability
                return this;
            }
        });

        // Returns the View class
        return View;

    }

);
