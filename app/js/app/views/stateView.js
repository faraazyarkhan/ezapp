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

            // View constructor
            initialize: function (options) {
                this.card = options.card;
                this.person = options.person;
                this.params = options.ezmodel;
            },

            events: {'change #state-select' : 'toggleStateBlurb'},

            toggleStateBlurb: function(e){
                e.preventDefault();

                if(_.contains(Constants.SBMStates, e.target.value)){
                }else{
                }
            },

            // Renders the view's template to the UI
            render: function () {

                _.bind(Mixins.renderCardTemplate, this)();

                // Maintains chainability
                return this;
            },




        });

        // Returns the View class
        return View;

    }

);
