'use strict';

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    valueOf() {
        var vectors = Vector._vectors;
        var maxCount = 32;
        
        if (vectors.length >= maxCount) {
            throw new Error('Execeeds limit');
        }
        
        var valueStr;
        
        if (vectors.length) {
            valueStr = '1' + Array(vectors.length).join('0');
        } else {
            valueStr = Array(maxCount + 1).join('1');
        }
        
        vectors.push(this);
        
        return parseInt(valueStr, 3);
    }
    
    toString() {
        return JSON.stringify({ x: this.x, y: this.y });
    }
    
    static _setter(value) {
        var valueStr = value.toString(3);
        var factor;
        
        if (valueStr[0] === '-') {
            valueStr = valueStr.substr(1);
            factor = -1;
        } else {
            factor = 1;
        }
        
        var vectors = Vector._vectors;
        var first = vectors.shift();
        
        this.x = first.x * factor;
        this.y = first.y * factor;
        
        loop:
        for (var i = valueStr.length - 1; i >= 0; i--) {
            var digit = valueStr[i];
            var vector = vectors.shift();
            
            switch (digit) {
                case '0':
                    // subtract
                    this.x -= vector.x * factor;
                    this.y -= vector.y * factor;
                    break;
                case '2':
                    // add
                    this.x += vector.x * factor;
                    this.y += vector.y * factor;
                    break;
                case '1':
                    break loop;
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
Vector.createVector('c', 2, 1);
Vector.createVector('d');

d = a + b - c;
console.log(d.toString());

d = -a - b + c;
console.log(d.toString());
