/**
 * -------------
 * let vs const
 * -------------
 * Given that we have two types of declarations with similar scoping semantics, it’s natural to 
 * find ourselves asking which one to use. Like most broad questions, the answer is: it depends.
 * 
 * Applying the principle of least privilege, all declarations other than those you plan to 
 * modify should use const. The rationale is that if a variable didn’t need to get written to, others 
 * working on the same codebase shouldn’t automatically be able to write to the object, and will 
 * need to consider whether they really need to reassign to the variable. Using const also makes 
 * code more predictable when reasoning about flow of data.
 * 
 * --------------
 * Destructuring
 * --------------
 * 
 * --------------------
 * Array destructuring
 * --------------------
 * The simplest form of destructuring is array destructuring assignment:
 */
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second);    // outputs 2

/**
 * This creates two new variables named first and second. This is equivalent to using indexing, 
 * but is much more convenient:
 * 
 *      first = input[0];
 *      second = input[1];
 * 
 * Destructuring works with already-declared variables as well:
 * 
 *      // swap variables
 *      [first, second] = [second, first];
 * 
 * And with parameters to a function:
 */
function funct([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
funct([1, 2]);

/**
 * You can create a variable for the remaining items in a list using the syntax ...:
 */
let [frst, ...rest] = [1, 2, 3, 4];
console.log(frst);  // outputs 1
console.log(rest);  // outputs [2, 3, 4]

/**
 * Of course, since this is JavaScript, you can just ignore trailing elements you don’t care about:
 * 
 *      let [first] = [1, 2, 3, 4];
 *      console.log(first);    // outputs 1
 * 
 * Or other elements:
 * 
 *      let [, second, , fourth] = [1, 2, 3, 4];
 * 
 * ---------------------
 * Object destructuring
 * ---------------------
 * You can also destructure objects:
 */
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;

/**
 * This creates new variables a and b from o.a and o.b. Notice that you can skip c if you 
 * don’t need it.
 * 
 * Like array destructuring, you can have assignment without declaration:
 * 
 *      ({ a, b } = { a: "baz", b: 101 });
 * 
 * Notice that we had to surround this statement with parentheses. JavaScript normally parses 
 * a { as the start of block.
 * 
 * You can create a variable for the remaining items in an object using the syntax ...:
 * 
 *      let { a, ...passthrough } = o;
 *      let total = passthrough.b + passthrough.c.length;
 * 
 * ------------------
 * Property renaming
 * ------------------
 * You can also give different names to properties:
 * 
 *      let { a: newName1, b: newName2 } = o;
 * 
 * Here the syntax starts to get confusing. You can read a: newName1 as “a as newName1”. The 
 * direction is left-to-right, as if you had written:
 * 
 *      let newName1 = o.a;
 *      let newName2 = o.b;
 * 
 * Confusingly, the colon here does not indicate the type. The type, if you specify it, still 
 * needs to be written after the entire destructuring:
 * 
 *      let { a, b }: { a: string, b: number } = o;
 * 
 * ---------------
 * Default values
 * ---------------
 * Default values let you specify a default value in case a property is undefined:
 */
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}

/**
 * keepWholeObject now has a variable for wholeObject as well as the properties a and b, 
 * even if b is undefined.
 * 
 * ----------------------
 * Function declarations
 * ----------------------
 * Destructuring also works in function declarations. For simple cases this is straightforward:
 */
type C = { a: string, b?: number }
function fooBar({ a, b }: C): void {
    // ....
}

/**
 * But specifying defaults is more common for parameters, and getting defaults right with 
 * destructuring can be tricky. First of all, you need to remember to put the pattern before 
 * the default value.
 */
function fb({a, b} = {a: "", b: 0}): void {
    // ...
}
fb();   // ok, default to {a: "", b: 0}

/**
 * Then, you need to remember to give a default for optional properties on the destructured 
 * property instead of the main initializer. Remember that C was defined with b optional:
 */
function fct({ a, b = 0 } = { a: "" }): void {
    // ...
}
fct({ a: "yes" });  // ok, default b = 0
fct();  // ok, default to { a: ""}, which then defaults b = 0
// fct({});    // error, 'a' is required if you supply an argument

/**
 * Use destructuring with care. As the previous example demonstrates, anything but the simplest 
 * destructuring expression is confusing. This is especially true with deeply nested destructuring, 
 * which gets really hard to understand even without piling on renaming, default values, and 
 * type annotations. Try to keep destructuring expressions small and simple. You can always write 
 * the assignments that destructuring would generate yourself.
 * 
 * -------
 * Spread
 * -------
 * The spread operator is the opposite of destructuring. It allows you to spread an array into 
 * another array, or an object into another object. For example:
 */
let f = [1, 2];
let s = [3, 4];
let bothPlus = [0, ...f, ...s, 5];

/**
 * This gives bothPlus the value [0, 1, 2, 3, 4, 5]. Spreading creates a shallow copy of first 
 * and second. They are not changed by the spread.
 * 
 * You can also spread objects:
 */
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };

/**
 * Now search is { food: "rich", price: "$$", ambiance: "noisy" }. Object spreading is more 
 * complex than array spreading. Like array spreading, it proceeds from left-to-right, but the 
 * result is still an object. This means that properties that come later in the spread object 
 * overwrite properties that come earlier. So if we modify the previous example to spread at the end:
 * 
 *      let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
 *      let search = { food: "rich", ...defaults };
 * 
 * Then the food property in defaults overwrites food: "rich", which is not what we want in this case.
 * 
 * Object spread also has a couple of other surprising limits. First, it only includes an 
 * objects’ own, enumerable properties. Basically, that means you lose methods when you spread 
 * instances of an object:
 */
class C1 {
    p = 12;
    m() {

    }
}
let c1 = new C1();
let clone = { ...c1 };
clone.p;    // ok
// clone.m();  // error!

/**
 * Second, the Typescript compiler doesn’t allow spreads of type parameters from generic 
 * functions. That feature is expected in future versions of the language.
 */