/**
 * -------------------------------------
 * Class Types in TypeScript Interfaces
 * -------------------------------------
 * 
 * --------------------------
 * Implementing an interface
 * --------------------------
 * One of the most common uses of interfaces in languages like C# and Java, that of explicitly 
 * enforcing that a class meets a particular contract, is also possible in TypeScript.
 */
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}

/**
 * You can also describe methods in an interface that are implemented in the class, as we do 
 * with setTime in the below example:
 */
interface ClockInterface1 {
    currentTime: Date;
    setTime(d: Date);
}

class Clock1 implements ClockInterface1 {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}

/**
 * Interfaces describe the public side of the class, rather than both the public and private side. 
 * This prohibits you from using them to check that a class also has particular types for the 
 * private side of the class instance.
 * 
 * ------------------------------------------------------------
 * Difference between the static and instance sides of classes
 * ------------------------------------------------------------
 * When working with classes and interfaces, it helps to keep in mind that a class has two types: 
 * the type of the static side and the type of the instance side. You may notice that if you create 
 * an interface with a construct signature and try to create a class that implements this interface 
 * you get an error:
 * 
 *      interface ClockConstructor {
 *          new (hour: number, minute: number);
 *      }
 * 
 *      class Clock implements ClockConstructor {
 *          currentTime: Date;
 *          constructor(h: number, m: number);
 *      }
 * 
 * This is because when a class implements an interface, only the instance side of the class is 
 * checked. Since the constructor sits in the static side, it is not included in this check.
 * 
 * Instead, you would need to work with the static side of the class directly. In this example, 
 * we define two interfaces, ClockConstructor for the constructor and ClockInterface for the 
 * instance methods. Then for convenience we define a constructor function createClock that 
 * creates instances of the type that is passed to it.
 */
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface2;
}
interface ClockInterface2 {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface2 {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface2 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface2 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tick");
    }
}

let digital = createClock(DigitalClock, 12, 7);
let analog = createClock(AnalogClock, 7, 32);

/**
 * Because createClock’s first parameter is of type ClockConstructor, in 
 * createClock(AnalogClock, 7, 32), it checks that AnalogClock has the correct constructor signature.
 * 
 * ---------------------
 * Extending Interfaces
 * ---------------------
 * Like classes, interfaces can extend each other. This allows you to copy the members of one 
 * interface into another, which gives you more flexibility in how you separate your interfaces 
 * into reusable components.
 */
interface Shape {
    color: string;
}
interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

/**
 * An interface can extend multiple interfaces, creating a combination of all of the interfaces.
 */
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square1 = <Square>{};
square1.color = "red";
square1.sideLength = 10;
square1.penWidth = 5.0;
