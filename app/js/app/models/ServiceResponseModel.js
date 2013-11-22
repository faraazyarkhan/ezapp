// ServiceResponseModel.js
// --------
define(["jquery", "backbone"],

    function ($, Backbone) {

        // Creates a new Backbone Model class object
        var ServiceResponseModel = Backbone.Model.extend({

            url: function() {
                return gblEligibilityResultsServiceURL;
            },

            // Model Constructor
            initialize: function () {

            },

            // Default values for all of the Model attributes
            defaults: {

                eligibilityVerificationResponseVersion: "",
                currentRequestTimestamp: "",
                ezAppID: "",
                insuranceApplicantPersons: "",
                irsHouseholdIncomeAmount: "",
                aptcInformation: "",
                householdIncomeInconsistencyIndicator: "",
                householdSSAResponse: "",
                householdIRSResponse: "",
                inconsistencyStatus: "",

                submitStatus: "",
                application_id: "",
                submission_url: ""

            },


            parse: function (data, service) {
                
                /*
                if (typeof data !== 'undefined') {
                      data = JSON.parse(JSON.stringify(data).replace(/ns2:/g, "").replace(/apit:/g, ""));

                      if (service == 'GetEligibilityData') this.eligibilityResponseMapping(this, data);
                      if (service == 'HeartbeatPoll') this.heartbeatResponseMapping(this, data);
                      if (service == 'SubmitAppData') this.submitResponseMapping(this, data);
                    
                }
                */
            },


            // Mapping function that updates the model from the response
            eligibilityResponseMapping: function (model, eligibility) {
                model.set({ eligibilityVerificationResponseVersion: eligibility.EligibilityVerificationResponseVersion });
                model.set({ currentRequestTimestamp: eligibility.CurrentRequestTimestamp });
                model.set({ ezAppID: eligibility.EZAppID });
                model.set({ insuranceApplicantPersons: eligibility.InsuranceApplicantPersons });
                model.set({ irsHouseholdIncomeAmount: eligibility.IRSHouseholdIncomeAmount });
                model.set({ aptcInformation: eligibility.APTCInformation });
                model.set({ householdIncomeInconsistencyIndicator: eligibility.HouseholdIncomeInconsistencyIndicator });
                model.set({ householdSSAResponse: eligibility.HouseholdSSAResponse });
                model.set({ householdIRSResponse: eligibility.HouseholdIRSResponse });
                model.set({ inconsistencyStatus: eligibility.InconsistencyStatus });
            },

            heartbeatResponseMapping: function (model, heartbeat) {
                model.set({ heartbeatStatus: heartbeat.Status });
                model.set({ ssa: heartbeat.ssa });
                model.set({ irs: heartbeat.irs });
                model.set({ ffm: heartbeat.ffm });
            },


            submitResponseMapping: function (model, submit) {
                model.set({ submitStatus: submit.Status });
                model.set({ application_id: submit.application_id });
                model.set({ submission_url: submit.submission_url });
            },


            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function (attrs) {

            }

        });

        // Returns the Model class
        return ServiceResponseModel;

    }

);
