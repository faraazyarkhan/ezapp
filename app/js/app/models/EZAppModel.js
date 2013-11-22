// EZAppModel.js
// --------
define(["jquery", "backbone", "helpers/Util", "helpers/Constants", "models/PersonModel", "models/HouseHoldContactModel", "helpers/income"],

    function ($, Backbone, Util, Constants, PersonModel, HouseHoldContactModel, income) {

        // Creates a new Backbone EZAppModel class object
        var EZAppModel = Backbone.Model.extend({

            // Model Constructor
            initialize: function () {
                this.on("change:noOfFamily", this._onNoOfFamilyChanged);
                //this.set('noOfFamily', '3')
            },

            // Default values for all of the Model attributes
            defaults: {
                firstJobState: "",
                coverage: "",
                noOfFamily: "1",
                needAssistance: "Yes",
                isIncomeBelowPovertyLevel: "",
                isAnyoneEnrolled: "",
                renewalAgreement: "",
                coverageRenewalPeriod: "",
                haveOtherCoverage: "",
                otherCoverageType: "",
                livingoutside: "",
                attestation: "",
                coverageState: "",
                persons: [],
                poc: new HouseHoldContactModel()

                //                TO BE REMOVED LATER
                //                incarceration: "",
                //                nameOfInsurance: "",
                //                policyNumber: "",
                //                isCOBRACoverage: "",
                //                isRetireePlan: "",
                //                incarceration: "",
                //                incarcerationPersonName: "",
                //                incarcerationPendingCharges: "",
                //                aian: ""
            },

            validation: {
                firstJobState: { required: true, msg: Constants.stateErrorMessage },
                coverage: { required: true, msg: Constants.radioErrorMessage },
                noOfFamily: { fn: 'validatenoOfFamily' },
                needAssistance: { required: true, msg: Constants.radioErrorMessage },
                isIncomeBelowPovertyLevel: { fn: 'validateisIncomeBelowPovertyLevel' },
                renewalAgreement: { required: true, msg: Constants.radioErrorMessage },
                coverageRenewalPeriod: { fn: 'validatecoverageRenewalPeriod' },
                livingoutside: { required: true, msg: Constants.radioErrorMessage },
                attestation: { required: true, msg: Constants.radioErrorMessage },
                aian: { required: true, msg: Constants.radioErrorMessage }
            },

            validatenoOfFamily: function (value, attr, computedState) {
                if (!value && computedState.coverage && (computedState.coverage === "selfandfamily" || computedState.coverage === "otherfamily")) {
                    return Constants.dropDownErrorMessage;
                }
            },

            validateisIncomeBelowPovertyLevel: function (value, attr, computedState) {
                if (!value && computedState.needAssistance && (computedState.needAssistance === "NotSure")) {
                    return Constants.radioErrorMessage;
                }
            },

            validatecoverageRenewalPeriod: function (value, attr, computedState) {
                if (!value && computedState.renewalAgreement && (computedState.renewalAgreement === "disagree")) {
                    return Constants.radioErrorMessage;
                }
            },

            _onNoOfFamilyChanged: function () {
                var noOfFamily = this.attributes.noOfFamily;
                var persons = this.attributes.persons;
                while (noOfFamily > persons.length)
                    persons.push(new PersonModel());
                while (noOfFamily < persons.length)
                    persons.pop();
            },

            toJSON: function () {
                // clone all attributes
                var attributes = _.clone(this.attributes);

                attributes.poc = attributes.poc.toJSON();
                attributes.persons = _.map(attributes.persons, function (person) {
                    return person.toJSON();
                })
                return attributes;
            },

            getAnnualHouseHoldIncome: function () {
                var totalHouseholdIncome = 0;
                var self = this;
                _.each(this.attributes.persons, function (person) {
                    var dependent = person.isDependentOfPrimary(self);
                    totalHouseholdIncome = totalHouseholdIncome + person.getPersonsIncome(dependent);
                });

                return totalHouseholdIncome;
            },

            calculateFPL: function () {
                return income.getFPL(this.attributes.coverageState, this.attributes.noOfFamily, this.getAnnualHouseHoldIncome());
            },

            getAdjustedAnnualHouseholdIncome: function () {

                var totalAdjustedHouseholdIncome = 0;
                var self = this, fpl = this.calculateFPL();
                var hoursWorked = this.getHoursworked();
                var hasDependents = (this.dependentsOfPrimary && this.dependentsOfPrimary.length > 0) ? true : false;
                _.each(this.attributes.persons, function (person) {
                    if (!person.isMedicaidCHIPEligibile(fpl, self.attributes.coverageState, hoursWorked, hasDependents)) {
                        var dependent = person.isDependentOfPrimary(self);
                        totalAdjustedHouseholdIncome = totalAdjustedHouseholdIncome + person.getPersonsIncome(dependent);
                    }
                });

                return totalAdjustedHouseholdIncome;
            },

            getHoursworked: function () {
                var hoursWorked = 0;
                var self = this;
                _.each(this.attributes.persons, function (person) {
                    if (!person.isDependentOfPrimary(self)) {
                        hoursWorked = hoursWorked + person.getHours();
                    }
                });
                return hoursWorked;
            }
        });

        // Returns the Model class
        return EZAppModel;
    }
);
