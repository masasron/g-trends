'use strict'

const { ExploreTrendRequest } = require('..');

test('test .compare()', done => {
    const explorer = new ExploreTrendRequest();
    explorer.addKeyword('Dream about snakes')
        .compare('Dream about falling')
        .download().then(csv => {
            expect(Array.isArray(csv)).toBe(true);
            done();
        }).catch(error => {
            done(error);
        });
});

const TIME_FILTER_METHODS = ["pastHour", "pastFourHours", "pastDay", "past7Days", "past30Days", "past90Days", "past12Months", "past5Years", "from2004ToPresent"];

for (let filter of TIME_FILTER_METHODS) {
    test(filter, done => {
        const explorer = new ExploreTrendRequest();
        explorer[filter]()
            .addKeyword('bitcoin')
            .download()
            .then(csv => {
                expect(Array.isArray(csv)).toBe(true);
                done();
            }).catch(error => {
                done(error);
            });
    });
}