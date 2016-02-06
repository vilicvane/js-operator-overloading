'use strict';

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    valueOf() {
        if (Vector._vectors.length >= 2) {
            throw new Error('Execeeds limit');
        }
        
        return Vector._vectors.push(this);
    }
    
    toString() {
        return JSON.stringify({ x: this.x, y: this.y });
    }
    
    static _setter(value) {
        var vectors = Vector._vectors;
        
        if (vectors.length === 1) {
            var first = vectors[0];
            
            this.x = first.x * value;
            this.y = first.y * value;
        } else if (vectors.length === 2) {
            var first = vectors[0];
            var second = vectors[1];
            
            switch (value) {
                case 3:
                    this.x = first.x + second.x;
                    this.y = first.y + second.y;
                    break;
                case -1:
                    this.x = first.x - second.x;
                    this.y = first.y - second.y;
                    break;
            }
        }
        
        vectors.length = 0;
    }
    
    static createVector(name, x, y) {
        var vector = new Vector(x, y);
        
        Object.defineProperty(global, name, {
            get: () => vector,
            set: Vector._setter.bind(vector)
        });
        
        return vector;
    }
}

Vector._vectors = [];

Vector.createVector('a', 1, 2);
Vector.createVector('b', 4, 6);
Vector.createVector('c');

c = a + b;
console.log(c.toString());

c = a - b;
console.log(c.toString());

c = a * 2;
console.log(c.toString());

c = b / 4;
console.log(c.toString());
