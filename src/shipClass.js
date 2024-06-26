export class Ship {
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