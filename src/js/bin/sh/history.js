var File = require('../../lib/files/file');
var fs = require('../../lib/fs');

module.exports = {};

module.exports.Previous = function (callback) {
    callback = callback || function () {};

    if (history.cursor > 0) {
        history.cursor--;
        return callback(null, history.Get(history.cursor));
    }

    if (history.cursor >= history.Length()) {
        return callback(null, history.scratchpad);
    }

    return callback(null, history.Get(history.cursor));
}

module.exports.Next = function (callback) {
    callback = callback || function () {};

    if (history.cursor < history.Length()) {
        history.cursor++;
    }

    if (typeof history.Get(history.cursor) !== 'undefined') {
        return callback(null, history.Get(history.cursor));
    }

    return callback(null, history.scratchpad);
}

module.exports.Append = function (contents) {
    if (typeof contents !== 'string') {
        contents = '';
    }

    module.exports.SetScratchpad('');

    if (contents !== '') {
        history.Push(contents);
    }
}

module.exports.SetScratchpad = function (contents) {
    history.scratchpad = contents;
}

var history = {
    items: [],
    localStorageKey: 'bash_history',
    scratchpad: '',
    cursor: 0,
};

var persist = function () {
    localStorage.setItem(history.localStorageKey, JSON.stringify(history.items));
    fs.write('/home/website/.bash_history', new File({contents: history.items.join('\n')}));
}

history.Load = function () {
    try {
        this.items = JSON.parse(localStorage.getItem(this.localStorageKey));
    } catch (e) {
        this.items = [];
    }

    if (this.items === null) {
        this.items = [];
    }

    persist();

    this.cursor = this.Length();
};

history.Push = function (item) {
    item = item.trim();
    var pushResult = this.items.push(item);
    this.cursor = this.Length();
    persist();

    return pushResult;
};

history.Get = function (index) {
    return this.items[index];
};

history.Length = function () {
    return this.items.length;
};


history.Load();