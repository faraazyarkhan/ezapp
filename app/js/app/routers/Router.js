// Router.js
// ----------------
define(["jquery",
        "backbone",
        "views/parentView",
        "helpers/Helper",
        "helpers/Util",
        "helpers/Constants",
        "collections/Collection",
        "formValidatorConfig",
        "formValidator",
        "helpers/Services"],

    function ($,
            Backbone,
            parentView,
            Helper,
            Util,
            Constants,
            Collection,
            formValidatorConfig,
            formValidator,
            Services) {

        var Router = Backbone.Router.extend({

            initialize: function () {
                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();
            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index",
                ":card/:params": "index",
                ":card/": "index",
                ":card": "index",
                ":card/:person/:params": "index",
                ":card/:person/": "index"

            },

            index: function (card, person, params) {
                card = (card) ? card : Constants.defaultCard;
                this.parentView = new parentView(card, person, params);
                $('.main-body-content').html(this.parentView.render().el);
                if (card === "assistance")
                    Services.HeartbeatPoll();

                if (card == "challenge") //first card
                    $(document).scrollTop($('#skip-nav').offset().top);
                else
                    $(document).scrollTop($('#content-start').offset().top);
            }
        });

        // Returns the Router class
        return Router;

    }

);