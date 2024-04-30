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
    constructor(name, length, orientation = 0, hits = 0, sunk = false){
        this.name = name;
        this.length = length;
        this.orientation = orientation;
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

    function changeShipOrientation() {
        if(shipOrientation === 0){
            shipOrientation = 1;
        } else {
            shipOrientation = 0;
        }
    }

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
                squareNum += 10;
            }

            if(currentGameboard.ships.length === 5){
                addShipResetBtn(player);
            }
            
        }
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
        if(checkLocation(gridSquare, currentShipInstance) === currentShipInstance.length){
            let shipStart = parseInt(gridSquare); // number value of grid square
            let shipEnd = parseInt(shipStart) + parseInt(currentShipInstance.length);
            currentGameboard.placeShip(currentShipInstance, shipStart, shipEnd);

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
    // console.log(currentShipInstance.orientation)
    // console.log(`this player: ${currentGridSquare.slice(0, 3)}`); // one/two; the gameboards
    }

    function checkLocation(gridSquare, ship) {
        let square = parseInt(gridSquare);
        let result = 0;
        for(let i = 0; i < ship.length; i++){
            if(currentGameboard.board[square] !== null){
                result -= 1;
            } else {
                square++;
                result += 1;
            }
        }
        return result;
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
                    console.log(p1gameboard);
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
                    
                    console.log(p1gameboard);
                    return `you clicked p1`;
                } else {
                    console.log(p2gameboard);
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
                    
                    console.log(p2gameboard);
                    return `you clicked p2`;
                }
            }
            console.log(currentBtn());
        })
    }

    let p1Ships = document.querySelectorAll('.p1'); // ships for ship listener
        p1Ships.forEach((ship) => {
            ship.addEventListener('dragstart', dragStart);
            ship.addEventListener('dragend', (e) => {
                confirmShipAndBoard(e);
                placeShipInArr(e);
            });
        });

    let p2Ships = document.querySelectorAll('.p2'); // ships for ship listener
        p2Ships.forEach((ship) => {
            ship.addEventListener('dragstart', dragStart);
            ship.addEventListener('dragend', (e) => {
                confirmShipAndBoard(e);
                placeShipInArr(e);
            });
        });

    gameboardOneSquares.forEach((square) => {
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', getStartPosition);
        square.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })
    })

    gameboardTwoSquares.forEach((square) => {
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', getStartPosition);
        square.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })
    })
}

startGame();


// if a ship is placed in location 'X' and shipOrientation = 0 (we'll make 0 be the default to place horizontally, and 1 the setting to place vertically (we can preventDefault for the right mouse click, and maybe make a listener for the right mouse click to run the function to change the ship orientation))
// ****** note for the right click idea
// we should allow player to place their ships, and change orientation if they want, before starting the game (make it so all the ships start horizontally, that way, a player can't place a ship on an edge vertically and turn it 'out of bounds')

// make the gameboardSquares from X to 'ship.lengths' end
// (so if the ship is 4 long, and is placed/starts at 47, then 50 is the end (47, 48, 49, 50))

// so make 47, 48, 49, 50 have a border property that makes that div's border color "blue" (or whatever) to indicate a ship was placed there, and then just make the opacity of the ship that was dragged to 0.4, and make it non-draggable (so set draggable = false)

// this way, if a ship is hit, we can change the color of the square's border to red, so the player knows
