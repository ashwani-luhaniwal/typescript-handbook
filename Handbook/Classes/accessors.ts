/**
 * --------------------------------
 * Accessors in TypeScript Classes
 * --------------------------------
 * TypeScript supports getters/setters as a way of intercepting accesses to a member of an object. 
 * This gives you a way of having finer-grained control over how a member is accessed on each object.
 * 
 * Let’s convert a simple class to use get and set.
 */
class Employee5 {
    fullName: string;
}

let employee5 = new Employee5();
employee5.fullName = "Ashwani Luhaniwal";
if (employee5.fullName) {
    console.log(employee5.fullName);
}

/**
 * While allowing people to randomly set fullName directly is pretty handy, this might get us in 
 * trouble if people can change names on a whim.
 * 
 * In this version, we check to make sure the user has a secret passcode available before we allow 
 * them to modify the employee. We do this by replacing the direct access to fullName with a set that 
 * will check the passcode. We add a corresponding get to allow the previous example to continue to 
 * work seamlessly.
 */
let passcode = "secret passcode";

class Employee6 {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee6 = new Employee6();
employee6.fullName = "Ashwani Luhaniwal";
if (employee6.fullName) {
    console.log(employee6.fullName);
}

/**
 * To prove to ourselves that our accessor is now checking the passcode, we can modify the passcode 
 * and see that when it doesn’t match we instead get the message warning us we don’t have access 
 * to update the employee.
 * 
 * A couple of things to note about accessors:
 * 
 * First, accessors require you to set the compiler to output ECMAScript 5 or higher. Downlevelling 
 * to ECMAScript 3 is not supported. Second, accessors with a get and no set are automatically 
 * inferred to be readonly. This is helpful when generating a .d.ts file from your code, because 
 * users of your property can see that they can’t change it.
 */