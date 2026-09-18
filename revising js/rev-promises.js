// Objects in js is a non primitive data type used to store collections of key value pairs
// Arrays are specialized obejects under the hood in js used to store multipel values in a single variable indexed by a number starting from 0;

// Functional arguments is just passing a function as an argument to another function
function sum(a, b) {
    return a+b;
}
function doMath(a, b, fn) {
    return fn(a,b);
}
doMath(1, 2, sum)

// Classes in js are a way to define a blueprint for creating obkects
// Constructors are called whenver a Class is created with the new keyword, it accepts aruguments and assigns them as properties of a that brand new obejct
// Methods - Methods are functions that are defined inside the class, that can be used by all instances of the class.


// This keyword acts differently depending on the context
// inside a constructor class it refers to the brand new object that is being created
// If used in a regular function it falls back to the global scope and refers to the window object
// Inside an arrow function it will inherit this from the surrounding lexical scope
// Why do we use it? Instead of hardcoding a specific object's name inside a function it lets us dynamcally adapt to the object name that is currently invoking it.
class Rectangle {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }
    area() {
        const area = this.height * this.width;
        return area;
    }
}

// Inheritance in calsses
// We use inheritance whenevr we need to implement DRY rule.
class Shape {
    // something
}
class Rectangle extends Shape {
    // soemthing
}

// A promise in js is an object that represents the eventual completion or failure of an async operation and its resulting value