/**
 * ----------------------------------
 * Inheritance in TypeScript Classes
 * ----------------------------------
 * In TypeScript, we can use common object-oriented patterns. One of the most fundamental patterns 
 * in class-based programming is being able to extend existing classes to create new ones using 
 * inheritance.
 */
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${ distanceInMeters }m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

/**
 * This example shows the most basic inheritance feature: classes inherit properties and methods 
 * from base classes. Here, Dog is a derived class that derives from the Animal base class using 
 * the extends keyword. Derived classes are often called subclasses, and base classes are often 
 * called superclasses.
 * 
 * Because Dog extends the functionality from Animal, we were able to create an instance of Dog 
 * that could both bark() and move().
 */
class Animal1 {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${ this.name } moved ${ distanceInMeters }m.`);
    }
}

class Snake extends Animal1 {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering....");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal1 {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

/**
 * This example covers a few other features we didn’t previously mention. Again, we see the extends 
 * keywords used to create two new subclasses of Animal: Horse and Snake.
 * 
 * One difference from the prior example is that each derived class that contains a constructor 
 * function must call super() which will execute the constructor of the base class. What’s more, 
 * before we ever access a property on this in a constructor body, we have to call super(). This is 
 * an important rule that TypeScript will enforce.
 * 
 * The example also shows how to override methods in the base class with methods that are 
 * specialized for the subclass. Here both Snake and Horse create a move method that overrides the 
 * move from Animal, giving it functionality specific to each class. Note that even though tom is 
 * declared as an Animal, since its value is a Horse, calling tom.move(34) will call the 
 * overriding method in Horse:
 * 
 *      Slithering...
 *      Sammy the Python moved 5m.
 *      Galloping...
 *      Tommy the Palomino moved 34m.
 */