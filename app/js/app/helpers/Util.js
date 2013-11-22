define(["jquery", "backbone", "helpers/Constants"],

    function ($, Backbone, Constants) {

        var Util = {

            patterns: {
                re2alpha: /^\A-Z{2}/,
                re5digit: /^\d{5}(-\d{4})?$/,
                reAllowedSpecialChar: /[^0-9\A-Za-z\~@&#%+:;()\'\",.\/\-_‘’`|\=\+\s]+/,
                reStates: /^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/,
                digits: /[0-9]/,
                email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
                phone: /^\d{3}-\d{3}-\d{4}$/,
                alphaNumeric: /^[0-9a-zA-Z]+$/,
                currency: /^\s*[\0-9\.,\s]+\s*$/,
                generalInfo: /^\s*[0-9\A-Za-z\-.,'\s]+\s*$/,
                name: /^\s*[0-9\A-Za-z\-.#\'\"\s]+\s*$/,
                address: /^\s*[\0-9\A-Za-z\-.#\'\"\s]+\s*$/,
                zip: /^\d{5}(-\d{4})?$/
            },

            bindvalidation: function () {
                ficaIsChecked = this.ficaIsChecked;
                var myCustomRules = {
                    audRequired: [function () {
                        if (!$('[name="aud"]').is(':checked')) {
                            return false;
                        }
                        return true;
                    }, "Please indicate which best describes you."],
                    typeRequired: [function () {
                        if (!$('[name="type"]').is(':checked')) {
                            return false;
                        }
                        return true;
                    }, "Please indicate what type of health insurance you need"],
                    stateSelectRequired: [function () {
                        if ($('#state-select').val() == "Select a State") {
                            return false;
                        }
                        return true;
                    }, "Please select the state you live in"],
                    countySelectRequired: [function () {
                        if ($('#county-select').is(":visible") && $('#county-select').val() == "Select a County") {
                            return false;
                        }
                        return true;
                    }, "Please select a county."],
                    covRequired: [function () {
                        if (!$('[name="cov"]').is(':checked')) {
                            return false;
                        }
                        return true;
                    }, "Please indicate for whom you are looking for coverage"],
                    ageRequired: [function () {
                        if ($('[name="age"]').is(":visible") && !$('[name="age"]').is(':checked')) {
                            return false;
                        }
                        return true;
                    }, "Please indicate how old you are"]

                };
                $("input[type='radio']").on("click", function () {
                    $(this).focus();
                });
                return myCustomRules;
            },

            validateSSN: function (ssn) {
                if ((ssn != "") || (ssn != null)) {
                    var ssnPart1 = "", ssnPart2 = "", ssnPart3 = "", noErrorMsg = true;

                    ssnPart1 = ssn.substring(0, 3);
                    ssnPart2 = ssn.substring(4, 6);
                    ssnPart3 = ssn.substring(7);

                    if (ssnPart1 === "000" || ssnPart1 === "666" || ssnPart1.substring(0, 1) === "9") { noErrorMsg = false; } //ssn cannot start with 000, or 9

                    if (ssnPart2 === "00") { noErrorMsg = false; } //ssn cannot have 00 in second part

                    if (ssnPart3 === "0000") { noErrorMsg = false; } //ssn cannot have 0000 in third part
                }
                return noErrorMsg;
            },

            validateDob: function (dateIn) {
                var valid = false;

                var month = dateIn.substring(0, dateIn.indexOf('-'));
                var day = dateIn.substring(dateIn.indexOf('-') + 1, dateIn.lastIndexOf('-'));
                var year = dateIn.substring(dateIn.lastIndexOf('-') + 1);

                var today = new Date();
                month = parseInt(month, 10);
                day = parseInt(day, 10);
                year = parseInt(year, 10);

                //check to see if is empty, etc.
                if (year >= 1900 && year <= today.getFullYear()) {
                    //check against today's date
                    if (year === today.getFullYear()) {
                        if (month === (today.getMonth() + 1)) {//month is zero indexed, so add 1
                            //if day is less or equal, date is valid
                            if (day <= today.getDate()) { valid = true; }
                            //day is greater, so date is invalid
                            else { valid = false; }
                        }
                        else if (month < (today.getMonth() + 1)) { valid = true; }
                    }
                    //check month range
                    else if (month >= 1 && month <= 12) {
                        //check day range in months with 31 days
                        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
                            if (day > 0 && day < 32) { valid = true; }
                        }
                        //check day range in months with 30 days
                        else if (month === 4 || month === 6 || month === 9 || month === 11) {
                            if (day >= 1 && day <= 30) { valid = true; }
                        }
                        //check day range in february
                        else if (month === 2) {
                            //check for leap year
                            if (isLeapYear(year)) {
                                if (day >= 1 && day <= 29) { valid = true; }
                            }
                            else {
                                if (day >= 1 && day <= 28) { valid = true; }
                            }
                        }
                    }
                }

                function isLeapYear(yearIn) {
                    //if year is not divisible by 4, its NOT a leap year
                    if (yearIn % 4 !== 0) { return false; }
                    else {
                        //if year is divisible by 4 & not divisible by 100 it is a leap year
                        if (yearIn % 100 !== 0) { return true; }
                        else {
                            //if year is divisible by 4 & divisible by 100 & not divisible by 400 it is NOT a leap year
                            if (yearIn % 400 !== 0) { return false; }
                        }
                    }
                    //if year is divisible by 4 & divisible by 100 & divisible by 400 it is a leap year
                    return true;
                }

                return valid;
            },

            validateCurrency: function (value) {
                return this.patterns.currency.test(value);
            },

            validateInsuranceInfo: function (value) {
                return this.patterns.generalInfo.test(value);
            },

            validateOtherRace: function (value) {
                return this.patterns.generalInfo.test(value);
            },

            validateGeneralName: function (value) {
                return this.patterns.name.test(value);
            },

            validateEmployerName: function (value) {
                return this.patterns.generalInfo.test(value);
            },

            validateEmployeeHrs: function (value) {
                return this.patterns.digits.test(value);
            },

            validateEmailAddress: function (value) {
                return this.patterns.email.test(value);
            },

            validateAddress: function (value) {
                return this.patterns.address.test(value);
            },

            validateZipCode: function (value) {
                return this.patterns.zip.test(value);
            },

            validatePhoneNumber: function (value) {
                return this.patterns.phone.test(value);
            },

            generateApplicationID: function () {
                var result, i, j;
                result = '';
                for (j = 0; j < 32; j++) {
                    if (j == 8 || j == 12 || j == 16 || j == 20)
                        result = result + '-';
                    i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                    result = result + i;
                }
                return result;
            },

            getParameterByName: function (name, paramsList) {
                name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                var regexS = "[\\?&]" + name + "=([^&#]*)";
                var regex = new RegExp(regexS);
                var results = regex.exec(paramsList);
                if (results === null)
                    return "";
                else
                    return decodeURIComponent(results[1].replace(/\+/g, " "));
            },

            getEncodedQueryObject: function (queryString) {
                if (!queryString)
                    return {};

                var list = queryString.substring(1).split('&');
                var list2 = _.map(list, function (frag) {
                    return frag.split('=');
                });
                return _.object(list2);
            },

            createQueryString: function (queryObj, serializedString) {
                var encodedQueryObj = {};
                _.each(queryObj, function (val, key) {
                    encodedQueryObj[encodeURIComponent(key)] = encodeURIComponent(val);
                });

                if (serializedString && serializedString.length > 0) {
                    var list = serializedString.split('&');
                    _.each(list, function (frag) {
                        var parts = frag.split('=');
                        encodedQueryObj[parts[0]] = parts[1];
                    });
                }
                var list2 = _.map(encodedQueryObj, function (val, key) {
                    return (key) + '=' + (val);
                });
                return list2.join('&');
            },

            getAge: function (DateofBirth) {

                var birthMonth = Number(DateofBirth.split("-")[0]);
                var birthDay = Number(DateofBirth.split("-")[1]);
                var birthYear = Number(DateofBirth.split("-")[2]);
                var birthDate = new Date(birthYear, birthMonth, birthDay).getTime();
                return Math.floor((Date.now() - birthDate) / (31557600000));
            },

            getAuthToken: function (request) {
                var authtoken = "";
                try {
                    authtoken = request.getResponseHeader(Constants.AuthResponseHeader);
                    if (authtoken) $(Constants.AuthHiddenInput).val(authtoken);
                }
                catch (e) {
                    console.log(Constants.AuthTokenErrorMessage);
                }
                return authtoken;
            },

            getScreeningId: function (request) {
                var screeningid = "";
                try {
                    screeningid = request.getResponseHeader(Constants.ScreeningIdHeader);
                    if (screeningid) $(Constants.ScreeningHiddenInput).val(screeningid);
                }
                catch (e) {
                    console.log(Constants.ScreeningIdErrorMessage);
                }
                return screeningid;
            }



        };

        return Util;
    });







