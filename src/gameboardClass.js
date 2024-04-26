import { Ship } from "./shipClass";

export class Gameboard {
    constructor(){
        this.board = new Array(100).fill(null);
        this.shipPositions = new Map(); // holds key-value pairs;
        //{ 'ship.name' => [ship coordinates] } layout for each ship added via placeShip()
        // can access .keys(); .values(); .size |no brackets after .size|
        this.ships = [];
    }

    placeShip(ship, shipStart, shipEnd){
        this.ships.push(ship);
        let positionArr = [];
        if(shipStart == null){
            return;
        }
        for(let i = 0; i < ship.length; i++){
            this.board.splice(shipStart, 1, ship);

            if(this.shipPositions.has(ship.name)){
                this.shipPositions.get(ship.name).push(shipStart);
            } else {
                this.shipPositions.set(ship.name, [shipStart]); // 'if the ship doesn't exist already, .set the ship.name && an array containing the ship coordinates to our shipPositions Map'
            }

            positionArr.push(shipStart);

            if(shipEnd > shipStart + 9){ //"is ship vertical or horizontal?"
                shipStart += 10; // if vertical, we know the next spot in the array/grid it should be is 10 places away (in our 10x10 array/grid)
            } else {
                shipStart++; // if horizontal, it's just the next space over
            }
        }
        return positionArr;
    };

    checkGameStatus(){
        if(this.ships.length === 0){
            return 'GAME OVER'
        } else {
            return;
        }
    }

    checkShipStatus(currentShip){
        if(currentShip.sunk === true){
            this.ships.forEach(ship => {
                let shipIndex = this.ships.indexOf(currentShip)
                if(ship.name == currentShip.name){
                    this.ships.splice(shipIndex, 1);
                    this.checkGameStatus();
                    // MIGHT ALSO HAVE TO REMOVE THE SHIP FROM this.shipPositions AFTER .splice()
                    // KEEP THIS AS AN FYI IN CASE WE NEED TO REMOVE THEM AS WELL
                }
            })
        } else {
            return;
        }
    }

    receiveAttack(location){
        if(this.board[location] !== null){
            let shipAttacked = this.checkShipLocation(location);
            shipAttacked.hit();
            this.checkShipStatus(shipAttacked);
            return `hit`;
        } else {
            this.board[location] = 'miss';
            // we can write something later that if(this.board[location] == 'miss'){'gridSquare becomes the color blue'} type thing, to represent a 'missed' hit on the gameboard for the player to see where they're already tried and missed
            return `lol you missed`;
        }
    }

    checkShipLocation(location){
        for(let [key, value] of this.shipPositions.entries()) {
            if (value.includes(location)){
                let shipAtLocation = this.ships.find((ship) => ship.name === key);
                return shipAtLocation;
            }
        }
    }
}

        //[0] [1] [2] [3] [4] [5] [6] [7] [8] [9]
        //[10][11][12][13][14][15][16][17][18][19]
        //[20][21][22][23][24][25][26][27][28][29]
        //[30][31][32][33][34][35][36][37][38][39]
        //[40][41][42][43][44][45][46][47][48][49]
        //[50][51][52][53][54][55][56][57][58][59]
        //[60][61][62][63][64][65][66][67][68][69]
        //[70][71][72][73][74][75][76][77][78][79]
        //[80][81][82][83][84][85][86][87][88][89]
        //[90][91][92][93][94][95][96][97][98][99]