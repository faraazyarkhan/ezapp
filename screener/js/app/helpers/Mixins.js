define(["jquery", "backbone", "helpers/Helper", "helpers/Constants", "text!templates/global/container.html"],

    function ($, Backbone, Helper, Constants, questionContainer) {

        var Mixins = {
            renderCardTemplate: function () {
                var markup = Helper.getFile(Helper.getMarkupLocation(this.card));
                var content = JSON.parse(Helper.getFile(Helper.getContentLocation(Constants.defaultLocale, this.card)));
                var containerMarkup = _.template(questionContainer, { content: content, Helper: Helper, Constants: Constants });
                var template = _.template(markup, { content: content, Helper: Helper, Constants: Constants }); ///Todo: pass existing data
                this.$el.html(containerMarkup);
                this.$el.find('.censusGroup').html(template)
            },
            dynamicBlockingMessage: function (radioName, radioId, messageId, messageText, parent) {
                var self = this;

                this.$el.find('[type=radio][name=' + radioName + ']').click(onRadioClick);

                setTimeout(function () {
                    if (self.$el.find('[type=radio][id=' + radioId + ']').is(':checked'))
                        self.$el.find('[type=radio][id=' + radioId + ']').click();
                }, 1);

                function onRadioClick(e) {
                    var $target = $(e.target);
                    if ($target.attr('id') == radioId) {
                        parent.navView.hideNext();
                        if (self.$el.find('#' + messageId).length == 0) {
                            self.$el.find('.questionContainer').append('<div class="infoBox" id="' + messageId + '">' + messageText + '</div>')
                        } else {
                            self.$el.find('#' + messageId).addClass('unhidden')
                            self.$el.find('#' + messageId).removeClass('hidden')
                        }

                    } else {
                        parent.navView.showNext();
                        if (self.$el.find('#' + messageId).length != 0) {
                            self.$el.find('#' + messageId).addClass('hidden')
                            self.$el.find('#' + messageId).removeClass('unhidden')
                        }
                    }
                }

            }
        };

        return Mixins;
    });
