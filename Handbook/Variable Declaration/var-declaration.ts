/**
 * -----------------
 * var declarations
 * -----------------
 * Declaring a variable in JavaScript has always traditionally been done with the var keyword.
 */
var a = 10;

/**
 * As you might’ve figured out, we just declared a variable named a with the value 10.
 * We can also declare a variable inside of a function:
 */
function f() {
    var message = "Hello, world!";
    return message;
}

/**
 * and we can also access those same variables within other functions:
 */
function fu() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    }
}
var g = fu();
g();    // retuns '11'

/**
 * In this above example, g captured the variable a declared in f. At any point that g gets 
 * called, the value of a will be tied to the value of a in f. Even if g is called once f is done 
 * running, it will be able to access and modify a.
 */
function fun() {
    var a = 1;

    a = 2;
    var b = g();
    a = 3;

    return b;

    function g() {
        return a;
    }
}
fun();  // returns '2'

/**
 * --------------
 * Scoping rules
 * --------------
 * var declarations have some odd scoping rules for those used to other languages. Take the 
 * following example:
 */
function foo(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}
foo(true);  // returns '10'
foo(false); // returns 'undefined'

/**
 * Some readers might do a double-take at this example. The variable x was declared within the 
 * if block, and yet we were able to access it from outside that block. That’s because var 
 * declarations are accessible anywhere within their containing function, module, namespace, or 
 * global scope - all which we’ll go over later on - regardless of the containing block. Some 
 * people call this var-scoping or function-scoping. Parameters are also function scoped.
 * 
 * These scoping rules can cause several types of mistakes. One problem they exacerbate is the 
 * fact that it is not an error to declare the same variable multiple times:
 */
function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}

/**
 * Maybe it was easy to spot out for some, but the inner for-loop will accidentally overwrite 
 * the variable i because i refers to the same function-scoped variable. As experienced developers 
 * know by now, similar sorts of bugs slip through code reviews and can be an endless source of 
 * frustration.
 */