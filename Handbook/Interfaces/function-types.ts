/**
 * ----------------------------------------
 * Functions Types in TypeScript Interface
 * ----------------------------------------
 * Interfaces are capable of describing the wide range of shapes that JavaScript objects can take. 
 * In addition to describing an object with properties, interfaces are also capable of describing 
 * function types.
 * 
 * To describe a function type with an interface, we give the interface a call signature. This is 
 * like a function declaration with only the parameter list and return type given. Each parameter 
 * in the parameter list requires both name and type.
 */
interface SearchFunc {
    (source: string, subString: string): boolean;
}

/**
 * Once defined, we can use this function type interface like we would other interfaces. Here, we 
 * show how you can create a variable of a function type and assign it a function value of the same 
 * type.
 */
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

/**
 * For function types to correctly type-check, the names of the parameters do not need to match. 
 * We could have, for example, written the above example like this:
 */
let mySearch1: SearchFunc;
mySearch1 = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
}

/**
 * Function parameters are checked one at a time, with the type in each corresponding parameter 
 * position checked against each other. If you do not want to specify types at all, TypeScript’s 
 * contextual typing can infer the argument types since the function value is assigned directly to 
 * a variable of type SearchFunc. Here, also, the return type of our function expression is implied 
 * by the values it returns (here false and true). Had the function expression returned numbers 
 * or strings, the type-checker would have warned us that return type doesn’t match the return type 
 * described in the SearchFunc interface.
 */
let mySearch2: SearchFunc;
mySearch2 = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
