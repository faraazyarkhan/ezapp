//View.js
// -------
define(["jquery",
        "backbone",
        "models/EZAppModel",
        "helpers/Helper",
        "helpers/Util",
        "helpers/expandBox",
        "helpers/Constants",
        "helpers/Mixins",
        "text!templates/global/container.html",
        "views/defaultView",
        "views/stateView",
        "views/employmentView",
        "views/personaltaxinfoView",
        "views/otherIncomeView",
        "views/incarcerationView",
        "views/validationView",
        "views/attestationView",
        "views/navigationView",
        "views/summaryView",
        "views/aianView",
        "modelbinder",
        "formValidation",
        "bootstraphelper",
        "validateAll",
        "maskedinput",
        "helpers/Services"
        ],

    function ($,
            Backbone,
            EZAppModel,
            Helper,
            Util,
            expandBox,
            Constants,
            Mixins,
            questionContainer,
            defaultView,
            stateView,
            employmentView,
            personaltaxinfoView,
            otherIncomeView,
            incarcerationView,
            validationView,
            attestationView,
            navigationView,
            summaryView,
            aianView,
            modelbinder,
            formValidation,
            bootstraphelper,
            validateall,
            maskedinput,
            Services
            ) {

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            //el: ".main-body-content", // set outside
            card: "",
            _modelBinder: undefined,
            validationBinder: null,
            ezmodel: new EZAppModel(),
            person: "",
            params: "",
            cardToViewMap: { "state": stateView,
                "employment": employmentView,
                "personaltaxinfo": personaltaxinfoView,
                "otherincome": otherIncomeView,
                "incarceration": incarcerationView,
                "validation": validationView,
                "summary": summaryView,
                "aian": aianView,
                "attestation": attestationView
            },

            events: { "click #showJSON": "showJSON" },

            showJSON: function (e) {
                this.$el.find('#JSONContainer').html("<pre><code>" + JSON.stringify(this.ezmodel.toJSON(), null, 4) + "</code><pre>");

                e.preventDefault();
            },

            // View constructor
            initialize: function (card, person, params) {
                this.card = card;
                this.person = person;
                this.params = params;

                var handShake = sessionStorage.getItem("handShake");

                try {
                    handShake = JSON.parse(handShake);

                    this.ezmodel.set('coverageState', ((handShake && handShake.state) ? (handShake.state) : ""));
                    this.ezmodel.set('coverage', ((handShake && handShake.coverage) ? (handShake.coverage) : ""));
                    this.ezmodel.set('noOfFamily', ((handShake && handShake.noOfFamily) ? (handShake.noOfFamily) : "1"));

                    $(Constants.AuthHiddenInput).val(handShake.X_Auth_Token);
                    $(Constants.ScreeningHiddenInput).val(handShake.screening_id);
                }
                catch (e) {
                    console.log("Handshake error");
                }


                //create nav view
                this.navView = new navigationView({ parent: this, card: this.card });

                //create child view
                if (this.cardToViewMap[this.card])
                    var viewFunction = this.cardToViewMap[this.card];
                else
                    viewFunction = defaultView;

                this.childView = new viewFunction({ card: this.card, person: this.person, params: this.params, ezmodel: this.ezmodel, parent: this });

                Backbone.ModelBinder.SetOptions({ modelSetOptions: { validate: true, validateAll: false} });
                this._modelBinder = new Backbone.ModelBinder();

                if (gblServiceEnabled && card === "coveragerenewal")
                { Services.CallEligibility(this.ezmodel); }


            },

            // Renders the view's template to the UI
            render: function () {
                this.$el.html(this.childView.render().$el);
                this.$el.find('.questionContainer').after(this.navView.render().$el);
                // Maintains chainability

                var ezapp = ["coverage", "challenge", "financial", "incarceration", "coveragerenewal", "livingoutside", "attestation", "aian", "summary"];
                var poc = ["communication", "poc"];
                var person = ["householdinfo", "assistance", "race", "otherincome", "employmentchange", "deduction", "estimatedincome", "othercoverage"];

                var card = this.card;

                if (_.contains(ezapp, card)) {
                    this.validationBinder = this.ezmodel;
                    Backbone.Validation.bind(this, { model: this.validationBinder });
                    this._modelBinder.bind(this.ezmodel, this.$el.find('#ezapp'));
                }
                else if (_.contains(poc, card)) {
                    this.validationBinder = this.ezmodel.get('poc');
                    Backbone.Validation.bind(this, { model: this.validationBinder });
                    this._modelBinder.bind(this.ezmodel.get('poc'), this.$el.find('#poc'));
                }
                else if (_.contains(person, card)) {
                    var model = Helper.modelGetter(this.ezmodel, this.person);
                    if (card == "householdinfo") {
                        model.set('span-current', this.person);
                        model.set('span-total', this.ezmodel.get("noOfFamily"));
                    }
                    this.validationBinder = model;
                    Backbone.Validation.bind(this, { model: this.validationBinder });
                    this._modelBinder.bind(model, this.$el.find('#person'));
                }

                var self = this;

                //Masking for inputs
                this.$el.find('#phoneNumber').mask("999-999-9999");
                this.$el.find('#zipCode, #zipCodeMailing').mask("99999?-9999");
                this.$el.find('#householdInfoLastName').mask("99-99-9999");
                this.$el.find('#householdInfoSSN').mask("999-99-9999");

                //Expand box prepopulation
                this.$el.find('input[data-toggle=expBox]:checked').each(function () {
                    var self2 = this;
                    var target = $(this).attr('data-target');
                    self.$el.find(target).removeClass('hidden');
                    self.$el.find(target).addClass('unhidden');

                    if (this.type != "checkbox") {
                        setTimeout(function () {
                            $(self2).click();
                        }, 500);
                    }
                });

                return this;
            },

            Next: function () {

                var data = $("#ezappform input:visible, #ezappform select:visible").serializeObject();
                data = Helper.checkAllElemCovered(data, $("#ezappform"));
                if (!this.validationBinder || this.validationBinder.set(data, { validate: true, validateAll: false })) {
                    if (!this.childView.isValid || this.childView.isValid())
                        Helper.navigateForward(this.card, this.person, Helper.getFormValues(), this.ezmodel);
                }

                return false;
            },

            Back: function () {
                Helper.navigateBackward(this.card, this.person, Helper.getFormValues(), this.ezmodel);
                return false;
            }


        });

        // Returns the View class
        return View;

    }

);