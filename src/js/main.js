/**
 * Created with JetBrains PhpStorm.
 * User: uldissilins
 * Date: 11/05/15
 * Time: 13:26
 * To change this template use File | Settings | File Templates.
 */

    //todo automatic generation loop

(function(){



var gameOfLife = (function (){
     var map = new Array();
     var grid = new Array();
     var _generation = 0;

    function generation(){ return _generation; };

    function increaseGeneration(){  _generation++; };

    function setMap(userMap){ map = userMap; };

    function square() {
        this._isAlive = false;
        this._neighbours = new Array();

        function isAlive(){ return this._isAlive; }

        function becomeAlive(){ this._isAlive = true; }

        function becomeDead(){ this._isAlive = false; }

        function neighbours(){ return this._neighbours; }

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



    function initGame(){
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


        grid = game;
    };


    function nextGen(){
        var nextGen = new Array();
        //taisām ciklu
        //pārbaudām katrā šūnā kaimiņus un atgriežam vajadzīgo vērtību nextGenā
        for(var i = 0; i < grid.length; i++){
            var row = new Array();
            for(var j = 0; j < grid[0].length; j++){

                var cell = Object.create(grid[i][j]);
                var nb = cell.neighbours();

                var liveNeighbours = 0;
                //skaitām dzīvos kaimiņus
                for(var k = 0; k < nb.length; k++){

                    var nbx = nb[k].x;
                    var nby = nb[k].y;
                    if(grid[nby][nbx].isAlive()){
                        liveNeighbours++;
                    }
                }

                if(liveNeighbours < 2 || liveNeighbours > 3){
                    //mirst
                    cell.becomeDead();
                } else if(liveNeighbours == 3 && !cell.isAlive()) {
                    cell.becomeAlive();
                }
                row.push(cell);
            }

            nextGen.push(row);
        }


        increaseGeneration();
        grid = nextGen;
    };


    function print(){

        var output = "";
        for(var a = 0; a < grid.length; a++){

            for(var b = 0; b < grid[0].length; b++){

                var res = grid[a][b].isAlive();

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






    return {
        setMap: setMap,
        initGame: initGame,
        nextGen: nextGen,
        print: print,
        generation: generation
    }

})();

/*

 ......
 x.....
 x.....
 x.....
 ......
* */


    $("#initialize").click(function(){
        var userMap = $("#userMap").val();
        var map = userMap.split("\n");
        gameOfLife.setMap(map);
        gameOfLife.initGame();
        $("#lifeMap").html(gameOfLife.print());

    });

    $("#executeGen").click(function(){
        gameOfLife.nextGen();
        $("#lifeMap").html(gameOfLife.print());

        $("#gen").text(gameOfLife.generation());
    });

})();
