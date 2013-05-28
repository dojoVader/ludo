var Pawn = function (player, x, y) {
    this.player = player;
    this.x = x;
    this.y = y;
    this.field = null;
    this.position = -1;
    this.init();
    this.isMoving = false;
    this.isFocused = false;
};

Pawn.prototype.size = 50;

Pawn.prototype.init = function () {
    var that = this;

    this.$elem = $('<div/>')
        .addClass('pawn pawn-' + this.player.color)
        .css({
            left: (this.x * this.size) + 25 + 'px',
            top: (this.y * this.size) + 25 + 'px'
        })
        .bind({
            mouseover: function () {
                if (that.player.isFocused) {
                    that.focus();
                }
            },
            mouseout: function () {
                that.blur();
            },
            click: function () {
                if (!that.isMoving) {
                    that.player.move(that.player.board.dice.getValue(), that);
                }
            }
        });
};

Pawn.prototype.focus = function () {
    this.$elem.addClass('focused');
    this.isFocused = true;
};

Pawn.prototype.blur = function () {
    this.$elem.removeClass('focused');
    this.isFocused = false;
};

Pawn.prototype.move = function (steps, callback) {
    var that = this;

    function doStep(steps, callback) {
        var field;

        if (steps.length > 1) {
            field = steps.shift();
            that.step.call(that, field);
            setTimeout(function () {
                doStep(steps, callback);
            }, 200);
        } else {
            field = steps[0];
            that.step.call(that, field);
            if (typeof callback === 'function') {
                callback(field);
            }
        }
    }

    if (steps) {
        this.isMoving = true;
        if (this.field) {
            this.field.setPawn();
        }

        doStep(steps, function (field) {
            if (field) {
                that.field = field;
                that.field.setPawn(that);
            }
            that.isMoving = false;
            if (typeof callback === 'function') {
                callback();
            }
        });
    }
};

Pawn.prototype.step = function (field) {
    if (field) {
        this.x = field.x;
        this.y = field.y;
    }

    if (this.$elem) {
        this.$elem.css({
            left: (this.x * this.size) + 25 + 'px',
            top: (this.y * this.size) + 25 + 'px'
        });

        if (this.position > -1) {
            Sfx.play('move');
        }
    }
};

Pawn.prototype.kill = function () {
    var field = this.player.start.getFreeField();
    
    if (field) {
        field.setPawn(this);
        this.move([field]);
        this.position = -1;
    }
};

Pawn.prototype.isMovable = function () {
    var p = this.position,
        end = this.player.end;

    if (p === 43 || (p === 42 && end.checkField(3)) ||
        (p === 41 && end.checkField(3) && end.checkField(2))) {
        return false;
    }

    return true;
};