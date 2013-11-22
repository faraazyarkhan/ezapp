// Model.js
// --------
define(["jquery", "backbone", "helpers/Constants"],

    function ($, Backbone, Constants) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            // Model Constructor
            initialize: function () {

            },

            // Default values for all of the Model attributes
            defaults: {
                app: '',
                aud: '',
                needHealthCoverage: '',
                taxFilingStatus: '',
                taxFilingDependentQuestion: '',
                taxFilingDependentCondition: '',
                taxFilingNoDependent: '',
                citizenQuestion: '',
                isUSCitizen: '',
                employmentStatus: '',
                pregnant: '',
                willBeClaimedAsDependent: '',
                isFulltimeStudent: '',
                isCoveredbyTribal: '',
                isIncarcerated: '',
                wasInFosterCare: '',
                applyingCoverageState: '',
                XAuthToken: '',
                coverage: "",
                noOfFamily: "",
                needAssistance: "",
                isIncomeBelowPovertyLevel: ""
            },

            validation: {
                app: { required: true, msg: Constants.radioErrorMessage },
                aud: { required: true, msg: Constants.radioErrorMessage },
                needHealthCoverage: function (value) { if (value == '' || value == null) { return Constants.radioErrorMessage; } },
                taxFilingStatus: { fn: 'validatetaxFilingStatus' },
                taxFilingDependentQuestion: { fn: 'validatetaxFilingDependentQuestion' },
                taxFilingDependentCondition: { fn: 'validatetaxFilingDependentCondition' },
                taxFilingNoDependent: { fn: 'validatetaxFilingNoDependent' },
                isUSCitizen: function (value) { if (value == '' || value == null) { return Constants.radioErrorMessage; } },
                employmentStatus: { required: true, msg: Constants.radioErrorMessage },
                pregnant: { required: true, msg: Constants.radioErrorMessage },
                willBeClaimedAsDependent: { required: true, msg: Constants.radioErrorMessage },
                isFulltimeStudent: { required: true, msg: Constants.radioErrorMessage },
                isCoveredbyTribal: { required: true, msg: Constants.radioErrorMessage },
                wasInFosterCare: { required: true, msg: Constants.radioErrorMessage },
                applyingCoverageState: { required: true, msg: Constants.stateErrorMessage },
                isIncarcerated: { required: true, msg: Constants.radioErrorMessage },
                citizenQuestion: { fn: 'validatecitizenQuestion' },
                outsideState: { required: true, msg: Constants.radioErrorMessage },
                noFixedAddress: { required: true, msg: Constants.radioErrorMessage },
                coverage: { required: true, msg: Constants.radioErrorMessage },
                noOfFamily: { fn: 'validatenoOfFamily' },
                //needAssistance: { required: true, msg: Constants.needAssistanceErrorMessage },
                needAssistance: { fn: 'validateneedAssistance' }
            },

            validateneedAssistance: function (value, attr, computedState) {
                if (!value) { return Constants.needAssistanceErrorMessage; } 
                else if (value && (computedState.needAssistance === "NotSure")) {return Constants.needAssistanceErrorMessage; }
            },

            validatenoOfFamily: function (value, attr, computedState) {
                if (!value && computedState.coverage && (computedState.coverage === "you_family" || computedState.coverage === "other_family")) { return Constants.dropDownErrorMessage; }
            },

            validatetaxFilingStatus: function (value, attr, computed) {
                if (!value && computed.needHealthCoverage && (computed.needHealthCoverage === "Yes")) { return Constants.radioErrorMessage; }
            },

            validatetaxFilingDependentQuestion: function (value, attr, computed) {
                if (!value && computed.needHealthCoverage && (computed.needHealthCoverage === "Yes")) { return Constants.radioErrorMessage; }
            },

            validatetaxFilingDependentCondition: function (value, attr, computed) {
                if (!value && computed.needHealthCoverage && (computed.needHealthCoverage === "Yes")) { return Constants.radioErrorMessage; }
            },

            validatetaxFilingNoDependent: function (value, attr, computed) {
                if (!value && computed.needHealthCoverage && (computed.needHealthCoverage === "Yes")) { return Constants.radioErrorMessage; }
            },

            validatecitizenQuestion: function (value, attr, computed) {
                if (!value && computed.isUSCitizen && (computed.isUSCitizen === "Yes")) { return Constants.radioErrorMessage; }
            },

            passesModalTest: function (card) {
                var atrs = this.attributes;
                String.prototype.lower = String.prototype.toLowerCase;

                if (card == "application") {
                //    if (atrs.app.lower() == "yes")
                //        return false;
                //} else if (card == "audience") {
                    //if (atrs.aud.lower() == "sbiz")
                    //    return false;
                } else if (card == "screener") {
                    if(atrs.needHealthCoverage.lower() == 'no')
                        return false;
                    if (atrs.needHealthCoverage.lower() == 'yes' && (atrs.taxFilingStatus.lower() == 'mfs' || atrs.taxFilingStatus.lower() == 'not'))
                        return false;
                    if(atrs.isUSCitizen.lower() == 'no')
                        return false;
                    if(atrs.employmentStatus.lower() == 'yes')
                        return false;
                    if(atrs.pregnant.lower() == 'yes')
                        return false;
                    if(atrs.willBeClaimedAsDependent.lower() == 'yes')
                        return false;
                    if(atrs.isFulltimeStudent.lower() == 'yes')
                        return false;
                    if(atrs.isCoveredbyTribal.lower() == 'yes')
                        return false;
                    if (atrs.wasInFosterCare.lower() == 'yes')
                        return false;
                    if (atrs.isIncarcerated.lower() == 'yes')
                        return false;
                }
                return true;
            }

        });

        // Returns the Model class
        return Model;
    }
);
