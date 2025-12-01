//1. Using Object.create (Pure Prototypal Approach)

// 1. Define the Prototype Object (containing shared methods)
const CarPrototype = {
  // Shared Method: Exists only once in memory
  startEngine() {
    console.log(`${this.make} ${this.model}'s engine started.`);
  },
  
  // Shared Method
  getDescription() {
    return `${this.make} ${this.model} (${this.year})`;
  }
};


//In modern React/JavaScript development, the ES6 class syntax is generally preferred, 
//as it is syntactic sugar that elegantly handles the constructor and automatically places methods onto the class's .prototype, giving you the benefits of the Prototype Pattern with cleaner code.

// 2. The cloning function
function createCar(make, model, year) {
  // Create a new object and set its prototype to CarPrototype
  const car = Object.create(CarPrototype);
  // Assign unique (own) properties to the new instance
  car.make = make;
  car.model = model;
  car.year = year;
  return car;
}

// Usage
const civic = createCar('Honda', 'Civic', 2024);
const accord = createCar('Honda', 'Accord', 2023);

console.log(civic.getDescription()); // Honda Civic (2024)
console.log(civic.startEngine === accord.startEngine); // Output: true (They share the same method)



//2. Using ES6 Classes (Syntactic Sugar)
// 1. Define the Prototype using an ES6 Class
class Vehicle {
    constructor(make, model) {
        // These are unique (own) properties of the instance
        this.make = make;
        this.model = model;
    }

    // This method is placed on Vehicle.prototype (shared)
    honk() {
        console.log(`${this.make} ${this.model} says Beep!`);
    }

    // This method is placed on Vehicle.prototype (shared)
    // The cloning happens implicitly when using 'new'
    clone() {
        // Simple cloning method: creates a new instance and copies properties
        return new Vehicle(this.make, this.model);
    }
}

// 2. Define the Prototype Instance (The original)
const baseTruck = new Vehicle('Ford', 'F-150');

// 3. Clone the Prototype to create a new object (a simple Factory-like cloning)
const truck1 = baseTruck.clone();
truck1.color = 'Red';

const truck2 = baseTruck.clone();
truck2.color = 'Blue';

truck1.honk(); // Ford F-150 says Beep!
console.log(truck1.honk === truck2.honk); // Output: true (Methods are shared via prototype)


// 1. Define the Constructor
function Car(make, model) {
    // These are unique (own) properties created on each instance
    this.make = make;
    this.model = model;
}

// 3.Prototype chain
// 2. Attach the shared methods to the constructor's .prototype object
// This acts as the shared "Prototype" for all instances created by 'new Car()'
Car.prototype.startEngine = function() {
    console.log(`${this.make} ${this.model}'s engine started.`);
};

Car.prototype.isPrototypeOf = function(obj) {
    return this.make === obj.make;
};

// 3. Create new instances using the 'new' keyword
const civic = new Car('Honda', 'Civic');
const accord = new Car('Honda', 'Accord');

// Both instances delegate the startEngine call up to Car.prototype
civic.startEngine(); // Output: Honda Civic's engine started.

// This verifies that the method is shared and not duplicated
console.log(civic.startEngine === accord.startEngine); // Output: true

