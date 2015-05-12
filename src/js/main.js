/**
 * Created with JetBrains PhpStorm.
 * User: uldissilins
 * Date: 11/05/15
 * Time: 13:26
 * To change this template use File | Settings | File Templates.
 */

function square(state){
    var isAlive = false;

    switch (state) {
        case "O":
            becomeDead();
            break;
        case "X":
            becomeAlive();
            break;
        default:

            break;

    }

    function becomeAlive(){
        isAlive = true;
    }

    function becomeDead(){
        isAlive = false;
    }

    return {
        isAlive: function(){
            return isAlive;
        },
        becomeAlive: function(){
            becomeAlive();

        },
        becomeDead: function(){
            becomeDead();
        }

    }
};


function initGame(map, x, y){
    var game = new Array;
    var dimensions = {};
    dimensions.x = x;
    dimensions.y = y;
    game.dimensions = dimensions;

    for(var i = 0; i < map.length; i++){
        game.push(square(map[i]));
    }

    return game;
};

var print = function(game){

    var x = game.dimensions.x;
    var y = game.dimensions.y;
    var output = "";
    for(var a = 0; a < y; a++){

        for(var b = 0; b < x; b++){

            var s = parseInt((a*y)+b);

            var res = game[s].isAlive();
            if(res){
                output +="X";
            } else {
                output +="O";
            }

        }
        output +="\r\n";
    }
    console.log(output);
}

function processGeneration(){

};

var map =  ["X","0","0","0","0",
    "0","0","X","0","0",
    "0","0","X","X","0",
    "0","0","X","0","0",
    "0","0","0","0","X"];


var game = initGame(map, 5, 5);

/* testing field */
//console.log(game);

print(game);