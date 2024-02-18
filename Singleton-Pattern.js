/*
The Singleton Pattern in JavaScript is a design pattern that ensures a class has only one instance and provides a global point of access to that instance. 
It's often used when exactly one object is needed to coordinate actions across the system. 
This pattern is particularly useful when exactly one object is required to coordinate actions across the system, such as a shared resource or a cache.

In JavaScript, the Singleton Pattern can be implemented using a combination of closures and immediately invoked function expressions (IIFEs) to create a private instance of the class and provide a public method to access that instance.
*/

//Practical Example: User Settings Singleton
// Let's say you have a scenario where you need to manage user settings throughout your application, and you want to ensure that there's only one instance of the user settings object:

// Singleton UserSettings
const UserSettings = (() => {
  let instance;

  function init() {
    // Private properties and methods
    let settings = {
      theme: 'light',
      fontSize: 14,
      language: 'en'
    };

    return {
      // Public methods to access and modify settings
      getSettings: () => settings,
      updateSettings: (newSettings) => {
        settings = { ...settings, ...newSettings };
      }
    };
  }

  return {
    // Public method to get the singleton instance
    getInstance: () => {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

// Usage
const settings1 = UserSettings.getInstance();
const settings2 = UserSettings.getInstance();

console.log(settings1 === settings2); // Output: true (both instances are the same)

settings1.updateSettings({ theme: 'dark' });
console.log(settings2.getSettings()); // Output: { theme: 'dark', fontSize: 14, language: 'en' }
