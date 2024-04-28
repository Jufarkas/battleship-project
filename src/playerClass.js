import { Gameboard } from "./gameboardClass";
import { Ship } from "./shipClass";


export class Player {
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