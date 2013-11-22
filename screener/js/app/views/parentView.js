// View.js
// -------
define(["jquery",
        "backbone",
        "models/Model",
        "helpers/Helper",
        "helpers/Util",
        "helpers/expandBox",
        "helpers/Constants",
        "text!templates/global/container.html",
        "views/questionView",
        "views/stateView",
        "views/audienceView",
        "views/applicationView",
        "views/navigationView",
        "modal",
        "text!templates/FFMRedirectModal.html",
        "modelbinder",
        "formValidation",
        "bootstraphelper",
        "validateAll"
        ],

    function ($,
            Backbone,
            Model,
            Helper,
            Util,
            expandBox,
            Constants,
            questionContainer,
            questionView,
            stateView,
            audienceView,
            applicationView,
            navigationView,
            modal,
            FFMRedirectModal,
            modelbinder,
            formValidation,
            bootstraphelper,
            validateall) {

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            //el: ".main-body-content", // set outside
            model: new Model(),
            _modelBinder: undefined,
            card: "",
            id: "",
            params: "",
            cardToViewMap: { "state": stateView,
                            "audience": audienceView,
                            "application": applicationView},
            ignoreList: ["California",
                    "Colorado",
                    "Connecticut",
                    "District of Columbia",
                    "Hawaii",
                    "Idaho",
                    "Kentucky",
                    "Maryland",
                    "Massachusetts",
                    "Minnesota",
                    "Nevada",
                    "New Mexico",
                    "New York",
                    "Oregon",
                    "Rhode Island",
                    "Vermont",
                    "Washington"],
            territories: ["Guam", "American Samoa", "Northern Mariana Islands", "Puerto Rico", "Virgin Islands"],
            territory_link: {
                "Guam": "guam",
                "American Samoa": "american-samoa",
                "Northern Mariana Islands": "northern-mariana-islands",
                "Puerto Rico": "puerto-rico",
                "Virgin Islands": "virgin-islands"
            },
            specialServiceUrl: { "District of Columbia": "district-of-columbia",
                "New Mexico": "new-mexico",
                "New York": "new-york",
                "Rhode Island": "rhode-island"
            },

            // View constructor
            initialize: function (card, id, params, token) {

                Backbone.Validation.bind(this, { model: this.model });

                this.card = card;
                this.id = id;
                this.params = params;


                //create nav view
                this.navView = new navigationView({ card: this.card, parent: this });
                this.navView.on("Next", this.Next, this);
                this.navView.on("Back", this.Back, this);

                //create child view
                if (this.cardToViewMap[this.card])
                    var viewFunction = this.cardToViewMap[this.card];
                else
                    viewFunction = questionView;

                this.childView = new viewFunction({card: this.card, id: this.id, params: this.params, parent: this});

                Backbone.ModelBinder.SetOptions({ modelSetOptions: { validate: true, validateAll: false} });
                this._modelBinder = new Backbone.ModelBinder();

            },
            // View Event Handlers
            events: {
                'change #state-select': 'ValidateState'
            },
            // Renders the view's template to the UI
            render: function () {
                this.$el.html(this.childView.render().$el);
                this.$el.find('.questionContainer').after(this.navView.render().$el);

                this._modelBinder.bind(this.model, this.$el.find('#screener')[0]);

                //Expand box prepopulation
                var self = this;
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

                // Maintains chainability
                return this;
            },

            bindModel: function () {
            },

            Next: function () {

                if (this.model.passesModalTest(this.card) == false) {
                    this.HaveAnApplication();
                }
                else {
                    var data = $("#ezappform input:visible, #ezappform select:visible").serializeObject();
                    data = Helper.checkAllElemCovered(data, this.$el);
                    if (this.model.set(data, { validate: true, validateAll: false })) {
                        Helper.navigateForward(this.card, this.model.toJSON());
                    }
                }

                return false;
            },

            Back: function () {
                Helper.navigateBackward(this.card, Helper.getFormValues());
                return false;
            },
            ValidateState: function () {

                var self = this;
                //var stateFullName = $('#state-select option[value="' + this.applyingCoverageState + '"]').html();
                var stateFullName = $('#state-select option:selected').text();

                if (!_.contains(this.ignoreList, stateFullName)) {
                    if (_.contains(this.territories, stateFullName)) {
                        $('#NextButton').hide();
                        $('.infoBox').html("If you live in " + stateFullName + ", you're not eligible to use the Marketplace to apply for health insurance. Check with your territory's government offices to learn about health coverage options."); //<br /><br /><a href='/marketplace/individual/#state=" + this.territory_link[stateFullName] + "'>https://www.healthcare.gov/marketplace/individual/#state=" + this.territory_link[stateFullName] + "</a>
                        $('.infoBox').show();
                        return;
                    }
                    else {
                        $('.infoBox').hide();
                    }

                    $('#NextButton').show();

                } else {
                    $('#NextButton').hide();

                    //call webservice to get message
                    var state_frag = (this.specialServiceUrl[stateFullName]) ? this.specialServiceUrl[stateFullName] : stateFullName;
                    var messageUrl = window.gblStateServiceUrl + state_frag + ".json";

                    try {
                        $.getJSON(messageUrl, function (data) {
                            if (data) {
                                var msg = $(data.content).filter('h3:contains("Health Insurance Marketplace in ' + stateFullName + '")').next().html();
                                var link_button = $(data.content).filter('h3:contains("Health Insurance Marketplace in ' + stateFullName + '")').next().find('a').addClass("btn btn-large btn-green info-btn-green")[0].outerHTML;
                                $('.infoBox').html(msg + "<br /><br />" + link_button);
                                $('.infoBox').show()
                            }
                            else {
                                $('.infoBox').hide();
                            }
                        }).fail(function () {
                            $('.infoBox').html("There was an error retrieving information for the state/territory you entered.");
                            $('.infoBox').show();
                        });
                    } catch (e) {
                    }
                }

            },

            HaveAnApplication: function () {
                $.modal(FFMRedirectModal);
            }



        });

        // Returns the View class
        return View;

    }

);
