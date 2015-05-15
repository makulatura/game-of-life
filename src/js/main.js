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

    //todo generation counter
    //todo module where everything is under game object. For example game.print, game.nextGen, game.grid


    for(var i = 0; i < map.length; i++){
        var row = new Array();
        for(var j = 0; j < map[0].length; j++){
            var sq = new square();

            if(map[i][j] == "x"){

                sq.becomeAlive();
            } /*else {
                sq.becomeDead();
            }*/
            for(var ny = -1; ny <2; ny++){
                for(var nx = -1; nx <2; nx++){
                    var newX = j+ny;
                    var newY = i+nx;

                    //if valid neighbour chosen and not self
                    if((map[newY] && map[newY][newX]) && ((newX != j) || (newY != i))){
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


function nextGen(game){
    var nextGen = new Array();
    //taisām ciklu
    //pārbaudām katrā šūnā kaimiņus un atgriežam vajadzīgo vērtību nextGenā
    for(var i = 0; i < game.length; i++){
        var row = new Array();
        for(var j = 0; j < game[0].length; j++){

            var cell = Object.create(game[i][j]);
            var nb = cell.neighbours();

            var liveNeighbours = 0;
            //skaitām dzīvos kaimiņus
            for(var k = 0; k < nb.length; k++){

                var nbx = nb[k].x;
                var nby = nb[k].y;
                if(game[nby][nbx].isAlive()){
                    liveNeighbours++;
                }
            }

            if(liveNeighbours < 2){
                //mirst
                cell.becomeDead();

            } else if(liveNeighbours > 3){
                //mirst
                cell.becomeDead();
            }else if(liveNeighbours == 3 && !cell.isAlive()) {
                cell.becomeAlive();
            }
            row.push(cell);
        }

        nextGen.push(row);
    }



    return nextGen;
}


var print = function(game){

    var output = "";
    for(var a = 0; a < game.length; a++){

        for(var b = 0; b < game[0].length; b++){

            var res = game[a][b].isAlive();

            if(res){
                output +="x";
            } else {
                output +=".";
            }

        }
        output +="\r\n";
    }

    return output;
}



/*var map =  ["      ",
            "x     ",
            "x     ",
            "x     ",
            "      "];*/

/*

 ......
 x.....
 x.....
 x.....
 ......
* */


/* testing field */
/*console.log(print(game));

game = nextGen(game);
console.log(print(game));
game = nextGen(game);
console.log(print(game));*/
var game = new Array();

$("#initialize").click(function(){
    var userMap = $("#userMap").val();
    var map = userMap.split("\n");

    game = initGame(map, map[0].length, map.length);
    $("#lifeMap").html(print(game));

});

$("#executeGen").click(function(){
    game = nextGen(game);

    $("#lifeMap").html(print(game));

});