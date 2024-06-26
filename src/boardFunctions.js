import { Gameboard } from "./gameboardClass";
import { Ship } from "./shipClass";
import { createBody } from "./domElemCreation";
import './style.css';

createBody();

function startGame(){

    let p1gameboard = new Gameboard;
    const p1Carrier = new Ship('carrier', 5);
    const p1Destroyer = new Ship('destroyer', 4);
    const p1Battleship1 = new Ship('battleship1', 3); // changed from 'battleship'
    const p1Battleship2 = new Ship('battleship2', 3);
    const p1LifeRaft = new Ship('lifeRaft', 1);

    let p2gameboard = new Gameboard;
    const p2Carrier = new Ship('carrier', 5);
    const p2Destroyer = new Ship('destroyer', 4);
    const p2Battleship1 = new Ship('battleship1', 3); // changed from 'battleship'
    const p2Battleship2 = new Ship('battleship2', 3);
    const p2LifeRaft = new Ship('lifeRaft', 1);

    let currentShip;
    let currentGridSquare;
    let currentGameboard;
    let playerHasAttacked = 0;
    let gameboardOneSquares = document.querySelectorAll('.gameboardOneSquare');
    let gameboardTwoSquares = document.querySelectorAll('.gameboardTwoSquare');

    const newGameBtn = document.querySelector('.newGameBtn');
    newGameBtn.addEventListener('click', () => {
        const mainContainerDiv = document.querySelector('.mainContentContainer');
        mainContainerDiv.classList.remove('hidden');
        newGameBtn.classList.add('hidden');
    })

    function dragStart() {
        this.style.opacity = '0.4';
    };

    function dragOver(e) {
        e.preventDefault();
        this.classList.add('over');
        return false;
    };

    function removeOver(e) {
        this.classList.remove('over');
    }

    function dragLeave(e) {
        this.classList.remove('over');
    }

    function confirmShipAndBoard(e) {
        currentShip = e.target.classList[0]; // the ship name
        if (e.target.classList[1] === 'p1'){ // 'p1'/'p2' -- the player that owns the ship
            currentGameboard = p1gameboard;
        } else {
            currentGameboard = p2gameboard;
        }
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
                addConfirmShipPlacementBtn(player);
            }
            
        }
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

    function checkForEdge(gridSquare, ship) {
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

    function disableShip(e) {
        e.target.removeAttribute("draggable"); // **
        e.target.classList.add('hidden'); // **
        // ** stops user from placing ships on grid repetitively
        // ** WILL HAVE TO RE-ENABLE IF A GAME/BOARD IS RESET
    }

    function addShipResetBtn(player) {
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

    function resetBtnListener(btn) {
        btn.addEventListener('click', (e) => {
            let currentBtn = () => {
                let p1Ships = document.querySelectorAll('.p1.hidden');
                let p2Ships = document.querySelectorAll('.p2.hidden');
                if(e.target.classList.contains('one')){
                    e.target.classList.add('hidden');
                    document.querySelector('.confirmBtn.one').classList.add('hidden');
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
                    document.querySelector('.confirmBtn.two').classList.add('hidden');
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

    function addConfirmShipPlacementBtn(player) {
        let p1ConfirmBtn = document.querySelector('.confirmBtn.one');
        let p2ConfirmBtn = document.querySelector('.confirmBtn.two');
        let shipContainer;
        let confirmBtn = document.createElement('button');
        confirmBtn.classList.add(`confirmBtn`, `${player}`);
        confirmBtn.textContent = "CONFIRM SHIP PLACEMENT";

        if(player === 'one'){
            if(p1ConfirmBtn){
                p1ConfirmBtn.classList.remove('hidden');
                return;
            } else {
                shipContainer = document.querySelector('.shipContainer.p1Ships');
                shipContainer.appendChild(confirmBtn);
                confirmShipsBtnListener(confirmBtn, player);
                shipContainer = null;
            }
        } else {
            if(p2ConfirmBtn){
                p2ConfirmBtn.classList.remove('hidden');
                return;
            } else {
                shipContainer = document.querySelector('.shipContainer.p2Ships');
                shipContainer.appendChild(confirmBtn);
                confirmShipsBtnListener(confirmBtn, player);
                shipContainer = null;
            }
        }
        return;
    }

    function confirmShipsBtnListener(btn, player) {
        btn.addEventListener('click', () => {
            if(player === 'one') {
                document.querySelector('.gameboardOne').classList.add('hidden');
                nextPlayerDialog(player);
            } else {
                startGameDialog();
            }
        });
    }

    function startGameDialog() {
        let startGameDialog = document.querySelector('.startGameDialog');
        let startGameBtn = document.querySelector('.startGameBtn');
        startGameDialog.showModal();
        startGameDialog.addEventListener('cancel', (e) => {
            e.preventDefault();
        });
        startGameBtn.addEventListener('click', () => {
            
            document.querySelector('.gameboardOne').classList.remove('hidden'); // show p1 their own grid on their turn
            document.querySelector('.resetBtn.one').classList.add('hidden'); // hide p1 resetShips btn
            document.querySelector('.confirmBtn.one').classList.add('hidden'); // hide p1 confirmShips btn
            document.querySelector('.resetBtn.two').classList.add('hidden'); // hide p2 resetShips btn
            document.querySelector('.confirmBtn.two').classList.add('hidden'); // hide p2 confirmShips btn
            document.querySelector('.p1TurnFinContainer').classList.remove('hidden'); // show the 'Turn Finished' btn
            gameboardTwoSquares.forEach((square) => {
                square.classList.add('gameboardSquareAttack');
                square.addEventListener('click', addListenerToGridContainer);
                if(square.classList.contains('occupied')){
                    square.classList.add('mimic');
                    square.classList.remove('occupied');
                }
            })
            startGameDialog.close();
        })
        turnFinBtnListener();
    }

    function addListenerToGridContainer(e) {
        if(e.target.classList.contains('gameboardOneSquare')){
            playerAttackReady(e.target);
        } else if (e.target.classList.contains('gameboardTwoSquare')){
            playerAttackReady(e.target);
        }
    }

    function playerAttackReady(square) {   
        if(playerHasAttacked === 1){
            alert (`You've already attacked!`)
            return;
        } else if (square.style.backgroundColor === 'red' || square.style.backgroundColor === 'blue'){
            alert ('Position already attacked!')
            return;
        } else {
            playerHasAttacked = 1; // increase so we know the attack has happened
        }

        
    
        let target = square.classList[1].slice(3);
        let currentPlayerGameboard = square.classList[1].includes('one') ? p1gameboard : p2gameboard;
        let attackResult = currentPlayerGameboard.receiveAttack(parseInt(target));
    
        if (attackResult === 'hit') {
            square.style.backgroundColor = 'red';
        } else {
            square.style.backgroundColor = 'blue';
        }
    }

    function turnFinBtnListener() {
        playerHasAttacked = 0;
        let p1TurnFinBtn = document.querySelector('.p1TurnFinBtn');
        let p2TurnFinBtn = document.querySelector('.p2TurnFinBtn');
        let nextPlayerDialog = document.querySelector('.nextPlayerDialog');

        p1TurnFinBtn.addEventListener('click', () => {
            if(playerHasAttacked === 0){ // checks if player has taken their turn
                alert('turn not taken!');
                return;
            } else {
                playerHasAttacked = 0;
            }
            nextPlayerDialog.showModal();
            playerContinue(p1TurnFinBtn);
        })

        p2TurnFinBtn.addEventListener('click', () => {
            if(playerHasAttacked === 0){ // checks if player has taken their turn
                alert('turn not taken!');
                return;
            } else {
                playerHasAttacked = 0;
            }
            nextPlayerDialog.showModal();
            playerContinue(p2TurnFinBtn);
        })
    }

    function nextPlayerDialog(player) {
        //make this function close the dialog and prep the next player
        let nextPlayerDialog = document.querySelector('.nextPlayerDialog');
        nextPlayerDialog.showModal();
        nextPlayerDialog.addEventListener('cancel', (e) => {
            e.preventDefault();
        });
        playerContinue(player);
    }

    function playerContinue(player) {
        let nextPlayerDialog = document.querySelector('.nextPlayerDialog');
        let continueBtn = document.querySelector('.continueBtn');
        let p1TurnFinBtn = document.querySelector('.p1TurnFinBtn');
        continueBtn.addEventListener('click', () => {
            if(player === 'one'){
                document.querySelector('.gameboardTwo').classList.remove('hidden');
                nextPlayerDialog.close();
                return;
            }
            
            if(player === p1TurnFinBtn) {
                gameboardOneSquares.forEach((square) => {
                    square.addEventListener('click', addListenerToGridContainer);
                    square.classList.add('gameboardSquareAttack');
                    if(square.classList.contains('occupied')){
                        square.classList.add('mimic'); // has no style, simply a placeholder to remember which ones were occupied
                        square.classList.remove('occupied');
                    }
                })
                document.querySelector('.p1TurnFinContainer').classList.add('hidden');
                document.querySelector('.p2TurnFinContainer').classList.remove('hidden');
                gameboardTwoSquares.forEach((square) => {
                    // square.addEventListener('click', addSquareClickListener(square));
                    square.removeEventListener('click', addListenerToGridContainer);
                    square.classList.remove('gameboardSquareAttack');
                    if(square.classList.contains('mimic')){
                        square.classList.add('occupied');
                        square.classList.remove('mimic');
                    }
                })

                nextPlayerDialog.close();
            } else {
                gameboardTwoSquares.forEach((square) => {
                    square.addEventListener('click', addListenerToGridContainer);
                    square.classList.add('gameboardSquareAttack');
                    if(square.classList.contains('occupied')){
                        square.classList.add('mimic'); // has no style, simply a placeholder to remember which ones were occupied
                        square.classList.remove('occupied');
                    }
                })
                document.querySelector('.p2TurnFinContainer').classList.add('hidden');
                document.querySelector('.p1TurnFinContainer').classList.remove('hidden');
                gameboardOneSquares.forEach((square) => {
                    // square.addEventListener('click', addSquareClickListener(square));
                    square.removeEventListener('click', addListenerToGridContainer);
                    square.classList.remove('gameboardSquareAttack');
                    if(square.classList.contains('mimic')){
                        square.classList.add('occupied');
                        square.classList.remove('mimic');
                    }
                })
                nextPlayerDialog.close();
            }
        })
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
        square.addEventListener('dragleave', dragLeave);
        square.addEventListener('drop', getStartPosition);
        square.addEventListener('drop', removeOver);
    })

    gameboardTwoSquares.forEach((square) => {
        square.addEventListener('dragover', dragOver);
        square.addEventListener('dragleave', dragLeave);
        square.addEventListener('drop', getStartPosition);
        square.addEventListener('drop', removeOver);
    })
}

startGame();