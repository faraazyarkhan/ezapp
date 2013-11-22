// PersonModel.js
// --------
define(["jquery", "backbone", "helpers/Util", "helpers/Constants", "collections/EmployersCollection", "models/EmployerModel", "helpers/income"],

    function ($, Backbone, Util, Constants, EmployersCollection, EmployerModel, Income) {

        // Creates a new Backbone PersonModel class object
        var PersonModel = Backbone.Model.extend({

            // Model Constructor
            initialize: function () {
                this.set('employers', new EmployersCollection());
                this.on("change:numEmployers", this._numEmployersChanged);
            },

            // Default values for all of the Model attributes
            defaults: {
                firstName: "",
                isPrimary: "",
                lastName: "",
                middleName: "",
                suffix: "",
                sex: "",
                relationship: "",
                dob: "",
                ssn: "",
                sendInfoByEmail: "",
                preferredLanguage: "",
                pregnant: "",
                expectedBabyCount: "",
                nameOfSpouse: "",
                spouse: "",
                claimDependents: "",
                willClaimDependent: "",
                willBeClaimedAsDependent: "",
                nameOfDependent: "",
                needHealthCoverage: "",
                existingMedicalCondition: "",
                needsPhysicalAssistance: "",
                wantMedicalBillingAssitance: "",
                isLivingWithUnderAge: "",
                isFulltimeStudent: "",
                wasInFosterCare: "",
                changeOfJobStatus: "",

                numEmployers: 0,
                employmentStatusYes: "",
                employmentStatusNo: "",
                employmentStatusSelf: "",
                selfEmployeeAmount: "",
                selfEmployeeHowOften: "",
                selfEmployeeAverageHoursPerWeek: "",
                employers: null,

                deductionsAlimonyPaid: '',
                deductionsAlimonyPaidAmount: "",
                deductionsAlimonyHowOften: "",
                deductionsStudentLoanIntrest: '',
                deductionsStudentLoanIntrestAmount: "",
                deductionsStudentLoanIntrestHowOften: "",
                deductionsotherDeductions: '',
                deductionsotherDeductionsType: '',
                deductionsotherDeductionsAmount: "",
                deductionsotherDeductionsHowOften: "",
                deductionsNone: "",

                otherIncomeUnemployment: "",
                UnemploymentOtherIncomeAmount: "",
                UnemploymentotherIncomeUnemploymentHowOften: "",
                otherIncomePension: "",
                PensionOtherIncomeAmount: "",
                PensionotherIncomeUnemploymentHowOften: "",
                otherIncomeSocialSecurity: "",
                SSNOtherIncomeAmount: "",
                SSNotherIncomeUnemploymentHowOften: "",
                otherIncomeCapitalGains: "",
                CapitalGainsOtherIncomeAmount: "",
                CapitalGainsotherIncomeUnemploymentHowOften: "",
                otherIncomeInvestment: "",
                InvestmentIncomeOtherIncomeAmount: "",
                InvestmentIncomeotherIncomeUnemploymentHowOften: "",
                otherIncomeRetirementAccounts: "",
                RetirementaccountsOtherIncomeAmount: "",
                RetirementaccountsotherIncomeUnemploymentHowOften: "",
                otherIncomeAlimonyReceived: "",
                AlimonyreceivedOtherIncomeAmount: "",
                AlimonyreceivedotherIncomeUnemploymentHowOften: "",
                otherIncomeNetFarmingOrFishing: "",
                NetfarmingfishingOtherIncomeAmount: "",
                NetfarmingfishingotherIncomeUnemploymentHowOften: "",
                otherIncomeNetRentalOrRoyality: "",
                NetrentalroyalityOtherIncomeAmount: "",
                NetrentalroyalityotherIncomeUnemploymentHowOften: "",
                otherIncomeOtherIncome: "",
                OtherincomeType: "",
                OtherincomeOtherIncomeAmount: "",
                OtherincomeotherIncomeUnemploymentHowOften: "",
                otherIncomeNoneOfThem: "",

                isIncomingSteady: "",
                incomeNextYear: "",
                incomeCurrentYear: "",

                mexican: "",
                cuban: "",
                puertoRican: "",
                other: "",
                hispanicOtherTxtBox: "",
                alaskanIndian: "",
                alaskanNative: "",
                africanAmerican: "",
                chinese: "",
                filipino: "",
                guamanian: "",
                korean: "",
                japanese: "",
                hawaiian: "",
                asian: "",
                pacificIslander: "",
                samoan: "",
                vietnamese: "",
                white: "",
                otherRace: "",
                nonHispaniceOtherTxtBox: "",

                TypeMedicaid: "",
                TypeCHIP: "",
                TypeMedicare: "",
                TypeTricare: "",
                TypeVA: "",
                TypePeace: "",
                TypeEGHP: "",
                nameOfInsurance: "",
                policyNumber: "",
                isCOBRACoverage: "",
                isRetireePlan: "",
                TypeIndividualInsurance: "",
                TypeOther: "",
                nameOfOtherInsurance: "",
                otherPolicyNumber: "",
                isLimitedPlan: "",
                TypeNone: ""

                //TO BE REMOVED LATER
                //relationship: "",// duplicate
                //otherIncomeUnemploymentAmount: "",
                //otherIncomeUnemploymentHowOften: "",
                //otherIncomePensionAmount: "", 
                //otherIncomePensionHowOften: "", 
                //otherIncomeCapitalGainsAmount: "", 
                //otherIncomeCapitalGainsHowOften: "", 
                //otherIncomeInvestmentAmount: "", 
                //otherIncomeInvestmentHowOften: "",
                //otherIncomeRetirementAccountsAmount: "",
                //otherIncomeRetirementAccountsHowOften: "", 
                //otherIncomeAlimonyReceivedAmount: "",
                //otherIncomeAlimonyReceivedHowOften: "",
                //otherIncomeNetFarmingOrFishingAmount: "", 
                //otherIncomeNetFarmingOrFishingHowOften: "", 
                //otherIncomeNetRentalOrRoyalityAmount: "",
                //otherIncomeNetRentalOrRoyalityHowOften: "", 
                //otherIncomeOtherIncomeAmount: "", 
                //otherIncomeOtherIncomeHowOften: "", 
                //otherEthnicity: "", //not used
                //otherRaceText: "", //not used
            },

            validation: {
                firstName: { required: true, pattern: 'allowedSpecCharName' },
                middleName: { required: false, pattern: 'allowedSpecCharName' },
                lastName: { required: true, pattern: 'allowedSpecCharName' },
                dob: { required: true, fn: 'validateDob' },
                ssn: { required: true, fn: 'validatessn' },
                relationship: { fn: 'validaterelationship' },
                needHealthCoverage: { required: true, msg: Constants.radioErrorMessage },
                claimDependents: { fn: 'validateclaimDependents' },
                spouse: { required: true, msg: Constants.radioErrorMessage },
                changeOfJobStatus: { required: true, msg: Constants.radioErrorMessage },
                isIncomingSteady: function (value) { if (value == '' || value == null) { return Constants.radioErrorMessage; } },
                incomeNextYear: { fn: 'validateincomeNextYear' },
                employmentStatusYes: { fn: 'validateemploymentStatusYes' },
                hispanicOtherTxtBox: { fn: 'validatehispaniceOtherTxtBox' },
                nonHispaniceOtherTxtBox: { fn: 'validatenonHispaniceOtherTxtBox' },
                TypeNone: { fn: 'validateTypeNone' },
                otherIncomeNoneOfThem: { fn: 'validateNoneOfThem' },
                deductionsNone: { fn: 'validatedeductionsNone' },
                nameOfInsurance: { fn: 'validatenameOfInsurance' },
                policyNumber: { fn: 'validatepolicyNumber' },
                isCOBRACoverage: { fn: 'validateCoveragePlan' },
                isRetireePlan: { fn: 'validateCoveragePlan' },
                nameOfOtherInsurance: { fn: 'validatenameOfOtherInsurance' },
                otherPolicyNumber: { fn: 'validateotherPolicyNumber' },
                isLimitedPlan: { fn: 'validateisLimitedPlan' },
                UnemploymentOtherIncomeAmount: { fn: 'validateUnemploymentOtherIncomeAmount' },
                UnemploymentotherIncomeUnemploymentHowOften: { fn: 'validateUnemploymentotherIncomeUnemploymentHowOften' },
                RetirementaccountsOtherIncomeAmount: { fn: 'validateRetirementaccountsOtherIncomeAmount' },
                RetirementaccountsotherIncomeUnemploymentHowOften: { fn: 'validateRetirementaccountsotherIncomeUnemploymentHowOften' },
                PensionOtherIncomeAmount: { fn: 'validatePensionOtherIncomeAmount' },
                PensionotherIncomeUnemploymentHowOften: { fn: 'validatePensionotherIncomeUnemploymentHowOften' },
                SSNOtherIncomeAmount: { fn: 'validateSSNOtherIncomeAmount' },
                SSNotherIncomeUnemploymentHowOften: { fn: 'validateSSNotherIncomeUnemploymentHowOften' },
                CapitalGainsOtherIncomeAmount: { fn: 'validateCapitalGainsOtherIncomeAmount' },
                CapitalGainsotherIncomeUnemploymentHowOften: { fn: 'validateCapitalGainsotherIncomeUnemploymentHowOften' },
                InvestmentIncomeOtherIncomeAmount: { fn: 'validateInvestmentIncomeOtherIncomeAmount' },
                InvestmentIncomeotherIncomeUnemploymentHowOften: { fn: 'validateInvestmentIncomeotherIncomeUnemploymentHowOften' },
                NetrentalroyalityOtherIncomeAmount: { fn: 'validateNetrentalroyalityOtherIncomeAmount' },
                NetrentalroyalityotherIncomeUnemploymentHowOften: { fn: 'validateNetrentalroyalityotherIncomeUnemploymentHowOften' },
                NetfarmingfishingOtherIncomeAmount: { fn: 'validateNetfarmingfishingOtherIncomeAmount' },
                NetfarmingfishingotherIncomeUnemploymentHowOften: { fn: 'validateNetfarmingfishingotherIncomeUnemploymentHowOften' },
                AlimonyreceivedOtherIncomeAmount: { fn: 'validateAlimonyreceivedOtherIncomeAmount' },
                AlimonyreceivedotherIncomeUnemploymentHowOften: { fn: 'validateAlimonyreceivedotherIncomeUnemploymentHowOften' },
                OtherincomeOtherIncomeAmount: { fn: 'validateOtherincomeOtherIncomeAmount' },
                OtherincomeotherIncomeUnemploymentHowOften: { fn: 'validateOtherincomeUnemploymentHowOften' },
                OtherincomeType: { fn: 'validateOtherIncomeType' },
                deductionsAlimonyPaidAmount: { fn: 'validatedeductionsAlimonyPaidAmount' },
                deductionsAlimonyHowOften: { fn: 'validatedeductionsAlimonyHowOften' },
                deductionsStudentLoanIntrestAmount: { fn: 'validatedeductionsStudentLoanIntrestAmount' },
                deductionsStudentLoanIntrestHowOften: { fn: 'validatedeductionsStudentLoanIntrestHowOften' },
                deductionsotherDeductionsAmount: { fn: 'validatedeductionsotherDeductionsAmount' },
                deductionsotherDeductionsHowOften: { fn: 'validatedeductionsotherDeductionsHowOften' },
                selfEmployeeAmount: { fn: 'validateemployeeAmount' },
                selfEmployeeAverageHoursPerWeek: { fn: 'validateemployeeAverageHoursPerWeek' },
                selfEmployeeHowOften: { fn: 'validateemployeeHowOften' }
            },

            validatedeductionsAlimonyPaidAmount: function (value, attr, computedState) {
                if (!value && computedState.deductionsAlimonyPaid) { return Constants.currencyErrorMessage; }
                else if (value && computedState.deductionsAlimonyPaid) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validatedeductionsAlimonyHowOften: function (value, attr, computedState) {
                if (!value && computedState.deductionsAlimonyPaid) { return Constants.radioErrorMessage; }
            },

            validatedeductionsStudentLoanIntrestAmount: function (value, attr, computedState) {
                if (!value && computedState.deductionsStudentLoanIntrest) { return Constants.currencyErrorMessage; }
                else if (value && computedState.deductionsStudentLoanIntrest) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validatedeductionsStudentLoanIntrestHowOften: function (value, attr, computedState) {
                if (!value && computedState.deductionsStudentLoanIntrest) { return Constants.radioErrorMessage; }
            },

            validatedeductionsotherDeductionsAmount: function (value, attr, computedState) {
                if (!value && computedState.deductionsotherDeductions) { return Constants.currencyErrorMessage; }
                else if (value && computedState.deductionsotherDeductions) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validatedeductionsotherDeductionsHowOften: function (value, attr, computedState) {
                if (!value && computedState.deductionsotherDeductions) { return Constants.radioErrorMessage; }
            },

            validatessn: function (value) {
                if (!Util.validateSSN(value)) { return Constants.ssnInvalidErrorMessage; }
            },

            validateDob: function (value) {
                if (!Util.validateDob(value)) { return Constants.dobInvalidErrorMessage; }
            },

            validaterelationship: function (value) {
                if (!value) { return Constants.dropDownErrorMessage; }
            },

            //Check if value is null then display error msg  
            //Else check if value is valid thru regex in util.js
            validateUnemploymentOtherIncomeAmount: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeUnemployment) { return Constants.currencyErrorMessage; }
                else if (value && computedState.otherIncomeUnemployment) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validateUnemploymentotherIncomeUnemploymentHowOften: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeUnemployment) { return Constants.radioErrorMessage; }
            },

            validateRetirementaccountsOtherIncomeAmount: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeRetirementAccounts) { return Constants.currencyErrorMessage; }
                else if (value && computedState.otherIncomeRetirementAccounts) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validateRetirementaccountsotherIncomeUnemploymentHowOften: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeRetirementAccounts) { return Constants.radioErrorMessage; }
            },

            validatePensionOtherIncomeAmount: function (value, attr, computedState) {
                if (!value && computedState.otherIncomePension) { return Constants.currencyErrorMessage; }
                else if (value && computedState.otherIncomePension) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validateSSNOtherIncomeAmount: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeSocialSecurity) { return Constants.currencyErrorMessage; }
                else if (value && computedState.otherIncomeSocialSecurity) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validatePensionotherIncomeUnemploymentHowOften: function (value, attr, computedState) {
                if (!value && computedState.otherIncomePension) { return Constants.radioErrorMessage; }
            },

            validateSSNotherIncomeUnemploymentHowOften: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeSocialSecurity) { return Constants.radioErrorMessage; }
            },

            validateCapitalGainsOtherIncomeAmount: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeCapitalGains) { return Constants.currencyErrorMessage; }
                else if (value && computedState.otherIncomeCapitalGains) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validateCapitalGainsotherIncomeUnemploymentHowOften: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeCapitalGains) { return Constants.radioErrorMessage; }
            },

            validateInvestmentIncomeOtherIncomeAmount: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeInvestment) { return Constants.currencyErrorMessage; }
                else if (value && computedState.otherIncomeInvestment) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validateInvestmentIncomeotherIncomeUnemploymentHowOften: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeInvestment) { return Constants.radioErrorMessage; }
            },

            validateNetrentalroyalityOtherIncomeAmount: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeNetRentalOrRoyality) { return Constants.currencyErrorMessage; }
                else if (value && computedState.otherIncomeNetRentalOrRoyality) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validateNetrentalroyalityotherIncomeUnemploymentHowOften: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeNetRentalOrRoyality) { return Constants.radioErrorMessage; }
            },

            validateNetfarmingfishingOtherIncomeAmount: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeNetFarmingOrFishing) { return Constants.currencyErrorMessage; }
                else if (value && computedState.otherIncomeNetFarmingOrFishing) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validateNetfarmingfishingotherIncomeUnemploymentHowOften: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeNetFarmingOrFishing) { return Constants.radioErrorMessage; }
            },

            validateAlimonyreceivedOtherIncomeAmount: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeAlimonyReceived) { return Constants.currencyErrorMessage; }
                else if (value && computedState.otherIncomeAlimonyReceived) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validateAlimonyreceivedotherIncomeUnemploymentHowOften: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeAlimonyReceived) { return Constants.radioErrorMessage; }
            },

            validateOtherincomeOtherIncomeAmount: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeOtherIncome) { return Constants.currencyErrorMessage; }
                else if (value && computedState.otherIncomeOtherIncome) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validateOtherincomeUnemploymentHowOften: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeOtherIncome) { return Constants.radioErrorMessage; }
            },

            validateOtherIncomeType: function (value, attr, computedState) {
                if (!value && computedState.otherIncomeOtherIncome) { return "Error: Please specify a type"; }
            },

            validateTypeNone: function (value, attr, computedState) {
                if (!value) {
                    if (!(computedState.TypeMedicaid || computedState.TypeCHIP || computedState.TypeMedicare || computedState.TypeTricare || computedState.TypeVA || computedState.TypePeace || computedState.TypeEGHP || computedState.TypeIndividualInsurance || computedState.TypeOther)) { return Constants.checkBoxErrorMessage; }
                }
            },

            validateemploymentStatusYes: function (value, attr, computedState) {
                if (!value) {
                    if (!(computedState.employmentStatusNo || computedState.employmentStatusSelf)) { return Constants.checkBoxErrorMessage; }
                }
            },

            validateNoneOfThem: function (value, attr, computedState) {
                if (!value) {
                    if (!(computedState.otherIncomeUnemployment || computedState.otherIncomeRetirementAccounts || computedState.otherIncomePension || computedState.otherIncomeSocialSecurity || computedState.otherIncomeCapitalGains || computedState.otherIncomeInvestment || computedState.otherIncomeNetRentalOrRoyality || computedState.otherIncomeNetFarmingOrFishing || computedState.otherIncomeAlimonyReceived || computedState.otherIncomeOtherIncome)) { return Constants.checkBoxErrorMessage; }
                }
            },

            validatedeductionsNone: function (value, attr, computedState) {
                if (!value) {
                    if (!(computedState.deductionsAlimonyPaid || computedState.deductionsStudentLoanIntrest || computedState.deductionsotherDeductions)) { return Constants.checkBoxErrorMessage; }
                }
            },

            validatenameOfInsurance: function (value, attr, computedState) {
                if (!value && computedState.TypeEGHP) { return Constants.enterNameErrorMessage; }
                else if (value && computedState.TypeEGHP) {
                    if (!Util.validateInsuranceInfo(value)) { return Constants.specCharErrorMessage; }
                }
            },

            validatenameOfOtherInsurance: function (value, attr, computedState) {
                if (!value && computedState.TypeOther) { return Constants.enterNameErrorMessage; }
                else if (value && computedState.TypeOther) {
                    if (!Util.validateInsuranceInfo(value)) { return Constants.specCharErrorMessage; }
                }
            },

            validatepolicyNumber: function (value, attr, computedState) {
                if (!value && computedState.TypeEGHP) { return Constants.policyNumErrorMessage; }
                else if (value && computedState.TypeEGHP) {
                    if (!Util.validateInsuranceInfo(value)) { return Constants.specCharErrorMessage; }
                }
            },

            validateotherPolicyNumber: function (value, attr, computedState) {
                if (!value && computedState.TypeOther) { return Constants.policyNumErrorMessage; }
                else if (value && computedState.TypeOther) {
                    if (!Util.validateInsuranceInfo(value)) { return Constants.specCharErrorMessage; }
                }
            },

            validateisLimitedPlan: function (value, attr, computedState) {
                if (!value && computedState.TypeOther) { return Constants.radioErrorMessage; }
            },

            validateCoveragePlan: function (value, attr, computedState) {
                if (!value && computedState.TypeEGHP) { return Constants.radioErrorMessage; }
            },

            validatehispaniceOtherTxtBox: function (value, attr, computedState) {
                if (!value && computedState.other) { return Constants.raceErrorMessage; }
                else if (value && computedState.other) {
                    if (!Util.validateOtherRace(value)) { return Constants.raceSpecCharErrorMessage; }
                }
            },

            validatenonHispaniceOtherTxtBox: function (value, attr, computedState) {
                if (!value && computedState.otherRace) { return Constants.raceErrorMessage; }
                else if (value && computedState.otherRace) {
                    if (!Util.validateOtherRace(value)) { return Constants.raceSpecCharErrorMessage; }
                }
            },

            validateclaimDependents: function (value, attr, computedState) {
                if (!value) { return Constants.radioErrorMessage; }
                else if (value === "Yes") {
                    if ($('input[name^="dependent"]:checked').length == 0) { return Constants.selectErrorMessage; }
                }
            },

            validateincomeNextYear: function (value, attr, computedState) {
                if (!value && computedState.isIncomingSteady && (computedState.isIncomingSteady === "No")) { return Constants.currencyErrorMessage; }
                else if (value && computedState.isIncomingSteady && (computedState.isIncomingSteady === "No")) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validateemployeeAmount: function (value, attr, computedState) {
                if (!value) { return Constants.EmpEarnErrorMessage; }
                else if (value) {
                    if (!Util.validateCurrency(value)) { return Constants.currencyInvalidErrorMessage; }
                }
            },

            validateemployeeAverageHoursPerWeek: function (value, attr, computedState) {
              //  if (this.attributes.selfEmployeeHowOften.toLowerCase() == "hourly") {
                    if (!value) { return Constants.EmpHoursErrorMessage; }
                    else if (value) {
                        if (!Util.validateEmployeeHrs(value)) { return Constants.specCharErrorMessage; }
                    }
             //   }
            },

            validateemployeeHowOften: function (value, attr, computedState) {
                if (!value) { return Constants.EmpHoursErrorMessage; }
            },

            toJSON: function () {
                // clone all attributes
                var attributes = _.clone(this.attributes);

                attributes.employers = _.map(attributes.employers.models, function (employer) {
                    return employer.toJSON();
                })

                return attributes;
            },

            _numEmployersChanged: function () {
                var numEmployers = this.attributes.numEmployers;
                var employers = this.attributes.employers;
                while (numEmployers > employers.length)
                    employers.push(new EmployerModel());
                while (numEmployers < employers.length)
                    employers.pop();
            },
            getFullName: function () {
                var fullName = this.get('firstName') + " ";
                fullName += this.get('lastName');

                if (this.get('suffix').length > 0)
                    fullName += " " + this.get('suffix');

                return fullName;
            },
            getPersonsIncome: function (dependent) {
                if (dependent)
                    return Income.getDependentsTotalIncome(this.toJSON());
                else
                    return Income.getNonDependentsTotalIncome(this.toJSON());
            },

            getPersonsEI: function () { return Income.getTotalEarnedIncome(this.toJSON()); },
            getPersonsUI: function () { return Income.getTotalUnEarnedIncome(this.toJSON()); },
            getPersonsOI: function () { return Income.getTotalOtherIncome(this.toJSON()); },
            getPersonsDeductions: function () { return Income.getTotalDeduction(this.toJSON()); },

            getAge: function () { return Util.getAge(this.attributes.dob); },

            isMedicaidCHIPEligibile: function (FPLValue, state, hoursWorked, hasDependents) {
                var age = this.getAge();
                var bisMedicaidCHIPEligibile = { isMedicaidEligible: false, isChipEligible: false, medicaidCategory: "", medicaidValue: "" };
                if (age < 19) { bisMedicaidCHIPEligibile = Income.under19IsMedicaidCHIPEligibile(FPLValue, age, state, this.toJSON()); }
                else { bisMedicaidCHIPEligibile = Income.over19IsMedicaidCHIPEligibile(FPLValue, age, state, this.toJSON(), hoursWorked, hasDependents); }
                return bisMedicaidCHIPEligibile;
            },

            getHours: function () {
                return Income.hoursWorked(this.toJSON());

            },

            isPrimary: function (ezmodel) {
                return ezmodel.get('persons')[ezmodel.get('primaryFiler')] == this;
            },
            isSpouseOfPrimary: function (ezmodel) {
                return ezmodel.get('persons')[ezmodel.get('spouseOfPrimary')] == this;
            },
            isDependentOfPrimary: function (ezmodel) {
                var self = this;
                var isDep = false;

                _.each(ezmodel.get('persons'), function (person, i) {
                    if (_.contains(ezmodel.get('dependentsOfPrimary'), i.toString()) && person == self)
                        isDep = true;
                });

                return isDep;
            }
        });

        // Returns the Model class
        return PersonModel;
    }
);
