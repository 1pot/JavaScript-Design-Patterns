/*
The Proxy Pattern in JavaScript is a structural design pattern that provides a surrogate or placeholder object, 
which controls access to another object, known as the target object. This pattern allows you to add an extra layer of control over access to the target object, 
enabling you to intercept and customize operations such as property access, property assignment, function invocation, and more.
*/

//Proxy Pattern Explanation:

// In JavaScript, the Proxy object is used to create a proxy for another object, giving you the ability to intercept and customize fundamental operations for that object. 
// You can define custom behavior for various operations by providing handler functions for different traps.

// Practical Example: Logging Proxy

// Let's say you want to create a proxy object for a target object, 
// and you want to log every property access and function invocation on the target object:
// Target object


const targetObject = {
  name: 'Example',
  value: 42,
  getValue() {
    return this.value;
  }
};

// Proxy object with logging behavior
const loggingProxy = new Proxy(targetObject, {
  get(target, property, receiver) {
    console.log(`Accessing property '${property}'`);
    return Reflect.get(target, property, receiver);
  },
  apply(target, thisArg, argumentsList) {
    console.log(`Calling function '${target.name}'`);
    return Reflect.apply(target, thisArg, argumentsList);
  }
});

// Usage
console.log(loggingProxy.name); // Output: Accessing property 'name' \n Example
console.log(loggingProxy.value); // Output: Accessing property 'value' \n 42
console.log(loggingProxy.getValue()); // Output: Calling function 'getValue' \n 42
