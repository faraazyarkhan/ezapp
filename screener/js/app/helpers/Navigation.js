define([], function () {

    var Navigation = {
        cards: ['application', 'state', 'audience', 'screener'],

        next: function (card) {
            var step = _.indexOf(this.cards, card);
            var length = this.cards.length;
            if (step + 1 < length)
                ++step;
            return this.cards[step];
        },

        back: function (card) {
            var step = _.indexOf(this.cards, card);
            if (step > 0)
                --step;
            return this.cards[step];
        }
    };

    return Navigation;
});