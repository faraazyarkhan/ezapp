define(["jquery", "backbone"],

    function ($, Backbone) {
        var income = {
            UnEarnedIncome: ["otherIncomeUnemployment", "otherIncomeRetirementAccounts", "otherIncomePension", "otherIncomeCapitalGains", "otherIncomeInvestment",
                            "otherIncomeNetRentalOrRoyality", "otherIncomeAlimonyReceived"],
            OtherIncome: ["otherIncomeOtherIncome", "otherIncomeSocialSecurity"],
            Deductions: ["deductionsAlimonyPaid", "deductionsStudentLoanIntrest", "deductionsotherDeductions"],
            getTotalAmount: function (amount, frequency, hoursperweek) {

                if (hoursperweek && hoursperweek.length > 0)
                    hours = hoursperweek;
                else { hours = 40; }
                var TotalYearlyAmount;

                switch (frequency) {
                    case "Hourly":
                        var hours;
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


                if (PersonModel.employmentStatusSelf == "SelfEmployed") {
                    TotalEarnedIncome = this.getTotalAmount(parseFloat(PersonModel.selfEmployeeAmount), PersonModel.selfEmployeeHowOften, parseInt(PersonModel.selfEmployeeAverageHoursPerWeek));
                }
                if (PersonModel.employmentStatusYes == "Employed") {
                    for (var i = 0; i < PersonModel.employers.length; i++) {
                        var emp = PersonModel.employers[i];
                        TotalEarnedIncome = TotalEarnedIncome + this.getTotalAmount(parseFloat(emp.employerAmount), emp.employerHowOften, parseInt(emp.employerAverageHoursPerWeek));
                    }
                }

                if (PersonModel.otherIncomeNetFarmingOrFishing == "Netfarmingfishing") {
                    TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.NetfarmingfishingOtherIncomeAmount), PersonModel.NetfarmingfishingotherIncomeUnemploymentHowOften);
                }


                return TotalEarnedIncome;
            },
            getTotalUnEarnedIncome: function (PersonModel) {
                var TotalUnEarnedIncome = 0;
                var fieldName = "";

                for (i = 0; i < this.UnEarnedIncome.length; i++) {
                    fieldName = this.UnEarnedIncome[i];

                    switch (fieldName) {
                        case "otherIncomeUnemployment":
                            if (PersonModel.otherIncomeUnemployment == "Unemployment") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.UnemploymentOtherIncomeAmount), PersonModel.OtherincomeotherIncomeUnemploymentHowOften);
                            }
                            break;
                        case "otherIncomeRetirementAccounts":
                            if (PersonModel.otherIncomeRetirementAccounts == "Retirementaccounts") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.RetirementaccountsOtherIncomeAmount), PersonModel.RetirementaccountsotherIncomeUnemploymentHowOften);
                            }
                            break;
                        case "otherIncomePension":
                            if (PersonModel.otherIncomePension == "Pension") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.PensionOtherIncomeAmount), PersonModel.PensionotherIncomeUnemploymentHowOften);
                            }
                            break;
                        case "otherIncomeCapitalGains":
                            if (PersonModel.otherIncomeCapitalGains == "CapitalGains") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.CapitalGainsOtherIncomeAmount), PersonModel.CapitalGainsotherIncomeUnemploymentHowOften);
                            }
                            break;
                        case "otherIncomeInvestment":
                            if (PersonModel.otherIncomeInvestment == "InvestmentIncome") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.InvestmentIncomeOtherIncomeAmount), PersonModel.InvestmentIncomeotherIncomeUnemploymentHowOften);
                            }
                            break;
                        case "otherIncomeNetRentalOrRoyality":
                            if (PersonModel.otherIncomeNetRentalOrRoyality == "Netrentalroyality") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.NetrentalroyalityOtherIncomeAmount), PersonModel.NetrentalroyalityotherIncomeUnemploymentHowOften);
                            }
                            break;
                        case "otherIncomeAlimonyReceived":
                            if (PersonModel.otherIncomeAlimonyReceived == "Alimonyreceived") {
                                TotalUnEarnedIncome = TotalUnEarnedIncome + this.getTotalAmount(parseFloat(PersonModel.AlimonyreceivedOtherIncomeAmount), PersonModel.AlimonyreceivedotherIncomeUnemploymentHowOften);
                            }
                            break;
                    }

                }

                return TotalUnEarnedIncome;
            },

            getTotalOtherIncome: function (PersonModel) {
                var TotalOtherIncome = 0;
                if (PersonModel.otherIncomeOtherIncome == "Otherincome") {
                    TotalOtherIncome = this.getTotalAmount(parseFloat(PersonModel.otherIncomeOtherIncomeAmount), PersonModel.otherIncomeOtherIncomeHowOften);
                }
                if (PersonModel.otherIncomeSocialSecurity == "SSN") {
                    TotalOtherIncome = this.getTotalAmount(parseFloat(PersonModel.otherIncomeOtherIncomeAmount), PersonModel.otherIncomeOtherIncomeHowOften);
                }

                return TotalOtherIncome;

            },
            getTotalDeduction: function (PersonModel) {
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
                        case "deductionsStudentLoanIntrest":
                            if (PersonModel.deductionsStudentLoanIntrest == "on") {
                                TotalDeduction = TotalDeduction + this.getTotalAmount(parseFloat(PersonModel.deductionsStudentLoanIntrestAmount), PersonModel.deductionsStudentLoanIntrestHowOften);
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

            getNonDependentsTotalIncome: function (person) {
                var TotalHouseholdIncome = 0;
                TotalHouseholdIncome = TotalHouseholdIncome + this.getTotalEarnedIncome(person) + this.getTotalUnEarnedIncome(person)
                                                    + this.getTotalOtherIncome(person) - this.getTotalDeduction(person);
                return TotalHouseholdIncome;
            },

            getDependentsTotalIncome: function (PersonModel) {
                var EI = this.getTotalEarnedIncome(PersonModel);
                var UI = this.getTotalUnEarnedIncome(PersonModel);
                var OI = this.getTotalOtherIncome(PersonModel);
                var TotalIncome = EI + UI + OI;
                if (EI <= 5800 && UI <= 950) {
                    var newEI = EI + 300;
                    if ((newEI < 950 && TotalIncome <= 950) || (newEI >= 950 && TotalIncome <= newEI)) {
                        TotalIncome = 0;
                    }
                }
                return TotalIncome;
            },

            getFPL: function (state, noOfFam, annualIncome) {
                var skipStates = ["AS", "MP", "PR", "VI", "GU"];
                if (_.indexOf(skipStates, state) == -1) {
                    var fplData = JSON.parse($.ajax({ type: "GET", url: "js/app/data/FPL.json", async: false }).responseText);
                    var temp = (fplData[state]) ? fplData[state] : fplData["ALL"];
                    return Math.floor((annualIncome / parseFloat(temp[noOfFam])) * 100);
                }
                else return 0;
            },

            under19IsMedicaidCHIPEligibile: function (FPLValue, age, state, person) {
                var isEligibile = { isMedicaidEligible: false, isChipEligible: false, medicaidCategory: "", medicaidValue: "" };
                var adjustedFPL = FPLValue - 5;
                var stateFPL = "";
                var haveOtherCoverage = this.isOtherCoverageAvailable(person);
                var FPLData = JSON.parse($.ajax({ type: "GET", url: "js/app/data/MedicaidChip.json", async: false }).responseText);
                if (FPLData && FPLData.length > 0) {

                    var LowIncomeMedicaidChild = FPLData[state]["LowIncomeMedicaidChild"];
                    var LowIncomeCHIPChild = FPLData[state]["LowIncomeCHIPChild"];
                    if (age <= 1) {
                        stateFPL = FPLData[state]["FPLChildLessThanOne"];
                        if (stateFPL > adjustedFPL) {
                            this.returnEligibilityObj(true, false, "FPLChildLessThanOne", stateFPL);
                        }
                        else {
                            if (!haveOtherCoverage) { isEligibile = otherCoverageCheck(LowIncomeMedicaidChild, LowIncomeCHIPChild, adjustedFPL, state, age); }
                        }
                    }
                    else if (age > 1 && age <= 5) {
                        stateFPL = FPLData[state]["FPLChildBtwOneAndFive"];
                        if (stateFPL > adjustedFPL) {
                            this.returnEligibilityObj(true, false, "FPLChildBtwOneAndFive", stateFPL);
                        }
                        else {
                            if (!haveOtherCoverage) { isEligibile = otherCoverageCheck(LowIncomeMedicaidChild, LowIncomeCHIPChild, adjustedFPL, state, age); }
                        }
                    }
                    else if (age > 5) {
                        stateFPL = FPLData[state]["FPLChildOverFive"];
                        if (stateFPL > adjustedFPL) {
                            this.returnEligibilityObj(true, false, "FPLChildOverFive", stateFPL);
                        }
                        else {
                            if (!haveOtherCoverage) { isEligibile = otherCoverageCheck(LowIncomeMedicaidChild, LowIncomeCHIPChild, adjustedFPL, state, age); }
                        }
                    }
                }

                return isEligibile;
            },

            returnEligibilityObj: function (boolMedicaid, boolchip, medicaidCat, medicaidVal) {
                var isEligibile = { isMedicaidEligible: false, isChipEligible: false, medicaidCategory: "", medicaidValue: "" };
                isEligibile.isMedicaidEligible = boolMedicaid;
                isEligibile.isChipEligible = boolchip
                isEligibile.medicaidCategory = medicaidCat;
                isEligibile.medicaidValue = medicaidVal;
            },

            over19IsMedicaidCHIPEligibile: function (FPLValue, age, state, person, hoursWorked, hasDependents) {
                var isEligibile = { isMedicaidEligible: false, isChipEligible: false, medicaidCategory: "", medicaidValue: "" };
                var adjustedFPL = FPLValue - 5;
                var stateFPL = "";

                var FPLData = JSON.parse($.ajax({ type: "GET", url: "js/app/data/MedicaidChip.json", async: false }).responseText);
                stateFPL = FPLData[state]["FPLChildBtw19And21"];

                if (age > 19 && age < 21 && state && stateFPL.length > 0 && stateFPL > adjustedFPL) {
                    isEligibile = this.returnEligibilityObj(false, false, "FPLChildBtw19And21", state);
                }
                if (hasDependents) {
                    if (hoursWorked < 100) {
                        stateFPL = FPLData[state]["FPLParentCaretaker"];
                        if (stateFPL > adjustedFPL) { this.returnEligibilityObj(true, false, "FPLParentCaretaker", stateFPL) }
                    }
                    stateFPL = FPLData[state]["FPLAdultGroup"];
                    if (stateFPL && stateFPL.length > 0 && stateFPL > adjustedFPL) { this.returnEligibilityObj(true, false, "FPLAdultGroup", 0) }
                }
                return isEligibile;
            },

            hoursWorked: function (PersonModel) {
                var hoursWorked = 0;
                if (PersonModel.employmentStatusSelf == "SelfEmployed") {
                    hoursWorked = parseFloat(PersonModel.selfEmployeeAverageHoursPerWeek);
                }
                if (PersonModel.employmentStatusYes == "Employed") {
                    for (var i = 0; i < PersonModel.employers.length; i++) {
                        var emp = PersonModel.employers[i];
                        hoursWorked = hoursWorked + parseFloat(emp.employerAverageHoursPerWeek);
                    }
                }
                return hoursWorked;
            },

            otherCoverageCheck: function (LowIncomeMedicaidChild, LowIncomeCHIPChild, FPL, state, age) {
                //Here we need to check based on the high and low ages.
                var isEligibile = { isMedicaidEligible: false, isChipEligible: false, medicaidCategory: "", medicaidValue: "" };

                if (LowIncomeMedicaidChild && LowIncomeMedicaidChild.length > 0 && LowIncomeCHIPChild && LowIncomeCHIPChild.length > 0) {
                    var ageRangeData = JSON.parse($.ajax({ type: "GET", url: "js/app/data/AgeRange.json", async: false }).responseText);
                    var ageLow = "";
                    var ageHigh = "";

                    if (LowIncomeMedicaidChild.length > 0) {
                        //do the low income child calc 
                        ageLow = parseInt(ageRangeData[state]["LowIncomeMedicaidChild"]["Low"]);
                        ageHigh = parseInt(ageRangeData[state]["LowIncomeMedicaidChild"]["High"]);

                        if (age >= ageLow && age <= ageHigh) {
                            if (LowIncomeMedicaidChild > FPL) {
                                this.returnEligibilityObj(true, false, "LowIncomeMedicaidChild", LowIncomeMedicaidChild);
                            }
                        }
                    }
                    //!isEligibile.isMedicaidEligible &&
                    if (LowIncomeCHIPChild.length > 0) {
                        ageLow = parseInt(ageRangeData[state]["LowIncomeCHIPChild"]["Low"]);
                        ageHigh = parseInt(ageRangeData[state]["LowIncomeCHIPChild"]["High"]);

                        if (age >= ageLow && age <= ageHigh) {
                            if (LowIncomeCHIPChild > FPL) {
                                this.returnEligibilityObj(false, true, "LowIncomeCHIPChild", LowIncomeCHIPChild);
                            }
                        }
                    }
                }

                return isEligibile;

            },

            isOtherCoverageAvailable: function (model) {
                var bOtherCoverageAvailable = false;
                var otherCoverages = ["TypeMedicaid", "TypeCHIP", "TypeMedicare", "TypeTricare", "TypeVA", "TypePeace", "TypeEGHP", "TypeIndividualInsurance", "TypeOther"];
                _.each(otherCoverages, function (value) {
                    if (model[value] && model[value].length > 0)
                        return bOtherCoverageAvailable = true;
                });
                return bOtherCoverageAvailable;

            }
        };
        return income;

    }); 
