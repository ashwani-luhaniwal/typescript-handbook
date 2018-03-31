/**
 * --------------------------
 * Interfaces in TypeScript
 * --------------------------
 * One of TypeScript’s core principles is that type-checking focuses on the shape that values 
 * have. This is sometimes called “duck typing” or “structural subtyping”. In TypeScript, interfaces 
 * fill the role of naming these types, and are a powerful way of defining contracts within your 
 * code as well as contracts with code outside of your project.
 */
function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

/**
 * The type-checker checks the call to printLabel. The printLabel function has a single parameter 
 * that requires that the object passed in has a property called label of type string. Notice that 
 * our object actually has more properties than this, but the compiler only checks that at least 
 * the ones required are present and match the types required. There are some cases where TypeScript 
 * isn’t as lenient, which we’ll cover in a bit.
 * 
 * We can write the same example again, this time using an interface to describe the requirement 
 * of having the label property that is a string:
 */
interface LabelledValue {
    label: string;
}

function printLabel1(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj1 = { size: 10, label: "Size 10 Object" };
printLabel1(myObj1);

/**
 * The interface LabelledValue is a name we can now use to describe the requirement in the previous 
 * example. It still represents having a single property called label that is of type string. 
 * Notice we didn’t have to explicitly say that the object we pass to printLabel implements this 
 * interface like we might have to in other languages. Here, it’s only the shape that matters. If 
 * the object we pass to the function meets the requirements listed, then it’s allowed.
 * 
 * It’s worth pointing out that the type-checker does not require that these properties come in any 
 * sort of order, only that the properties the interface requires are present and have the required 
 * type.
 * 
 * --------------------
 * Optional Properties
 * --------------------
 * Not all properties of an interface may be required. Some exist under certain conditions or may not 
 * be there at all. These optional properties are popular when creating patterns like “option bags” 
 * where you pass an object to a function that only has a couple of properties filled in.
 * 
 * Here’s an example of this pattern:
 */
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});

/**
 * Interfaces with optional properties are written similar to other interfaces, with each optional 
 * property denoted by a ? at the end of the property name in the declaration.
 * 
 * The advantage of optional properties is that you can describe these possibly available properties 
 * while still also preventing use of properties that are not part of the interface.
 * 
 * --------------------
 * Readonly Properties
 * --------------------
 * Some properties should only be modifiable when an object is first created. You can specify this 
 * by putting readonly before the name of the property:
 */
interface Point {
    readonly x: number;
    readonly y: number;
}

/**
 * You can construct a Point by assigning an object literal. After the assignment, x and y can’t be 
 * changed.
 */
let p1: Point = { x: 10, y: 20 };
// p1.x = 5;   // Error!

/**
 * TypeScript comes with a ReadonlyArray<T> type that is the same as Array<T> with all mutating 
 * methods removed, so you can make sure you don’t change your arrays after creation:
 */
let d: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = d;
// ro[0] = 12; // Error!
// ro.push(5); // Error!
// ro.length = 100;    // Error!
// d = ro; // Error!

/**
 * On the last line of the snippet you can see that even assigning the entire ReadonlyArray back to 
 * a normal array is illegal. You can still override it with a type assertion, though:
 */
d = ro as number[];

/**
 * ------------------
 * readonly vs const
 * ------------------
 * The easiest way to remember whether to use readonly or const is to ask whether you’re using it 
 * on a variable or a property. Variables use const whereas properties use readonly.
 * 
 * -----------------------
 * Excess Property Checks
 * -----------------------
 * In our first example using interfaces, TypeScript lets us pass { size: number; label: string; } 
 * to something that only expected a { label: string; }. We also just learned about optional 
 * properties, and how they’re useful when describing so-called “option bags”.
 * 
 * However, combining the two naively would let you to shoot yourself in the foot the same way you 
 * might in JavaScript. For example, taking our last example using createSquare:
 * 
 *      interface SquareConfig {
 *          color?: string;
 *          width?: number;
 *      }
 * 
 *      function createSquare(config: SquareConfig): { color: string; area: number } {
 *          // ...
 *      }
 * 
 *      // error: 'colour' not expected in type 'SquareConfig'
 *      let mySquare = createSquare({ colour: "red", width: 100 });
 * 
 * Notice the given argument to createSquare is spelled colour instead of color. In plain JavaScript, 
 * this sort of thing fails silently.
 * 
 * You could argue that this program is correctly typed, since the width properties are compatible, 
 * there’s no color property present, and the extra colour property is insignificant.
 * 
 * However, TypeScript takes the stance that there’s probably a bug in this code. Object literals 
 * get special treatment and undergo excess property checking when assigning them to other variables, 
 * or passing them as arguments. If an object literal has any properties that the “target type” 
 * doesn’t have, you’ll get an error.
 * 
 * Getting around these checks is actually really simple. The easiest method is to just use a 
 * type assertion:
 * 
 *      let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
 * 
 * However, a better approach might be to add a string index signature if you’re sure that the 
 * object can have some extra properties that are used in some special way. If SquareConfig can 
 * have color and width properties with the above types, but could also have any number of other 
 * properties, then we could define it like so:
 */
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

/**
 * here we’re saying a SquareConfig can have any number of properties, and as long as they aren’t 
 * color or width, their types don’t matter.
 * 
 * One final way to get around these checks, which might be a bit surprising, is to assign the 
 * object to another variable: Since squareOptions won’t undergo excess property checks, the compiler 
 * won’t give you an error.
 * 
 *      let squareOptions = { colour: "red", width: 100 };
 *      let mySquare = createSquare(squareOptions);
 * 
 * Keep in mind that for simple code like above, you probably shouldn’t be trying to “get around” 
 * these checks. For more complex object literals that have methods and hold state, you might need 
 * to keep these techniques in mind, but a majority of excess property errors are actually bugs. 
 * That means if you’re running into excess property checking problems for something like option 
 * bags, you might need to revise some of your type declarations. In this instance, if it’s okay 
 * to pass an object with both a color or colour property to createSquare, you should fix up the 
 * definition of SquareConfig to reflect that.
 * 
 * -----------------------------
 * Interfaces Extending Classes
 * -----------------------------
 * When an interface type extends a class type it inherits the members of the class but not their 
 * implementations. It is as if the interface had declared all of the members of the class without 
 * providing an implementation. Interfaces inherit even the private and protected members of a 
 * base class. This means that when you create an interface that extends a class with private or 
 * protected members, that interface type can only be implemented by that class or a subclass of it.
 * 
 * This is useful when you have a large inheritance hierarchy, but want to specify that your code 
 * works with only subclasses that have certain properties. The subclasses don’t have to be 
 * related besides inheriting from the base class.
 */
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// Error: Property 'state' is missing in type 'Image'
/*class Image implements SelectableControl {
    select() { }
}*/

class Location1 {

}

/**
 * In the above example, SelectableControl contains all of the members of Control, including the 
 * private state property. Since state is a private member it is only possible for descendants 
 * of Control to implement SelectableControl. This is because only descendants of Control will 
 * have a state private member that originates in the same declaration, which is a requirement 
 * for private members to be compatible.
 * 
 * Within the Control class it is possible to access the state private member through an instance 
 * of SelectableControl. Effectively, a SelectableControl acts like a Control that is known to have 
 * a select method. The Button and TextBox classes are subtypes of SelectableControl (because they 
 * both inherit from Control and have a select method), but the Image and Location classes are not.
 */