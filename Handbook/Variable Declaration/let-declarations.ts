/**
 * -------------------------------
 * let declarations in TypeScript
 * -------------------------------
 * By now you’ve figured out that var has some problems, which is precisely why let statements 
 * were introduced. Apart from the keyword used, let statements are written the same way var 
 * statements are.
 */
let hello = "Hello!";

/**
 * --------------
 * Block-scoping
 * --------------
 * When a variable is declared using let, it uses what some call lexical-scoping or block-scoping. 
 * Unlike variables declared with var whose scopes leak out to their containing function, 
 * block-scoped variables are not visible outside of their nearest containing block or for-loop.
 */
function f1(input: boolean) {
    let a = 100;
    if (input) {
        // Still okay to reference 'a'
        let b = a + 1;
        return b;
    }

    // Error: 'b' doesn't exist here
    // return b;
}

/**
 * Here, we have two local variables a and b. a’s scope is limited to the body of f1 while b’s scope 
 * is limited to the containing if statement’s block.
 * 
 * Variables declared in a catch clause also have similar scoping rules.
 */
try {
    throw "oh no!";
}
catch(e) {
    console.log("Oh well.");
}

// Error: 'e' doen't exists here
// console.log(e);

/**
 * Another property of block-scoped variables is that they can’t be read or written to before 
 * they’re actually declared. While these variables are “present” throughout their scope, all points 
 * up until their declaration are part of their temporal dead zone. This is just a sophisticated 
 * way of saying you can’t access them before the let statement, and luckily TypeScript will let 
 * you know that.
 */
// c++; // illegal to use 'c' before it's declared.
let c;

/**
 * Something to note is that you can still capture a block-scoped variable before it’s declared. 
 * The only catch is that it’s illegal to call that function before the declaration. If targeting 
 * ES2015, a modern runtime will throw an error; however, right now TypeScript is permissive 
 * and won’t report this as an error.
 */
function foo1() {
    // okay to capture 'd'
    return d;
}

// illegal call 'foo1' before 'a' is declared runtimes should throw an error here
foo1();
let d;

/**
 * ------------------------------
 * Re-delcarations and Shadowing
 * ------------------------------
 * With var declarations, we mentioned that it didn’t matter how many times you declared your 
 * variables; you just got one.
 */
function f2(x) {
    var x;
    var x;

    if (true) {
        var x;
    }
}

/**
 * In the above example, all declarations of x actually refer to the same x, and this is perfectly 
 * valid. This often ends up being a source of bugs. Thankfully, let declarations are not as forgiving.
 */
let x1 = 10;
// let x1 = 20;    // error: can't re-declare 'x' in the same scope

/**
 * The variables don’t necessarily need to both be block-scoped for TypeScript to tell us that 
 * there’s a problem.
 * 
 *  function fu1(x3) {
 *      let x3 = 100;    // error: interferes with parameter declaration
 *  }
 * 
 *  function gu() {
 *      let x3 = 100;
 *      var x3 = 100;    // error: can't have both declarations of 'x'
 *  }
 * 
 * That’s not to say that block-scoped variable can never be declared with a function-scoped 
 * variable. The block-scoped variable just needs to be declared within a distinctly different 
 * block.
 */
function fun1(condition, y) {
    if (condition) {
        let y = 100;
        return y;
    }

    return y;
}

fun1(false, 0); // returns '0'
fun1(true, 0);  // returns '100'

/**
 * The act of introducing a new name in a more nested scope is called shadowing. It is a bit of a 
 * double-edged sword in that it can introduce certain bugs on its own in the event of accidental 
 * shadowing, while also preventing certain bugs. For instance, imagine we had written our earlier 
 * sumMatrix function using let variables.
 */
function sumMatrix1(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    return sum;
}

/**
 * This version of the loop will actually perform the summation correctly because the inner 
 * loop’s i shadows i from the outer loop.
 * 
 * Shadowing should usually be avoided in the interest of writing clearer code. While there are 
 * some scenarios where it may be fitting to take advantage of it, you should use your best 
 * judgement.
 * 
 * --------------------------------
 * Block-scoped variable capturing
 * --------------------------------
 * When we first touched on the idea of variable capturing with var declaration, we briefly went 
 * into how variables act once captured. To give a better intuition of this, each time a scope is 
 * run, it creates an “environment” of variables. That environment and its captured variables can 
 * exist even after everything within its scope has finished executing.
 */
function theCityThatAlwaysSleeps() {
    let getCity;

    if (true) {
        let city = "Seattle";
        getCity = function() {
            return city;
        }
    }
    return getCity();
}

/**
 * Because we’ve captured city from within its environment, we’re still able to access it despite 
 * the fact that the if block finished executing.
 * 
 * Recall that with our earlier setTimeout example, we ended up needing to use an IIFE to capture 
 * the state of a variable for every iteration of the for loop. In effect, what we were doing was 
 * creating a new variable environment for our captured variables. That was a bit of a pain, but 
 * luckily, you’ll never have to do that again in TypeScript.
 * 
 * let declarations have drastically different behavior when declared as part of a loop. Rather than 
 * just introducing a new environment to the loop itself, these declarations sort of create a new 
 * scope per iteration. Since this is what we were doing anyway with our IIFE, we can change our old 
 * setTimeout example to just use a let declaration.
 */
for (let i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}