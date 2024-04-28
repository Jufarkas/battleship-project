import { Player } from "./playerClass";

const playerOne = new Player('playerOne');
const playerTwo = new Player('playerTwo');


test('places playerOne battleship at array coordinates 61-63', () => {
    expect(playerOne.playerGameboard.placeShip(playerOne.battleship, 61, 63)).toEqual([61, 62, 63])
});

test('places playerOne battleship2 at array coordinates 16-18', () => {
    expect(playerOne.playerGameboard.placeShip(playerOne.battleship2, 16, 18)).toEqual([16, 17, 18])
});

test('places playerOne carrier at array coordinates 27-67', () => {
    expect(playerOne.playerGameboard.placeShip(playerOne.carrier, 27, 67)).toEqual([27, 37, 47, 57, 67])
});

test('places playerOne destroyer at array coordinates 44-74', () => {
    expect(playerOne.playerGameboard.placeShip(playerOne.destroyer, 44, 74)).toEqual([44, 54, 64, 74])
});

test('places playerOne lifeRaft at the 0th position', () => {
    expect(playerOne.playerGameboard.placeShip(playerOne.lifeRaft, 0, 0)).toEqual([0])
});


test('playerOne destroyer is hit', () => {
    expect(playerOne.playerGameboard.receiveAttack(44)).toEqual('hit');
    expect(playerOne.playerGameboard.receiveAttack(54)).toEqual('hit');
    expect(playerOne.playerGameboard.receiveAttack(64)).toEqual('hit');
    expect(playerOne.playerGameboard.receiveAttack(74)).toEqual('hit');
})

test('playerOne carrier is hit', () => {
    expect(playerOne.playerGameboard.receiveAttack(57)).toBe('hit')
    expect(playerOne.playerGameboard.receiveAttack(27)).toBe('hit')
    expect(playerOne.playerGameboard.receiveAttack(37)).toBe('hit')
    expect(playerOne.playerGameboard.receiveAttack(67)).toBe('hit')
    expect(playerOne.playerGameboard.receiveAttack(47)).toBe('hit')
});

test('playerOne lifeRaft is hit', () => {
    expect(playerOne.playerGameboard.receiveAttack(0)).toBe('hit')
});

test('nice try, playerOne still has ships! GET BACK IN THERE COMMANDER', () => {
    expect(playerOne.playerGameboard.checkGameStatus()).toBe('it aint over yet')
})

test('playerOne battleship is hit', () => {
    expect(playerOne.playerGameboard.receiveAttack(61)).toBe('hit')
    expect(playerOne.playerGameboard.receiveAttack(62)).toBe('hit')
    expect(playerOne.playerGameboard.receiveAttack(63)).toBe('hit')
});

test('location in playerOne gameboard is empty, MISS', () => {
    expect(playerOne.playerGameboard.receiveAttack(15)).toBe('lol you missed')
});

test('playerOne battleship2 is hit', () => {
    expect(playerOne.playerGameboard.receiveAttack(16)).toBe('hit')
    expect(playerOne.playerGameboard.receiveAttack(17)).toBe('hit')
    expect(playerOne.playerGameboard.receiveAttack(18)).toBe('hit')
});

test('playerOne ships are all ded, game over', () => {
    expect(playerOne.playerGameboard.checkGameStatus()).toBe('GAME OVER')
})