define(["jquery", "backbone"],

    function ($, Backbone) {

        var Util;
        var eventList = [];

        $('body').on('click', '[data-toggle=expBox]', function (e) {
            var self = this;
            var $this = $(this);
            var target = $this.attr('data-target');
            var name = $this.attr('name')
            $(target).removeClass('hidden')
            $(target).addClass('unhidden')

            if (_.indexOf(eventList, this) == -1) {
                eventList.push(this);
                $('input[type=radio][name=' + name + ']').on('click', function (e) {
                    if (this != self) {
                        $(target).removeClass('unhidden')
                        $(target).addClass('hidden')
                    }
                })
            }

        });

        return Util;
    });
