// PersonModel.js
// --------
define(["jquery", "backbone", "helpers/Util", "helpers/Constants", "helpers/DataStorage"],

    function ($, Backbone, Util, Constants, DataStorage) {

        // Creates a new Backbone PersonModel class object
        var PersonModel = Backbone.Model.extend({

            // Model Constructor
            initialize: function () {
            },

            // Default values for all of the Model attributes
            defaults: {
                employerName: "",
                employerStreetName: "",
                employerApt: "",
                employerCity: "",
                employerState: "",
                employerZip: "",
                employerCounty: "",
                employerPhoneNumber: "",
                employerExtension: "",
                employerAmount: "",
                employerHowOften: "",
                employerAverageHoursPerWeek: ""
            },

            validation: {
                employerName: { fn: 'validateemployerName' },
                employerStreetName: { fn: 'validateemployerStreetName' },
                employerCity: { fn: 'validateemployerCity' },
                employerState: { fn: 'validateemployerState' },
                employerZip: { fn: 'validateemployerZip' },
                employerCounty: { fn: 'validateemployerCounty' },
                employerPhoneNumber: { fn: 'validateemployerPhoneNumber' },
                employerAmount: { fn: 'validateemployerAmount' },
                employerAverageHoursPerWeek: { fn: 'validateemployerAverageHoursPerWeek' },
                employerHowOften: { fn: 'validateemployerHowOften' }
            },

            validateemployerName: function (value, attr, computedState) { 
                if (!value) { return Constants.EmpNameErrorMessage; } 
                else if (value) {
                   if (!Util.validateEmployerName(value)) { return Constants.specCharErrorMessage; }
                } 
            },

            validateemployerStreetName: function (value, attr, computedState) { 
                if (!value) { return Constants.EmpStreetErrorMessage; } 
                else if (value) {
                    if (!Util.validateAddress(value)) { return Constants.specCharErrorMessage; }
                } 
            },

            validateemployerCity: function (value, attr, computedState) { 
                if (!value) { return Constants.EmpCityErrorMessage; } 
                else if (value) {
                    if (!Util.validateAddress(value)) { return Constants.specCharErrorMessage; }
                } 
            },

            validateemployerState: function (value, attr, computedState) { 
                if (!value) { return Constants.stateErrorMessage; } 
            },

            validateemployerZip: function (value, attr, computedState) { 
                if (!value) { return Constants.EmpZipErrorMessage; } 
                else if (value) {
                    if (!Util.validateZipCode(value)) { return Constants.zipCodeInvalidErrorMessage; }
                } 
            },

            validateemployerCounty: function (value, attr, computedState) { 
                if (!value) { return Constants.EmpCountyErrorMessage; } 
                else if (value) {
                    if (!Util.validateGeneralName(value)) { return Constants.specCharErrorMessage; }
                } 
            },

            validateemployerPhoneNumber: function (value, attr, computedState) { 
                if (!value) { return Constants.EmpPhNumErrorMessage; } 
                else if (value) {
                    if (!Util.validatePhoneNumber(value)) { return Constants.specCharErrorMessage; }
                } 
            },

            validateemployerAmount: function (value, attr, computedState) { 
                if (!value) { return Constants.EmpEarnErrorMessage; } 
                else if (value) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                } 
            },

            validateemployerAverageHoursPerWeek: function (value, attr, computedState) { 
             //   if(this.attributes.employerHowOften.toLowerCase() == "hourly")
                if (!value) { return Constants.EmpHoursErrorMessage; } 
                else if (value) {
                    if (!Util.validateEmployeeHrs(value)) { return Constants.specCharErrorMessage; }
               } 
            },

            validateemployerHowOften: function (value, attr, computedState) { 
                if (!value) { return Constants.EmpHoursErrorMessage; } 
            },

            toJSON: function () {
                // clone all attributes
                var attributes = _.clone(this.attributes);

                // go through each attribute
                $.each(attributes, function (key, value) {
                    // check if we have some nested object with a toJSON method
                    if (_(value.toJSON).isFunction()) {
                        // execute toJSON and overwrite the value in attributes
                        attributes[key] = value.toJSON();
                    }
                });

                return attributes;
            }

        });

        // Returns the Model class
        return PersonModel;

    }

);
