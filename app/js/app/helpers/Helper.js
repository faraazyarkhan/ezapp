define(["jquery", "backbone", "helpers/Util", "helpers/Constants", "helpers/Navigation", "blockui", "store", "helpers/DataStorage", "models/PersonModel"],

    function ($, Backbone, Util, Constants, Navigation, blockui, store, dataStorage, personModel) {

        var Helper = {

            validationHelper: function (attrs) {
                var errors = [];

            },

            checkAllElemCovered: function (data, form) {
                for (prop in data) { if (data[prop] instanceof Array) { data[prop] = data[prop][0] } }
                var temp = {};
                form.find('input[name]').each(function () { temp[this.name] = ""; });
                return _.extend(temp, data);
            },

            checkAllVisibleElemCovered: function (data, form) {
                for (prop in data) { if (data[prop] instanceof Array) { data[prop] = data[prop][0] } }
                var temp = {};
                form.find('input[name]:visible').each(function () { temp[this.name] = ""; });
                return _.extend(temp, data);
            },

            cleanupView: function (view) {
                if (view !== undefined) {
                    view.undelegateEvents();
                    view.$el.removeData().unbind();
                    view.remove();
                    view.unbind();
                }
            },

            blockUIHlpr: function () {
                $.blockUI({ message: '<p class="block-title">Please Wait<p><img src="img/pleasewait.gif"/></p><p>Please wait while we retrieve your content</p>' });
            },

            unBlockUIHlpr: function () {
                $.unblockUI();
            },

            getMarkupLocation: function (card) {
                return Constants.markupLocation + card + ".html";
            },

            getContentLocation: function (locale, card) {
                return Constants.contentLocation + locale + "_" + card + ".json";
            },

            getFile: function (location) {
                return $.ajax({
                    type: "GET",
                    url: location,
                    async: false
                }).responseText;
            },

            getFormValues: function () {
                return $('#form1 input:visible, #form1 select:visible').serialize();
            },

            navigateForward: function (card, person, form, model) {
                Navigation.forward(card, person, form, model);
            },

            navigateBackward: function (card, person, form, model) {
                Navigation.backward(card, person, form, model);
            },

            taxableIncomeEstimate: function (person) {
                var annualIncomeEstimate = 0;
                var taxableIncome = 0;
                var deductibles = 0;
                var otherIncome = 0;
                var income = person.employer1Amount;
                annualIncomeEstimate = this.annualAmount(person.employer1Amount, person.employer1HowOften, person.employer1AverageHoursPerWeek);

                /*****Deductions******/
                if (person.deductionsAlimonyPaid === true) {
                    deductibles += this.annualAmount(person.deductionsAlimonyPaidAmount, person.deductionsAlimonyHowOften);
                }

                if (person.deductionsStudentLoanIntrest === true) {
                    deductibles += this.annualAmount(person.deductionsStudentLoanIntrestAmount, person.deductionsStudentLoanIntrestHowOften);
                }

                if (person.deductionsotherDeductions === true) {
                    deductibles += this.annualAmount(person.deductionsotherDeductionsAmount, person.deductionsotherDeductionsHowOften);
                }

                /******************/

                /*****Other income******/

                if (person.otherIncomeUnemployment === true) {
                    otherIncome += this.annualAmount(person.otherIncomeUnemploymentAmount, person.otherIncomeUnemploymentHowOften);
                }

                if (person.otherIncomePension === true) {
                    otherIncome += this.annualAmount(person.otherIncomePensionAmount, person.otherIncomePensionHowOften);
                }

                if (person.otherIncomeSocailSecurity === true) {
                    otherIncome += this.annualAmount(person.otherIncomeUnemploymentAmount, person.otherIncomeUnemploymentHowOften);
                }

                if (person.otherIncomeRetirementAccounts === true) {
                    otherIncome += this.annualAmount(person.otherIncomeRetirementAccountsAmount, person.otherIncomeRetirementAccountsHowOften);
                }

                if (person.otherIncomeAlimonyReceived === true) {
                    otherIncome += this.annualAmount(person.otherIncomeAlimonyReceivedAmount, person.otherIncomeAlimonyReceivedHowOften);
                }

                if (person.otherIncomeNetFarmingOrFishing === true) {
                    otherIncome += this.annualAmount(person.otherIncomeNetFarmingOrFishingAmount, person.otherIncomeNetFarmingOrFishingHowOften);
                }

                if (person.otherIncomeNetRentalOrRoyality === true) {
                    otherIncome += this.annualAmount(person.otherIncomeNetRentalOrRoyalityAmount, person.otherIncomeNetRentalOrRoyalityHowOften);
                }

                if (person.otherIncomeOtherIncome === true) {
                    otherIncome += this.annualAmount(person.otherIncomeOtherIncomeAmount, person.otherIncomeOtherIncomeHowOften);
                }
                /*******************/
                taxableIncome = annualIncomeEstimate - deductibles + otherIncome;
                return taxableIncome;
            },

            annualAmount: function (amount, howOften, hoursPerWeek) {
                var calculatedAmount = 0;
                if (amount !== "" && !isNaN(amount)) {
                    switch (howOften.toUpperCase()) {
                        case "YEARLY":
                            calculatedAmount = amount;
                            break;
                        case "WEEKLY":
                            calculatedAmount = amount * 52;
                            break;
                        case "2WEEKS":
                            calculatedAmount = amount * 26;
                            break;
                        case "MONTHLY":
                            calculatedAmount = amount * 12;
                            break;
                        case "TWICEAMONTH":
                            calculatedAmount = amount * 24;
                            break;
                        case "HOURLY":
                            calculatedAmount = amount * 52 * hoursPerWeek;
                            break;
                    }
                }
                return calculatedAmount;

            },

            annualAmount: function (amount, howOften) {
                var calculatedAmount = 0;
                if (amount !== "" && !isNaN(amount)) {
                    switch (howOften.toUpperCase()) {
                        case "YEARLY":
                            calculatedAmount = amount;
                            break;
                        case "WEEKLY":
                            calculatedAmount = amount * 52;
                            break;
                        case "2WEEKS":
                            calculatedAmount = amount * 26;
                            break;
                        case "MONTHLY":
                            calculatedAmount = amount * 12;
                            break;
                        case "TWICEAMONTH":
                            calculatedAmount = amount * 24;
                            break;
                    }
                }
                return calculatedAmount;

            },

            modelGetter: function (ezmodel, person) {
                var current = parseFloat(person);
                current = ((!current) ? 1 : parseFloat(current));
                if (!isNaN(current) && ezmodel.get("persons")[current - 1]) {
                    return ezmodel.get("persons")[current - 1];
                }
                else if (!isNaN(current)) {
                    ezmodel.get("persons")[current - 1] = new personModel();
                    return ezmodel.get("persons")[current - 1];
                }
                else {
                    ezmodel.get("persons")[0] = new personModel();
                    return ezmodel.get("persons")[0];
                }
            }
        };

        return Helper;
    });
