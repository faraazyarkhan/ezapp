// View.js
// -------
define(["jquery",
        "backbone",
        "models/Model",
        "helpers/Helper",
        "helpers/Util",
        "helpers/Constants",
        "helpers/Mixins",
        "helpers/Services",
        "models/ServiceResponseModel",
        "text!templates/global/container.html"
        ],

    function ($,
            Backbone,
            Model,
            Helper,
            Util,
            Constants,
            Mixins,
            Services,
            ServiceResponseModel,
            questionContainer) {

        var View = Backbone.View.extend({

            card: "",
            id: "",
            params: "",

            initialize: function (options) {
                this.card = options.card;
                this.person = options.person;
                this.params = options.params;
                this.ezmodel = options.ezmodel;
            },

            events: { "click #validateApp": "validateApp" },

            validateApp: function (e) {

                if (gblServiceEnabled) {

                    var serviceResponseModel = new ServiceResponseModel();
          
                    var self = this;
                    serviceResponseModel.fetch({ type: "GET", dataType: "json", contentType: 'application/json',
                        success: function (modelData, serviceOutput, request) {
                            Util.getAuthToken(request);
                            if (serviceOutput != null) {
                                self.$el.find('#JSONContainer').html("<pre><code>" + JSON.stringify(serviceOutput, null, 4) + "</code><pre>");
                            }
                        },
                        error: function () {
                            console.log("GetEligibility service error");
                        }
                    });

                    // Call to Submit the App Data
                    //Services.SubmitAppData(this.ezmodel);

                    // Call to get the ELigibility results
                    //Services.GetEligibilityData();
                }
                e.preventDefault();
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
