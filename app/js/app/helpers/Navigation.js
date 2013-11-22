define([], function () {

    //cards: ["application", "audience", "coverage"],
    var Navigation = {
        //'coverage', 'financial',
        mainFlow: ['challenge', 'poc', 'communication', 'householdinfo', 'personaltaxinfo',
                'assistance', 'race', 'employment', 'otherincome', 'employmentchange', 'deduction', 'estimatedincome', 'othercoverage',
                'coveragerenewal', 'livingoutside', 'summary', 'attestation', 'validation'],
        personFlowWithCov: ['assistance', 'race', 'employment', 'otherincome', 'employmentchange', 'deduction', 'estimatedincome', 'othercoverage'],
        personFlowWOCov: ['employment', 'otherincome', 'employmentchange', 'deduction', 'estimatedincome'],
        finEnd: "coveragerenewal",
        skipCards: { empChange: "employmentchange" },
        next: function (cardName) {
            var step = _.indexOf(this.mainFlow, cardName);
            var length = this.mainFlow.length;
            if (step + 1 < length)
                ++step;
            return this.mainFlow[step];
        },

        backward: function (card, person, form, model) {
            if (card && _.indexOf(this.mainFlow, card) != 0) { window.history.back(); }
            else return false;
        },

        forward: function (card, person, form, model) {
            person = parseFloat(person);
            var totalFam = parseFloat(model.get("noOfFamily"));
            if (!this._isEveryoneCard(card) && !this._isCoverageOnlyCard(card)) {
                person = 0;
                card = Navigation.next(card);
            }
            if (this._isEveryoneCard(card)) {
                ++person;
                if (person > totalFam) {
                    var temp = this._getPersonsNextCard(1, totalFam, card, model);
                    person = temp.person, card = temp.card;
                }
            }
            else if (this._isCoverageOnlyCard(card)) {
                var temp = this._getPersonsNextCard(person, totalFam, card, model);
                person = temp.person, card = temp.card;
            }
            var navString = (person == 0) ? card : card + "/" + person;
            Backbone.history.navigate(navString, { trigger: true });
        },

        _getPersonsNextCard: function (person, noOfFam, card, model) {

            var tempcard = { card: card, person: person };
            var needFinancial = this._needFinancialAsst(model);
            var needCoverage = this._needCoverage(model.get("persons")[person - 1]);

            if (!needFinancial) {
                if (nextPerson != 0 && (this._isEveryoneCard(card) || card == this.raceCard))
                    tempcard.card = this.raceCard, tempcard.person = nextPerson;
                else
                    tempcard.card = this.nonFinEnd, tempcard.person = 0;
            }
            else {
                if (needCoverage) {// need coverage 
                    if (this._isEveryoneCard(card) || card == this.personFlowWithCov[this.personFlowWithCov.length - 1]) {
                        if (this._isEveryoneCard(card)) { tempcard.card = this.next(card), tempcard.person = person; }
                        else {
                            if (person + 1 <= noOfFam && this._needCoverage(model.get("persons")[person])) { tempcard.card = this.personFlowWithCov[0], tempcard.person = person + 1; }
                            else if (person + 1 <= noOfFam && !this._needCoverage(model.get("persons")[person])) { tempcard.card = this.personFlowWOCov[0], tempcard.person = person + 1; }
                            else { tempcard.card = this.finEnd, tempcard.person = 0; }

                        }
                    }
                    else {
                        tempcard.card = this.personFlowWithCov[_.indexOf(this.personFlowWithCov, card) + 1]
                        tempcard.person = person;
                    }
                }
                else { // does not need coverage
                    if (this._isEveryoneCard(card) || card == this.personFlowWOCov[this.personFlowWOCov.length - 1]) {
                        if (this._isEveryoneCard(card)) { tempcard.card = this.next(card), tempcard.person = person; }
                        else {
                            if (person + 1 <= noOfFam && this._needCoverage(model.get("persons")[person])) { tempcard.card = this.personFlowWithCov[0], tempcard.person = person + 1; }
                            else if (person + 1 <= noOfFam && !this._needCoverage(model.get("persons")[person])) { tempcard.card = this.personFlowWOCov[0], tempcard.person = person + 1; }
                            else { tempcard.card = this.finEnd, tempcard.person = 0; }
                        }

                    }
                    else {
                        tempcard.card = this.personFlowWOCov[_.indexOf(this.personFlowWOCov, card) + 1]
                        tempcard.person = person;
                    }
                }
                if (tempcard.card == this.skipCards.empChange && this._checkIfEmp(model, person)) { tempcard.card = this.next(tempcard.card); }
            }
            return tempcard;
        },

        _isEveryoneCard: function (cardName) {
            return _.contains(['householdinfo'], cardName);
        },
        _isCoverageOnlyCard: function (cardName) {
            return _.contains(this.personFlowWithCov, cardName) || cardName == "personaltaxinfo" || _.contains(this.personFlowWOCov, cardName);
        },

        _checkIfEmp: function (model, person) {
            var personModel = model.get("persons")[person - 1];
            return (personModel && ((personModel.get("employmentStatusNo") == true && personModel.get("employmentStatusYes") == false) || (personModel.get("employmentStatusSelf") == true && personModel.get("employmentStatusYes") == false))) ? true : false;
        },

        _nextCoveredPerson: function (model, person) {
            var persons = model.get("persons");
            for (var i = person - 1; i < persons.length; i++) {
                if (this._needCoverage(persons[i])) { return i + 1; }
            }
            return 0;
        },

        _needCoverage: function (personModel) {
            return (personModel.get("needHealthCoverage") == "Yes") ? true : false;
        },

        _needFinancialAsst: function (model) {

            var asst = model.get("needAssistance") || undefined;
            if (asst && asst == "Yes") { return true; }
            else if (asst && asst == "NotSure") {
                var notPoor = model.get("isIncomeBelowPovertyLevel");
                if (notPoor && notPoor == "Yes") { return false; }
                else return true;
            }
            return false;
        }
    };

    return Navigation;
});