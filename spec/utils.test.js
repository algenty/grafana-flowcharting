const u  = require("../src/utils.js");



test('utils : Should be uniq and not null', () => {
    expect(u.uniqueID()).not.toBeNaN();
});

test('utils : encode', () => {
    expect(u.uniqueID()).not.toBeNaN();
});


