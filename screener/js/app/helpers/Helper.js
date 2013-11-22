define(["jquery", "backbone", "helpers/Util", "helpers/Constants", "helpers/Navigation", "blockui", "store", "helpers/Services"],

    function ($, Backbone, Util, Constants, Navigation, blockui, store, services) {

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

            navigateForward: function (card, form) {
                var applicationID = Util.getParameterByName("app", Backbone.history.fragment);
                try {
                    if (card === "application" && applicationID === "") {
                        store.clear();
                        applicationID = Util.generateApplicationID();
                        store.set(applicationID, { app: 'no', aud: '' });
                    }
                    if (card === "screener") {

                        services.AuthenticateToken(applicationID, form);

                    }
                }
                catch (e) { }

                Backbone.history.navigate(Navigation.next(card) + '/&app=' + applicationID, { trigger: true });
            },

            navigateBackward: function (card, form) {
                var applicationID = Util.getParameterByName("app", Backbone.history.fragment);
                Backbone.history.navigate(Navigation.back(card) + '/&app=' + applicationID, { trigger: true });
            }
            

        };

        return Helper;
    });