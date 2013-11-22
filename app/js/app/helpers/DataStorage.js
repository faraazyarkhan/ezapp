define(["jquery", "backbone", "helpers/Util", "helpers/Constants", "helpers/Navigation", "blockui", "arc4"],

    function ($, Backbone, Util, Constants, Navigation, blockui, arc4) {

        var DataStorage = {
            clearStorage: function () {
                store.clear();
            },

            getDecodedQueryObject: function (queryObj) {
                var decodedObj = {};
                _.each(queryObj, function (val, key) {
                    decodedObj[decodeURI(key).replace(/\+/g, ' ')] = decodeURI(val).replace(/\+/g, ' ');

                });

                return decodedObj;
            },

            personModelID: 0,
            getPersonID: function () {
                return this.personModelID++;
            },
            employerModelID: 0,
            getEmployerID: function () {
                return this.employerModelID++;
            },

            setItem: function (key, value) {
                var encryptkey = this.get_cookie("SessionKey");
                sessionStorage.setItem(key, arc4.encrypt(encryptkey, value.toString()));
            },

            getItem: function (key) {
                var encryptkey = this.get_cookie("SessionKey");

                decodedValue = "";
                if (sessionStorage.getItem(key))
                    var decodedValue = arc4.decrypt(encryptkey, sessionStorage.getItem(key));
                return decodedValue;
            },

            generateKey: function () {
                for (var i = 0, key = []; i < 128; ++i)
                    key[i] = Math.floor(Math.random() * (80) + 48);
                return window.String.fromCharCode.apply(String, key);
            },
            set_cookie: function (cookie_name, cookie_value, lifespan_in_days, valid_domain) {

                var domain_string = valid_domain ?
								   ("; domain=" + valid_domain) : '';
                document.cookie = cookie_name +
								   "=" + encodeURIComponent(cookie_value) +
								   "; max-age=" + 60 * 60 *
								   24 * lifespan_in_days +
								   "; path=/" + domain_string;
            },
            get_cookie: function (cookie_name) {

                var dc = document.cookie;
                var prefix = cookie_name + "=";
                var begin = dc.indexOf("; " + prefix);
                if (begin == -1) {
                    begin = dc.indexOf(prefix);
                    if (begin != 0) return null;
                }
                else {
                    begin += 2;
                    var end = document.cookie.indexOf(";", begin);
                    if (end == -1) {
                        end = dc.length;
                    }
                }
                return decodeURIComponent(dc.substring(begin + prefix.length, end));
            }
        };

        return DataStorage;
    });