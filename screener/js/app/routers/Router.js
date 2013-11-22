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
            formValidator, Services) {

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
                ":card": "index"

            },

            index: function (card, id, params) {
                card = (card) ? card : Constants.defaultCard;
                this.parentView = new parentView(card, id, params);
                $('.main-body-content').html(this.parentView.render().el);
            }


        });

        // Returns the Router class
        return Router;

    }

);