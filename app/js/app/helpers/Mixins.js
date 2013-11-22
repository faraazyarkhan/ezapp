define(["jquery", "backbone", "helpers/Helper", "helpers/Constants", "text!templates/global/container.html"],

    function ($, Backbone, Helper, Constants, questionContainer) {

        var Mixins = {
            renderCardTemplate: function () {
                if (!this.personModel)
                    this.personModel = "";

                var markup = Helper.getFile(Helper.getMarkupLocation(this.card));
                var content = JSON.parse(Helper.getFile(Helper.getContentLocation(Constants.defaultLocale, this.card)));
                var containerMarkup = _.template(questionContainer, { content: content, Helper: Helper, Constants: Constants, Person: this.personModel });
                var template = _.template(markup, { content: content, Helper: Helper, Constants: Constants, Person: this.personModel }); ///Todo: pass existing data
                this.$el.html(containerMarkup);
                this.$el.find('.censusGroup').html(template)
            },
            setValid: function (view, attr, selector) {
                var control = view.find('[' + selector + '=' + attr + ']');
                var group = control.closest(".control-group");
                group.removeClass("error");

                if (control.data("error-style") === "tooltip") {
                    // CAUTION: calling tooltip("hide") on an uninitialized tooltip
                    // causes bootstraps tooltips to crash somehow...
                    if (control.data("tooltip"))
                        control.tooltip("hide");
                }
                else if (control.data("error-style") === "inline") {
                    group.find(".help-inline.error-message").remove();
                }
                else {
                    var error_child = group.find(".help-block.error-message:first");
                    if (!error_child.closest(".control-group").hasClass('error'))
                        error_child.remove();
                }
            },
            setInvalid: function (view, attr, error, selector) {
                var control = view.find('[' + selector + '=' + attr + ']');
                var group = control.closest(".control-group");
                group.addClass("error");

                if (control.data("error-style") === "tooltip") {
                    var position = control.data("tooltip-position") || "right";
                    control.tooltip({
                        placement: position,
                        trigger: "manual",
                        title: error
                    });
                    control.tooltip("show");
                }
                else if (control.data("error-style") === "inline") {
                    if (group.find(".help-inline").length === 0) {
                        group.find(".controls").append("<span class=\"help-inline error-message\"></span>");
                    }
                    var target = group.find(".help-inline");
                    target.text(error);
                }
                else {
                    if (group.find(".help-block").length === 0) {
                        group.find(".controls:first").append("<p class=\"help-block error-message\"></p>");
                    }
                    var target = group.find(".help-block");
                    target.text(error);
                }
            }
        };

        return Mixins;
    });
