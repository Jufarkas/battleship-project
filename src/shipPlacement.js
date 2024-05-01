// import { Gameboard } from "./gameboardClass";
// import { Player } from "./playerClass";
// import { Ship } from "./shipClass";


class Player {
    constructor(name){
        this.name = name;
        this.playerGameboard = new Gameboard();
        this.carrier = new Ship('carrier', 5);
        this.destroyer = new Ship('destroyer', 4);
        this.battleship = new Ship('battleship', 3);
        this.battleship2 = new Ship('battleship2', 3);
        this.lifeRaft = new Ship('lifeRaft', 1);
    }
}


class Gameboard {
    constructor(){
        this.board = new Array(100).fill(null);
        this.shipPositions = new Map(); // holds key-value pairs;
        //{ 'ship.name' => [ship coordinates] } layout for each ship added via placeShip()
        // can access .keys(); .values(); .size |no brackets after .size|
        this.ships = [];
    }

    placeShip(ship, shipStart, shipEnd){
        this.ships.push(ship);
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

            if(shipEnd > shipStart + 9){ //"is ship vertical or horizontal?"
                shipStart += 10; // if vertical, we know the next spot in the array/grid it should be is 10 places away (in our 10x10 array/grid)
            } else {
                shipStart++; // if horizontal, it's just the next space over
            }
        }
    };

    checkGameStatus(){
        if(this.ships.length === 0){
            return 'GAME OVER'
        } else {
            return 'it aint over yet';
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


class Ship {
    constructor(name, length, hits = 0, sunk = false){
        this.name = name;
        this.length = length;
        this.orientation = 0;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit(){
        this.hits++;
        if(this.hits !== this.length){
            return 'hit';
        } else {
            this.sunk = true;
            return 'sunk';
        }
    }
}


//
//                               ______________
//                              |              |
//                              | Hey go away. |                               
//                              | Don't touch  |
//     || __   ||               |  what's up   |
//     ||=\_`\=||               |    there     |
//     || (__/ ||               |______________|
//     ||  | | :-"""-.           \
//     ||==| \/-=-.   \          /
//     ||  |(_|o o/   |_        /
//     ||   \/ "  \   ,_)      /
//     ||====\ ^  /__/ -------'
//     ||     ;--'  `-.
//     ||    /      .  \
//     ||===;        \  \
//     ||   |         | |
//     || .-\ '     _/_/
//     |:'  _;.    (_  \
//     /  .'  `;\   \\_/
//    |_ /     |||  |\\
//   /  _)=====|||  | ||
//  /  /|      ||/  / //
//  \_/||      ( `-/ ||
//     ||======/  /  \\ .-.
//     ||      \_/    \'-'/
//     ||      ||      `"`
//     ||======||
//     ||      ||
//     ||      ||
//     ||======||
//     ||      ||
//     ||      ||
//     ||======||
//     ||      ||
//     ||      ||
//     ||======||
//     ||      ||
//     ||      ||
//     ||======||
//     ||      ||
//     ||      ||
//     ||======||
//     ||      ||
//     ||      ||
//     ||======||
//     ||      ||
//     ||      ||
//     ||======||
//     ||      ||
//     ||      ||
//     ||======||




function startGame(){

    let p1gameboard = new Gameboard;
    const p1Carrier = new Ship('carrier', 5);
    const p1Destroyer = new Ship('destroyer', 4);
    const p1Battleship1 = new Ship('battleship1', 3); // changed from 'battleship'
    const p1Battleship2 = new Ship('battleship2', 3);
    const p1LifeRaft = new Ship('lifeRaft', 1);

    let p1ShipOrientations = [0, 0, 0, 0, 0];

    // const playerOneCarrier = document.querySelectorAll('.carrier.p1');
    // const playerOneDestroyer = document.querySelectorAll('.destroyer.p1');
    // const playerOneBattleship1 = document.querySelectorAll('.battleship1.p1');
    // const playerOneBattleship2 = document.querySelectorAll('.battleship2.p1');
    // const playerOneLifeRaft = document.querySelectorAll('.lifeRaft.p1');

    let p2gameboard = new Gameboard;
    const p2Carrier = new Ship('carrier', 5);
    const p2Destroyer = new Ship('destroyer', 4);
    const p2Battleship1 = new Ship('battleship1', 3); // changed from 'battleship'
    const p2Battleship2 = new Ship('battleship2', 3);
    const p2LifeRaft = new Ship('lifeRaft', 1);

    let p2ShipOrientations = [0, 0, 0, 0, 0];

    // const playerTwoCarrier = document.querySelectorAll('.carrier.p2');
    // const playerTwoDestroyer = document.querySelectorAll('.destroyer.p2');
    // const playerTwoBattleship1 = document.querySelectorAll('.battleship1.p2');
    // const playerTwoBattleship2 = document.querySelectorAll('.battleship2.p2');
    // const playerTwoLifeRaft = document.querySelectorAll('.lifeRaft.p2');

    let currentShip;
    let currentGridSquare;
    let currentGameboard;
    let gameboardOneSquares = document.querySelectorAll('.gameboardOneSquare');
    let gameboardTwoSquares = document.querySelectorAll('.gameboardTwoSquare');

    function dragStart() {
        this.style.opacity = '0.4';
    };

    function confirmShipAndBoard(e) {
        currentShip = e.target.classList[0]; // the ship name
        if (e.target.classList[1] === 'p1'){ // 'p1'/'p2' -- the player that owns the ship
            currentGameboard = p1gameboard;
        } else {
            currentGameboard = p2gameboard;
        }
    };

    function dragOver(e) {
        e.preventDefault();
        return false;
    };

    function getStartPosition(e) {
        currentGridSquare = e.target.classList[1];
    }

    function placeShipOnBoard(ship, player, squareNum){
        for(let i = 0; i < ship.length; i++){
            let shipSquares = document.querySelector(`.${player}${squareNum}`);
            shipSquares.classList.add('occupied');

            if(ship.orientation === 0){
                squareNum++;
            } else {
                squareNum = parseInt(squareNum) + 10;
                squareNum = squareNum.toString();
            }

            if(currentGameboard.ships.length === 5){
                addShipResetBtn(player);
            }
            
        }
        console.log(currentGameboard)
    }

    async function placeShipInArr(e) {
        let currentShipInstance;
        let gridSquare = currentGridSquare.slice(3);
        await new Promise(resolve => {
            const checkCurrentShip = () => {
              if (currentShip && currentGameboard && currentGridSquare) {
                resolve();
              } else {
                setTimeout(checkCurrentShip, 20); // re-check after 20ms
              }
            }
            
            checkCurrentShip();
        });
        switch(currentShip) {
            case 'carrier':
                currentShipInstance = currentGameboard == p1gameboard ? p1Carrier : p2Carrier;
                break;
            case 'destroyer':
                currentShipInstance = currentGameboard == p1gameboard ? p1Destroyer : p2Destroyer;
                break;
            case 'battleship1':
                currentShipInstance = currentGameboard == p1gameboard ? p1Battleship1 : p2Battleship1;
                break;
            case 'battleship2':
                currentShipInstance = currentGameboard == p1gameboard ? p1Battleship2 : p2Battleship2;
                break;
            case 'lifeRaft':
                currentShipInstance = currentGameboard == p1gameboard ? p1LifeRaft : p2LifeRaft;
                break;
            default:
                return 'invalid ship selection';
        }
        if(checkForEdge(gridSquare, currentShipInstance)){
            alert('error: ship will breach an edge');
            return;
        }
        
        if(checkLocation(gridSquare, currentShipInstance) === currentShipInstance.length){
            let shipStart = parseInt(gridSquare); // number value of grid square
            let shipEnd = parseInt(shipStart) + parseInt(currentShipInstance.length);
            if(currentShipInstance.orientation === 1 && currentShipInstance.length > 1){
                shipEnd = shipStart + ((currentShipInstance.length - 1) * 10);
                currentGameboard.placeShip(currentShipInstance, shipStart, shipEnd);
            } else {
                currentGameboard.placeShip(currentShipInstance, shipStart, shipEnd);
            }

            let player = currentGridSquare.slice(0, 3);
            let squareNum = currentGridSquare.slice(3);

            placeShipOnBoard(currentShipInstance, player, squareNum);
            
            if(currentGameboard.ships.find((ship) => ship.name === currentShip)){
                disableShip(e); // disables ship if placed correctly (sometimes drag/drop fails if not placed 'perfectly')
            }

            // 'wipe' the 3 below so no values remain when placing the next ship
            currentGridSquare = null;
            currentGameboard = null;
            currentShip = null;

        } else {
            alert("position isn't empty!");
            return;
        };
    }

    // function findShipStart(e){
    //     if(e.target.classList[2] === "occupied"){
    //         let shipName;
    //         let shipStart;
    //         let shipInArr;
    //         let shipLocation = parseInt(e.target.classList[1].slice(3));
    //         for(let [key, value] of p1gameboard.shipPositions.entries()) {
    //             if (value.includes(shipLocation)){
    //                 shipInArr = p1gameboard.ships.find((ship) => ship.name === key);
    //                 shipName = key;
    //                 shipStart = value[0];
    //             }
    //         }
    //         return shipStart;
    //     }
    // }

    function checkLocation(gridSquare, ship) {
        let square = parseInt(gridSquare);
        let result = 0;
        if(ship.orientation === 1){
            for(let i = 0; i < ship.length; i++){
                if(currentGameboard.board[square] !== null){
                    result -= 1;
                } else {
                    square += 10;
                    result += 1;
                }
            }
        } else {
            for(let i = 0; i < ship.length; i++){
                if(currentGameboard.board[square] !== null){
                    result -= 1;
                } else {
                    square++;
                    result += 1;
                }
            }
        }
        return result;
    }

    function checkForEdge(gridSquare, ship){
        let start = parseInt(gridSquare);

        if(ship.orientation === 1){
            let rowNum = Math.floor(start / 10);
            let maxRowNum = 10 - ship.length;
            if(rowNum > maxRowNum){
                return true;
            }
        } else {
            let maxColNum = 10 - ship.length;
            let colNum = start % 10;
            if (colNum > maxColNum){
                return true;
            }
        }
    }

    function disableShip(e){        
        e.target.removeAttribute("draggable"); // **
        e.target.classList.add('hidden'); // **
        // ** stops user from placing ships on grid repetitively
        // ** WILL HAVE TO RE-ENABLE IF A GAME/BOARD IS RESET
    }

    function addShipResetBtn(player){
        let p1ResetBtn = document.querySelector('.resetBtn.one');
        let p2ResetBtn = document.querySelector('.resetBtn.two');
        let shipContainer;
        let resetBtn = document.createElement('button');
        resetBtn.classList.add(`resetBtn`, `${player}`);
        resetBtn.textContent = "RESET SHIPS";

        if(player === 'one'){
            if(p1ResetBtn){
                p1ResetBtn.classList.remove('hidden');
                return;
            } else {
                shipContainer = document.querySelector('.shipContainer.p1Ships');
                shipContainer.appendChild(resetBtn);
                resetBtnListener(resetBtn);
                shipContainer = null;
            }
        } else {
            if(p2ResetBtn){
                p2ResetBtn.classList.remove('hidden');
                return;
            } else {
                shipContainer = document.querySelector('.shipContainer.p2Ships');
                shipContainer.appendChild(resetBtn);
                resetBtnListener(resetBtn);
                shipContainer = null;
            }
        }
        return;
    }

    function resetBtnListener(btn){
        btn.addEventListener('click', (e) => {
            let currentBtn = () => {
                let p1Ships = document.querySelectorAll('.p1.hidden');
                let p2Ships = document.querySelectorAll('.p2.hidden');
                if(e.target.classList.contains('one')){
                    e.target.classList.add('hidden');
                    p1gameboard = new Gameboard;
                    gameboardOneSquares.forEach((square) => {
                        if(square.classList.contains('occupied')){
                            square.classList.remove('occupied');
                        }
                    })
                    p1Ships.forEach((ship) => {
                        ship.classList.remove('hidden');
                        ship.setAttribute('draggable', 'true')
                        ship.style.opacity = "1";
                    })
                    
                    return `you reset p1`;
                } else {
                    e.target.classList.add('hidden');
                    p2gameboard = new Gameboard;
                    gameboardTwoSquares.forEach((square) => {
                        if(square.classList.contains('occupied')){
                            square.classList.remove('occupied');
                        }
                    })
                    p2Ships.forEach((ship) => {
                        ship.classList.remove('hidden');
                        ship.setAttribute('draggable', 'true')
                        ship.style.opacity = "1";
                    })
                    
                    return `you reset p2`;
                }
            }
            console.log(currentBtn());
        })
    }

    function changeShipOrientation(e) {
        if(e.target.classList[1] === 'p1'){ 
            currentGameboard = p1gameboard;
        } else if (e.target.classList[1] === 'p2'){
            currentGameboard = p2gameboard;
        }
        let targetShip;
        let rotation;
        let ship = e.target.classList[0];
        switch(ship) {
            case 'carrier':
                targetShip = currentGameboard == p1gameboard ? p1Carrier : p2Carrier;
                rotation = 'rotateCarrier';
                break;
            case 'destroyer':
                targetShip = currentGameboard == p1gameboard ? p1Destroyer : p2Destroyer;
                rotation = 'rotateDestroyer'
                break;
            case 'battleship1':
                targetShip = currentGameboard == p1gameboard ? p1Battleship1 : p2Battleship1;
                rotation = 'rotateBattleship'
                break;
            case 'battleship2':
                targetShip = currentGameboard == p1gameboard ? p1Battleship2 : p2Battleship2;
                rotation = 'rotateBattleship'
                break;
            case 'lifeRaft':
                targetShip = currentGameboard == p1gameboard ? p1LifeRaft : p2LifeRaft;
                break;
            default:
                return 'invalid ship selection';
        }
        if(e.target.classList[1] === 'p1' || e.target.classList[1] === 'p2'){
            
            if(e.target.classList.contains(rotation)){
                e.target.classList.remove(rotation);
                targetShip.orientation = 0;
                return;
            }
            e.target.classList.add(rotation);
            targetShip.orientation = 1;
        }
    }

    let p1Ships = document.querySelectorAll('.p1'); // ships for ship listener
        p1Ships.forEach((ship) => {
            ship.addEventListener('dragstart', dragStart);
            ship.addEventListener('dragend', (e) => {
                confirmShipAndBoard(e);
                placeShipInArr(e);
            });
            ship.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                changeShipOrientation(e);
            });
        });

    let p2Ships = document.querySelectorAll('.p2'); // ships for ship listener
        p2Ships.forEach((ship) => {
            ship.addEventListener('dragstart', dragStart);
            ship.addEventListener('dragend', (e) => {
                confirmShipAndBoard(e);
                placeShipInArr(e);
            });
            ship.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                changeShipOrientation(e);
            });
        });

    gameboardOneSquares.forEach((square) => {
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', getStartPosition);
        // square.addEventListener('contextmenu', (e) => {
        //     e.preventDefault();
        //     let shipStart = findShipStart(e);
        //     console.log(shipStart);
        // })
    })

    gameboardTwoSquares.forEach((square) => {
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', getStartPosition);
        // square.addEventListener('contextmenu', (e) => {
        //     e.preventDefault();
        //     let shipStart = findShipStart(e);
        //     console.log(shipStart);
        // })
    })
}

startGame();



// if a ship is hit, we can change the color of the square's border to red, so the players know
