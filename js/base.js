/**
 * Class representing one of player bases - start or end
 * @param {Number} color Player's color
 */
var Base = function (type, color, board) {
    this.board = board;
    this.path = (function () {
        var locations = {
            start: {
                2: [[0, 9], [1, 9], [0, 10], [1, 10]],
                3: [[0, 0], [1, 0], [0, 1], [1, 1]],
                4: [[9, 0], [10, 0], [9, 1], [10, 1]],
                5: [[9, 9], [10, 9], [9, 10], [10, 10]]
            },
            end: {
                2: [[5, 9], [5, 8], [5, 7], [5, 6]],
                3: [[1, 5], [2, 5], [3, 5], [4, 5]],
                4: [[5, 1], [5, 2], [5, 3], [5, 4]],
                5: [[9, 5], [8, 5], [7, 5], [6, 5]]
            }
        };
        return locations[type] && locations[type][color] || [];
    })();
    this.setFields();
};

/**
 * Set base fields
 */
Base.prototype.setFields = function () {
    var p = this.path, i;

    this.fields = [];

    for (i = 0; i < p.length; i++) {
        this.fields.push(this.board.getField(p[i]));
    }
};

/**
 * Return path of this base
 * @return {Array} Array of path coords
 */
Base.prototype.getPath = function () {
    return [].concat(this.path);
};

/**
 * Returns first free field of base
 * @return {Object} Empty field
 */
Base.prototype.getFreeField = function () {
    var i = 0, field;

    while (i < 4) {
        field = this.fields[i];
        if (!field.getPawn()) {
            return field;
        }
        i++;
    }

    return null;
};

/**
 * Check if base is full to determine if player should have 3 attempts to throw 6
 * @return {Boolean} Base status
 */
Base.prototype.checkFull = function () {
    var i = 0;

    while (this.fields[i]) {
        if (!this.fields[i].getPawn()) {
            return false;
        }
        i++;
    }

    return true;
};