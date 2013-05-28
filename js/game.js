(function (global) {
    var game = {
            board: null,
            current: -1,
            players: [],
            playerList: null
        },
        RED = 2,
        GREEN = 3,
        YELLOW = 4,
        BLUE = 5;

    function nextPlayer() {
        var next = game.current + 1,
            arrow = $('.arrow'),
            i = 0;

        while (game.players[i]) {
            game.players[i].blur();
            i++;
        }

        arrow.removeClass('arrow-' + game.current);
        game.current = next > 3 ? 0 : next;
        arrow.addClass('arrow-' + game.current);
        game.players[game.current].focus();
    }

    function addPlayer(name, color) {
        game.players.push(new Player(name, color, game.board));
        
        // todo convert to component with focus indicator etc.
        game.playerList.append(
            '<li class="player player-' + color + '"><div class="icon"></div>' + name + '</li>'
        );
    }

    function init() {
        //todo remove
        global.game = game;
        global.nextPlayer = nextPlayer;
        game.playerList = $('#players-list');
        
        game.board = new Board('board');
        game.board.dice = new Dice('content');
        addPlayer('Player 1', RED);
        addPlayer('Player 2', GREEN);
        addPlayer('Player 3', YELLOW);
        addPlayer('Player 4', BLUE);
        nextPlayer();
    }
    
    global.addEventListener('load', function () {
        init();
    });
}(this));