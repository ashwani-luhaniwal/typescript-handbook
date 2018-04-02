/**
 * ----------------------
 * Classes in TypeScript
 * ----------------------
 * JavaScript uses functions and prototype-based inheritance to build up reusable components, 
 * but this may feel a bit awkward to programmers more comfortable with an object-oriented 
 * approach, where classes inherit functionality and objects are built from these classes. 
 * Starting with ECMAScript 2015, also known as ECMAScript 6, JavaScript programmers will be 
 * able to build their applications using this object-oriented class-based approach. In 
 * TypeScript, we allow developers to use these techniques now, and compile them down to 
 * JavaScript that works across all major browsers and platforms, without having to wait for 
 * the next version of JavaScript.
 * 
 * --------
 * Classes
 * --------
 */
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");

/**
 * The syntax should look familiar if you’ve used C# or Java before. We declare a new class 
 * Greeter. This class has three members: a property called greeting, a constructor, and a method 
 * greet.
 * 
 * You’ll notice that in the class when we refer to one of the members of the class we prepend 
 * this.. This denotes that it’s a member access.
 * 
 * In the last line we construct an instance of the Greeter class using new. This calls into the 
 * constructor we defined earlier, creating a new object with the Greeter shape, and running the 
 * constructor to initialize it.
 * 
 * --------------------
 * Advanced Techniques
 * --------------------
 * 
 * ----------------------
 * Constructor functions
 * ----------------------
 * When you declare a class in TypeScript, you are actually creating multiple declarations at the 
 * same time. The first is the type of the instance of the class.
 */
class Greeter1 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter1: Greeter1;
greeter1 = new Greeter1("world");
console.log(greeter1.greet());

/**
 * Here, when we say let greeter: Greeter, we’re using Greeter as the type of instances of the 
 * class Greeter. This is almost second nature to programmers from other object-oriented languages.
 * 
 * We’re also creating another value that we call the constructor function. This is the function 
 * that is called when we new up instances of the class. To see what this looks like in practice, 
 * let’s take a look at the JavaScript created by the above example:
 */
let Greeter2 = (function() {
    function Greeter2(message) {
        this.greeting = message;
    }
    Greeter2.prototype.greet = function() {
        return "Hello, " + this.greeting;
    };
    return Greeter2;
})();

let greeter2;
greeter2 = new Greeter2("world");
console.log(greeter2.greet());

/**
 * Here, let Greeter is going to be assigned the constructor function. When we call new and run 
 * this function, we get an instance of the class. The constructor function also contains all of 
 * the static members of the class. Another way to think of each class is that there is an instance 
 * side and a static side.
 * 
 *      class Greeter {
 *          static standardGreeting = "Hello, there";
 *          greeting: string;
 *          greet() {
 *              if (this.greeting) {
 *                  return "Hello, " + this.greeting;
 *              }
 *              else {
 *                  return Greeter.standardGreeting;
 *              }
 *          }
 *      }
 * 
 *      let greeter1: Greeter;
 *      greeter1 = new Greeter();
 *      console.log(greeter1.greet());
 * 
 *      let greeterMaker: typeof Greeter = Greeter;
 *      greeterMaker.standardGreeting = "Hey there!";
 * 
 *      let greeter2: Greeter = new greeterMaker();
 *      console.log(greeter2.greet());
 * 
 * In this example, greeter1 works similarly to before. We instantiate the Greeter class, and use 
 * this object. This we have seen before.
 * 
 * Next, we then use the class directly. Here we create a new variable called greeterMaker. This 
 * variable will hold the class itself, or said another way its constructor function. Here we use 
 * typeof Greeter, that is “give me the type of the Greeter class itself” rather than the instance 
 * type. Or, more precisely, “give me the type of the symbol called Greeter,” which is the type of 
 * the constructor function. This type will contain all of the static members of Greeter along with 
 * the constructor that creates instances of the Greeter class. We show this by using new on 
 * greeterMaker, creating new instances of Greeter and invoking them as before.
 * 
 * ------------------------------
 * Using a class as an interface
 * ------------------------------
 * As we said in the previous section, a class declaration creates two things: a type representing 
 * instances of the class and a constructor function. Because classes create types, you can use 
 * them in the same places you would be able to use interfaces.
 */
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3};