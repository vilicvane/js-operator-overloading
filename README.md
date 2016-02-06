# JavaScript Operator Overloading

This is a demo show case how can we make use of `valudOf` to implement operator overloading in JavaScript.

## vector.js

```js
Vector.createVector('a', 1, 2);
Vector.createVector('b', 4, 6);
Vector.createVector('c');

c = a + b;
c = a - b;
c = a * 2;
c = b / 4;
```

```sh
node vector.js
```

The implementation in `vector.js` accepts two vectors with operators `+` and `-`; or one vector and a scalar with operator `*` and `/`.

## super-vector.js

```js
Vector.createVector('a', 1, 2);
Vector.createVector('b', 4, 6);
Vector.createVector('c', 2, 1);
Vector.createVector('d');

d = a + b - c;
d = -a - b + c;
```

```sh
node super-vector.js
```

The implementation in `super-vector.js` accepts multiple vectors with operators `+` and `-`.

## More Implementations

Instead of using setters, it is also possible to use other way to retrieve the calulation results that help distinguish what operators are used.
For example, you can implement something like this:

```js
let a = new Vector(1, 2);
let b = new Vector(2, 3);

let c = v(a + b);
let d = v(a * 2);

let e = sv(a + b - c - d);
```
