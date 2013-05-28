var Dice = function (parent) {
    this.value = 1;
    this.parent = parent;
    this.init();
    this.busy = false;
    this.isFocused = false;
    this.firstThrow = true;
};

Dice.prototype.size = 50;

Dice.prototype.roll = function (callback) {
    var that = this,
        $dice;

    if (this.$elem) {
        this.busy = true;
        $dice = this.$elem.find('.dice');
        this.$elem.addClass('throw');
        setTimeout(function () {
            var vals = [1, 2, 3, 4, 5, 6, 6, 6], // increased chance of rolling 6
                newValue = vals[~~(Math.random() * 8)];

            Sfx.play('dice', newValue === 6 ? function () { Sfx.play('six'); } : null);

            $dice
                .removeClass('dice-' + that.value)
                .addClass('dice-' + newValue);

            that.$elem.removeClass('throw');

            that.value = newValue;
            that.busy = false;
            if (typeof callback === 'function') {
                callback(newValue);
            }
        }, 500);
    }
};

Dice.prototype.getValue = function() {
    return this.value;
};

Dice.prototype.move = function (player) {
    var positions = {
        2: [3, 8],
        3: [3, 3],
        4: [8, 3],
        5: [8, 8]
    },
    pos = positions[player] || [5, 5];

    if (this.$elem) {
        this.$elem.css({
            top: (this.size * pos[1]) + 'px',
            left: (this.size * pos[0])+ 'px'
        });
    }
};

Dice.prototype.focus = function () {
    this.$elem.addClass('focused');
    this.isFocused = true;
};

Dice.prototype.blur = function () {
    this.$elem.removeClass('focused');
    this.isFocused = false;
};

Dice.prototype.init = function () {
    var that = this,
        hint = $('<div />').addClass('dice-hint');

    this.$elem = this.$elem || $('<div>')
            .addClass('dice-wrap')
            .append($('<div />')
                .addClass('dice')
                .bind({
                    mouseover: function () {
                        that.focus();
                    },
                    mouseout: function () {
                        that.blur();
                    },
                    click: function () {
                        if (!that.busy && that.isFocused) {
                            if (that.firstThrow) {
                                hint.remove();
                                that.firstThrow = false;
                            }
                            that.roll();
                        }
                    }
                }))
            .append(hint)
            .appendTo('#' + this.parent);
};