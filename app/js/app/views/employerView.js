// View.js
// -------
define(["jquery",
        "backbone",
        "helpers/Helper",
        "helpers/Util",
        "helpers/Constants",
        "models/EmployerModel",
        "text!templates/global/container.html"
        ],

    function ($,
            Backbone,
            Helper,
            Util,
            Constants,
            EmployerModel,
            questionContainer) {

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            //el: ".main-body-content", // set outside
            card: "",
            id: "",
            params: "",
            ezmodel: "",
            maxEmployers: 3,

            initialize: function (card, person, params, model, empModel, empId) {
                this.card = card;
                this.person = person;
                this.params = params;
                this.ezmodel = model;
                this.empModel = empModel;
                this.empId = empId;


                this.content = JSON.parse(Helper.getFile(Helper.getContentLocation(Constants.defaultLocale, this.card)));
                this.sub_markup = Helper.getFile(Helper.getMarkupLocation("employment_sub1"));
                this.sub_template = _.template(this.sub_markup, { content: this.content, Helper: Helper, Constants: Constants, empId: this.empId });

                //bindings
                var model_json = this.empModel.toJSON();
                var keys = _.keys(model_json);
                var values = _.map(model_json, function (value, key) {
                    return '[name=' + key + empId + ']';
                });
                this.bindings = _.object(keys, values);


                Backbone.Validation.bind(this, { model: this.empModel, selector: 'bind-attr' });
            },

            isValid: function () {
                return this.empModel.set({}, { validate: true, validateAll: true })
            },


            render: function () {
                this.$el.html(this.sub_template);

                var modelBinder = new Backbone.ModelBinder();
                modelBinder.bind(this.empModel, this.$el, this.bindings);

                return this;
            }
        });

        // Returns the View class
        return View;

    }

);
