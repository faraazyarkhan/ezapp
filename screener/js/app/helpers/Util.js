define(["jquery", "backbone"],

    function ($, Backbone) {

        var Util = {

            patterns: {
                re2alpha: /^\A-Z{2}/,
                re5digit: /^\d{5}(-\d{4})?$/,
                reAllowedSpecialChar: /[^0-9\A-Za-z\~@&#%+:;()\'\",.\/\-_‘’`|\=\+\s]+/,
                reStates: /^((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/,
                digits: /[0-9]/,
                email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9][a-zA-Z0-9.-]*[.]{1}[a-zA-Z]{2,6}$/,
                phone: /^([0-9]{3})?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                alphaNumeric: /^[0-9a-zA-Z]+$/
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

            validateZipCode: function (zipCode) {
                return this.patterns.re5digit.test(zipCode);
            },

            validateCounties: function (county) {
                return !this.patterns.reAllowedSpecialChar.test(county);
            },

            validateStates: function (state) {
                return this.patterns.reStates.test(state);
            },

            validateAlphaNumeric: function (value) {
                return this.patterns.alphaNumeric.test(value);
            },

            validateAllowedSpecialCharacters: function (value) {
                return !this.patterns.reAllowedSpecialChar.test(value);
            },

            generateApplicationID: function () {
                var result, i, j;
                result = '';
                for(j=0; j<32; j++)
                {
                    if( j == 8 || j == 12|| j == 16|| j == 20)
                        result = result + '-';
                    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
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

            getDecodedQueryObject: function (queryObj) {
                var decodedObj = {};
                _.each(queryObj, function (val, key) {
                    decodedObj[decodeURI(key).replace(/\+/g, ' ')] = decodeURI(val).replace(/\+/g, ' ');

                });

                return decodedObj;
            },
            getRadioStatus: function (sValue) {
                if (sValue == 'Yes')
                    return "1";
                else {
                    return "0";
                }


            }

        };

        return Util;
    });
