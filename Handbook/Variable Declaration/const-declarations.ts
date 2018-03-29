/**
 * -------------------
 * const declarations
 * -------------------
 * const declarations are another way of declaring variables.
 */
const numLivesForCat = 9;

/**
 * They are like let declarations but, as their name implies, their value cannot be changed once 
 * they are bound. In other words, they have the same scoping rules as let, but you can’t re-assign 
 * to them.
 * 
 * This should not be confused with the idea that the values they refer to are immutable.
 */
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat
}

// Error
/*kitty = {
    name: "Ashu",
    numLives: numLivesForCat
};*/

// all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;

/**
 * Unless you take specific measures to avoid it, the internal state of a const variable is 
 * still modifiable. Fortunately, TypeScript allows you to specify that members of an object are 
 * readonly. 
 */