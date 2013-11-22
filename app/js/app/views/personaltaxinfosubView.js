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
                this.personModel = Helper.modelGetter(this.ezmodel, this.person);

                //get the template


            },

            render: function () {
                var self = this;
                _.bind(Mixins.renderCardTemplate, this)();


                //do model binding
                //do validation binding
                //render view


                // Maintains chainability
                return this;
            }
        });

        // Returns the View class
        return View;

    }

);
