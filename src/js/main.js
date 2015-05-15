/**
 * Created with JetBrains PhpStorm.
 * User: uldissilins
 * Date: 11/05/15
 * Time: 13:26
 * To change this template use File | Settings | File Templates.
 */

function square() {
    this._isAlive = false;
    this._neighbours = new Array();

    function isAlive(){
        return this._isAlive;
    }

    function becomeAlive(){
        this._isAlive = true;

    }

    function becomeDead(){
        this._isAlive = false;
    }

    function neighbours(){
        return this._neighbours;
    }

    function addNeighbour(sqCoords){
        if(!this._neighbours){
            this._neighbours = new Array();
        }
        this._neighbours.push(sqCoords);
    }

    return {
        isAlive: isAlive,
        becomeAlive: becomeAlive,
        becomeDead: becomeDead,
        neighbours: neighbours,
        addNeighbour: addNeighbour
    }
};





function initGame(map){
    var game = new Array();

    for(var i = 0; i < map.length; i++){
        var row = new Array();
        for(var j = 0; j < map[0].length; j++){
            var sq = new square();
            if(map[i][j] == "x"){
                sq.becomeAlive();
            }

            for(var ny = -1; ny <2; ny++){
                for(var nx = -1; nx <2; nx++){
                    var newX = i+nx;
                    var newY = j+ny;

                    if(map[newY] && map[newY][newX]){
                        sq.addNeighbour({"x":newX,"y":newY});
                    }


                }
            }


            row.push(sq);
        }
        game.push(row);
    }

    return game;
};


function nextGen(map){
    var nextGen = map;

    function getAllNeighbours(map){
        var neighbourList = new Array();
        var max = x*y;
        for(var ny = -1; ny <2; ny++){
            for(var nx = -1; nx <2; nx++){
                var n = sq + (ny*x)+nx;
                neighbourList.push(n);
/*                if(n>-1 && n<max){
                    neighbourList.push(n);
                }*/
            }
        }

        var index = neighbourList.indexOf(sq);
        if (index > -1) {
            neighbourList.splice(index, 1);
        }

        return neighbourList;
    }

    /*function getCoords(sq, x, y){
        var s = {
            x : 1,
            y : 1
        };

        //1. atrodam esošā koordinātas
        s.x = sq % (x);
        s.y = Math.floor(sq/(x));
        return s;
    }


    function willSurvive(sq, x, y){
        var ods = false;
        var current = getCoords(sq, x, y);

        var neighbors = new Array();
        for(var nb = 1; nb <9; nb++){

        }



        return ods;
    }

    for(var i = 0; i < map.length; i++){
        var neightbours = getAllNeighbours(i);
        willSurvive(i, map.dimensions.x,map.dimensions.y);
    }*/

    console.log(getAllNeighbours(map));

    return nextGen;
}


var print = function(game){

    var output = "";
    for(var a = 0; a < game.length; a++){

        for(var b = 0; b < game[0].length; b++){

            var s = parseInt((a*game.length)+b);

            var res = game[a][b].isAlive();
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

var map =  ["x     ",
            "  xx  ",
            "  xx  ",
            "x  x  ",
            "x    x"];


var game = initGame(map, map[0].length, map.length);

/* testing field */
//console.log(game);
console.log(game[0][0].neighbours());
//print(game);
//nextGen(game);
/*var sq = new square("X");
console.log(sq);
sq.becomeDead();
console.log("result2", sq.isAlive());
sq.becomeAlive();
console.log("result2", sq.isAlive());*/
