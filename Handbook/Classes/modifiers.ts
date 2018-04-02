/**
 * ------------------------------------------------------
 * Public, Private and Protected Modifiers in TypeScript
 * ------------------------------------------------------
 * 
 * ------------------
 * Public by Default
 * ------------------
 * In our examples, we’ve been able to freely access the members that we declared throughout our 
 * programs. If you’re familiar with classes in other languages, you may have noticed in the above 
 * examples we haven’t had to use the word public to accomplish this; for instance, C# requires 
 * that each member be explicitly labeled public to be visible. In TypeScript, each member is public 
 * by default.
 * 
 * You may still mark a member public explicitly. We could have written the Animal class from the 
 * previous section in the following way:
 */
class Animal2 {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${ this.name } moved ${ distanceInMeters }m.`);
    }
}

/**
 * ----------------------
 * Understanding private
 * ----------------------
 * When a member is marked private, it cannot be accessed from outside of its containing class.
 */
class Animal3 {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

// new Animal3("Cat").name;    // Error: 'name' is private

/**
 * TypeScript is a structural type system. When we compare two different types, regardless of where 
 * they came from, if the types of all members are compatible, then we say the types themselves 
 * are compatible.
 * 
 * However, when comparing types that have private and protected members, we treat these types 
 * differently. For two types to be considered compatible, if one of them has a private member, 
 * then the other must have a private member that originated in the same declaration. The same 
 * applies to protected members.
 */
class Animal4 {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal4 {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal4("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
// animal = employee;  // Error: 'Animal' and 'Employee' are not compatible

/**
 * In this example, we have an Animal and a Rhino, with Rhino being a subclass of Animal. We also 
 * have a new class Employee that looks identical to Animal in terms of shape. We create some 
 * instances of these classes and then try to assign them to each other to see what will happen. 
 * Because Animal and Rhino share the private side of their shape from the same declaration of 
 * private name: string in Animal, they are compatible. However, this is not the case for Employee. 
 * When we try to assign from an Employee to Animal we get an error that these types are not 
 * compatible. Even though Employee also has a private member called name, it’s not the one we 
 * declared in Animal.
 * 
 * ------------------------
 * Understanding protected
 * ------------------------
 * The protected modifier acts much like the private modifier with the exception that members 
 * declared protected can also be accessed within deriving classes.
 */
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee1 extends Person {
    private department: string;
    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }
    public getElevatorPitch() {
        return `Hello, my name is ${ this.name } and I work in ${ this.department }.`;
    }
}

let howard = new Employee1("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name);   // error

/**
 * Notice that while we can’t use name from outside of Person, we can still use it from within 
 * an instance method of Employee because Employee derives from Person.
 * 
 * A constructor may also be marked protected. This means that the class cannot be instantiated 
 * outside of its containing class, but can be extended.
 */
class Person1 {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee2 can extend Person
class Employee2 extends Person1 {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${ this.name } and I work in ${ this.department }.`;
    }
}

let howard1 = new Employee2("Howard", "Sales");
// let john = new Person1("John"); // Error: The 'Person' constructor is protected

/**
 * ------------------
 * Readonly modifier
 * ------------------
 * You can make properties readonly by using the readonly keyword. Readonly properties must be 
 * initialized at their declaration or in the constructor.
 */
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}

let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // error! name is readonly

/**
 * ---------------------
 * Parameter properties
 * ---------------------
 * In our last example, we had to declare a readonly member name and a constructor parameter 
 * theName in the Octopus class, and we then immediately set name to theName. This turns out to be 
 * a very common practice. Parameter properties let you create and initialize a member in one place. 
 * Here’s a further revision of the previous Octopus class using a parameter property:
 */
class Octopus1 {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {

    }
}

/**
 * Notice how we dropped theName altogether and just use the shortened readonly name: string 
 * parameter on the constructor to create and initialize the name member. We’ve consolidated the 
 * declarations and assignment into one location.
 * 
 * Parameter properties are declared by prefixing a constructor parameter with an accessibility 
 * modifier or readonly, or both. Using private for a parameter property declares and initializes 
 * a private member; likewise, the same is done for public, protected, and readonly.
 */