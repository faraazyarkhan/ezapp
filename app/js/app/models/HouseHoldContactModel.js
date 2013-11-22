// HouseHoldContactModel.js
// --------
define(["jquery", "backbone", "helpers/Util", "helpers/Constants", "helpers/DataStorage"],

    function ($, Backbone, Util, Constants, DataStorage) {

        // Creates a new Backbone HouseHoldContactModel object
        var HouseHoldContactModel = Backbone.Model.extend({

            // Model Constructor
            initialize: function () {
            },


            // Default values for all of the Model attributes
            defaults: {
                firstName: "",
                lastName: "",
                middleName: "",
                suffix: "",
                needInfoByEmail: "",
                emailAddress: "",
                isMailingAddress: "",
                preferredLanguage: "",
                streetName: "",
                apt: "",
                city: "",
                state: "",
                zip: "",
                county: "",
                phoneNumber: "",
                extension: "",
                phonetype: "",

                streetNameMailing: "",
                aptMailing: "",
                cityMailing: "",
                stateMailing: "",
                zipMailing: "",
                countyMailing: ""
            },

            validation: {
                firstName: { required: true, pattern: 'allowedSpecCharName' },
                middleName: { required: false, pattern: 'allowedSpecCharName' },
                lastName: { required: true, pattern: 'allowedSpecCharName' },
                streetName: { required: false, pattern: 'allowedSpecCharAddress' },
                apt: { required: false, pattern: 'allowedSpecCharAddress' },
                city: { required: false, pattern: 'allowedSpecCharAddress' },
                zip: { required: false, pattern: 'zipCode' },
                county: { required: false, pattern: 'allowedSpecCharAddress' },
                phoneNumber: { required: true },
                extension: { required: false, pattern: 'digits' },
                phonetype: { fn: 'validatephonetype' },
                isMailingAddress: { required: true, msg: Constants.radioErrorMessage },
                needInfoByEmail: { required: true, msg: Constants.radioErrorMessage },
                emailAddress: { fn: 'validateemailAddress' },
                streetNameMailing: { fn: 'validatestreetNameMailing' },
                cityMailing: { fn: 'validatecityMailing' },
                stateMailing: { fn: 'validatestateMailing' },
                zipMailing: { fn: 'validatezipMailing' },
                countyMailing: { fn: 'validatecountyMailing' }
            },

            validateemailAddress: function (value, attr, computedState) {
                if (!value && computedState.needInfoByEmail && (computedState.needInfoByEmail === "Yes")) {
                    return Constants.emailErrorMessage;
                } else if (value && computedState.needInfoByEmail && (computedState.needInfoByEmail === "Yes")) {
                    if (!Util.validateEmailAddress(value)) { return Constants.emailInvalidErrorMessage; }
                }
            },

            validatestreetNameMailing: function (value, attr, computedState) {
                if (!value && computedState.isMailingAddress && (computedState.isMailingAddress === "No")) {
                    return Constants.streetErrorMessage;
                } else if (value && computedState.isMailingAddress && (computedState.isMailingAddress === "No")) {
                    if (!Util.validateAddress(value)) { return Constants.specCharErrorMessage; }
                }
            },

            validatecityMailing: function (value, attr, computedState) {
                if (!value && computedState.isMailingAddress && (computedState.isMailingAddress === "No")) {
                    return Constants.cityErrorMessage;
                } else if (value && computedState.isMailingAddress && (computedState.isMailingAddress === "No")) {
                    if (!Util.validateAddress(value)) { return Constants.specCharErrorMessage; }
                }
            },

            validatezipMailing: function (value, attr, computedState) {
                if (!value && computedState.isMailingAddress && (computedState.isMailingAddress === "No")) {
                    return Constants.zipCodeErrorMessage;
                }
                else if (value && computedState.isMailingAddress && (computedState.isMailingAddress === "No")) {
                    if (!Util.validateZipCode(value)) { return Constants.zipCodeInvalidErrorMessage; }
                }
            },

            validatestateMailing: function (value, attr, computedState) {
                if (!value && computedState.isMailingAddress && (computedState.isMailingAddress === "No")) {
                    return Constants.stateErrorMessage;
                }
            },

            validatecountyMailing: function (value, attr, computedState) {
                if (!value && computedState.isMailingAddress && (computedState.isMailingAddress === "No")) {
                    return Constants.countyErrorMessage;
                } else if (value && computedState.isMailingAddress && (computedState.isMailingAddress === "No")) {
                    if (!Util.validateAddress(value)) { return Constants.specCharErrorMessage; }
                }
            },

            validatephonetype: function (value, attr, computedState) {
                if (!value) { return Constants.dropDownErrorMessage; }
            }
        });

        // Returns the Model class
        return HouseHoldContactModel;

    }

);


