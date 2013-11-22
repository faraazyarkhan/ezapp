define(["jquery", "backbone"],

    function ($, Backbone) {
        var income = {
            UnEarnedIncome: ["otherIncomeUnemployment", "otherIncomeRetirementAccounts", "otherIncomePension", "otherIncomeCapitalGains", "otherIncomeInvestment",
                            "otherIncomeNetRentalOrRoyality", "otherIncomeNetFarmingOrFishing", "otherIncomeAlimonyReceived"],
            OtherIncome: ["otherIncomeOtherIncome"],
            Deductions: ["deductionsAlimonyPaid", "deductionsStudentLoan", "deductionsotherDeductions"],
            getTotalAmount: function (amount, frequency, hoursperweek) {

                var TotalYearlyAmount;

                switch (frequency) {
                    case "Hourly":
                        var hours;
                        if (hoursperweek.length > 0)
                            hours = hoursperweek;
                        else {
                            hours = 40;
                        }
                        TotalYearlyAmount = amount * 52 * hours;
                        break;

                    case "Weekly":
                        TotalYearlyAmount = amount * 52;
                        break;
                    case "Every 2 weeks":
                        TotalYearlyAmount = amount * 26;
                        break;
                    case "Twice a month":
                        TotalYearlyAmount = amount * 24;
                        break;
                    case "Monthly":
                        TotalYearlyAmount = amount * 12;
                        break;
                    case "Yearly":
                        TotalYearlyAmount = amount;
                        break;
                }

                return TotalYearlyAmount
            },

            getTotalEarnedIncome: function (PersonModel) {
                var TotalEarnedIncome = 0;

                if (PersonModel.employmentStatus != "NotEmployed") {

                    TotalEarnedIncome = this.getTotalAmount(parseFloat(PersonModel.employeeAmount), PersonModel.employeeHowOften, parseInt(PersonModel.employeeAverageHoursPerWeek));

                }

                return TotalEarnedIncome;
            },
            getTotalUnEarnedIncome: function (PersonModel) {
                var TotalUnEarnedIncome = 0;
                var fieldName = "";

                for (i = 0; i < this.Deductions.length; i++) {
                    fieldName = this.UnEarnedIncome[i];

                    switch (fieldName) {
                        case "otherIncomeUnemployment":
                            if (PersonModel.otherIncomeUnemployment == "on") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.otherIncomeUnemploymentAmount), PersonModel.otherIncomeUnemploymentHowOften);
                            }
                            break;
                        case "otherIncomeRetirementAccounts":
                            if (PersonModel.otherIncomeRetirementAccounts == "on") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.otherIncomeRetirementAccountsAmount), PersonModel.otherIncomeRetirementAccountsHowOften);
                            }
                            break;
                        case "otherIncomePension":
                            if (PersonModel.otherIncomePension == "on") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.otherIncomePensionAmount), PersonModel.otherIncomePensionHowOften);
                            }
                            break;
                        case "otherIncomeCapitalGains":
                            if (PersonModel.otherIncomeCapitalGains == "on") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.otherIncomeCapitalGainsAmount), PersonModel.otherIncomeCapitalGainsHowOften);
                            }
                            break;
                        case "otherIncomeInvestment":
                            if (PersonModel.otherIncomeInvestment == "on") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.otherIncomeInvestmentAmount), PersonModel.otherIncomeInvestmentHowOften);
                            }
                            break;
                        case "otherIncomeNetRentalOrRoyality":
                            if (PersonModel.otherIncomeNetRentalOrRoyality == "on") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.otherIncomeNetRentalOrRoyalityAmount), PersonModel.otherIncomeNetRentalOrRoyalityHowOften);
                            }
                            break;
                        case "otherIncomeNetFarmingOrFishing":
                            if (PersonModel.otherIncomeNetFarmingOrFishing == "on") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.otherIncomeNetFarmingOrFishingAmount), PersonModel.otherIncomeNetFarmingOrFishingHowOften);
                            }
                            break;
                        case "otherIncomeAlimonyReceived":
                            if (PersonModel.otherIncomeAlimonyReceived == "on") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.otherIncomeAlimonyReceivedAmount), PersonModel.otherIncomeAlimonyReceivedHowOften);
                            }
                            break;

                    }

                }

                return TotalUnEarnedIncome;
            },

            getTotalOtherIncome: function (PersonModel) {
                var TotalOtherIncome = 0;
                if (PersonModel.otherIncomeOtherIncome == "on") {

                    TotalOtherIncome = this.getTotalAmount(parseFloat(PersonModel.otherIncomeOtherIncomeAmount), PersonModel.otherIncomeOtherIncomeHowOften);

                }

                return TotalOtherIncome;

            },
            getTotalDeduction: function(PersonModel) {
                var TotalDeduction = 0;
                var fieldName = "";

                for (i = 0; i < this.Deductions.length; i++) {
                    fieldName = this.Deductions[i];

                    switch (fieldName) {
                        case "deductionsAlimonyPaid":
                            if (PersonModel.deductionsAlimonyPaid == "on") {
                                TotalDeduction = TotalDeduction + this.getTotalAmount(parseFloat(PersonModel.deductionsAlimonyPaidAmount), PersonModel.deductionsAlimonyPaidHowOften);
                            }
                            break;
                        case "deductionsStudentLoan":
                            if (PersonModel.deductionsStudentLoan == "on") {
                                TotalDeduction = TotalDeduction + this.getTotalAmount(parseFloat(PersonModel.deductionsStudentLoanAmount), PersonModel.deductionsStudentLoanHowOften);
                            }
                            break;
                        case "deductionsotherDeductions":
                            if (PersonModel.deductionsotherDeductions == "on") {
                                TotalDeduction = TotalDeduction + this.getTotalAmount(parseFloat(PersonModel.deductionsotherDeductionsAmount), PersonModel.deductionsotherDeductionsHowOften);
                            }
                            break;
                    }

                }

                return TotalDeduction;
            
            },
            getTotalHouseHoldIncome: function (ezAppModel) {

                var TotalHouseholdIncome = 0;

                if (ezAppModel.persons.length > 0) {
                    for (var i = 0; i < ezAppModel.persons.length; i++) {

                        var person = ezAppModel.persons[i];

                        if (person.needHealthCoverage == "Yes")
                            TotalHouseholdIncome = TotalHouseholdIncome + this.getTotalEarnedIncome(person) + this.getTotalUnEarnedIncome(person) + this.getTotalOtherIncome(person) - getTotalDeduction(person);
                    }

                }

                return TotalHouseholdIncome;
            }
        };
        return income;
    });
