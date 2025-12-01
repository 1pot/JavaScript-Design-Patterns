// 👂 Observer Pattern Explained
// The Observer Pattern is a behavioral design pattern where an object, known as the Subject or Observable, maintains a list of dependents, called Observers or Subscribers, and notifies them automatically of any state changes, typically by calling a specific method on them.

// It's fundamentally about one-to-many dependency where one object's state change triggers updates in all its dependents. This design is crucial for achieving loose coupling—the observable has no knowledge of its subscribers' specific classes or internal implementation, only that they implement the update method. Similarly, subscribers are only aware of the observable, not the other subscribers.

// This pattern is widely used in front-end development for:

// Event Handling: The DOM itself is an observable, and event listeners are the subscribers.

// State Management: Libraries like Redux, Zustand, and RxJS heavily rely on this concept to propagate state changes to connected components.

//Practical Example: Component Communication Service // Let's create a simplified App Event Bus (Observable) that components (Subscribers) can listen to for changes, simulating a global application event system.

// Observable/Subject Class class AppEventBus { constructor() { // A Map or object to store different events and their subscribers this.subscriptions = new Map(); }

  /**
 * Subscribers register a callback function to listen for a specific event name.
 * @param {string} eventName - The topic to subscribe to (e.g., 'userLoggedIn', 'cartUpdated').
 * @param {function} callback - The function to be called when the event occurs.
 */
subscribe(eventName, callback) {
    if (!this.subscriptions.has(eventName)) {
        this.subscriptions.set(eventName, []);
    }
    // Add the callback to the list for that specific event
    this.subscriptions.get(eventName).push(callback);
    
    // Return an unsubscribe function for cleanup (crucial in React's useEffect)
    return () => {
        const currentSubscribers = this.subscriptions.get(eventName);
        if (currentSubscribers) {
            this.subscriptions.set(
                eventName,
                currentSubscribers.filter(sub => sub !== callback)
            );
        }
    };
}

/**
 * The Observable notifies all subscribers of a specific event.
 * @param {string} eventName - The topic to notify.
 * @param {*} data - The payload/state to send to the subscribers.
 */
notify(eventName, data) {
    const subscribers = this.subscriptions.get(eventName);

    if (subscribers) {
        console.log(`\n**OBSERVABLE NOTIFICATION:** Dispatching event '${eventName}' to ${subscribers.length} subscribers.`);
        // Iterate over all subscribers (callbacks) for this event and execute them
        subscribers.forEach(callback => callback(data));
    } else {
         console.log(`No subscribers found for event: ${eventName}`);
    }
}

// Create a singleton instance to be used application-wide const eventBus = new AppEventBus();

// --- Subscriber Implementation (Simulated React Component Logic) ---

// Component 1: The Logger const LoggerComponent = (message) => { console.log([Logger]: Received update! Data: ${message}); };

// Component 2: The UI Renderer const UserPanelComponent = (userData) => { console.log([User Panel]: Updating display for user: ${userData.name}, Status: ${userData.status}); };

// --- Usage ---

// 1. Subscribers register their interest (subscribe) console.log("Subscribers are connecting to the Event Bus..."); const unsubscribeLogger = eventBus.subscribe('userLoggedIn', LoggerComponent); const unsubscribeUserPanel = eventBus.subscribe('userLoggedIn', UserPanelComponent);

// 2. An external action triggers the Observable (notify) console.log("\n--- TRIGGERING EVENT 1: Initial Login ---"); const userA = { name: 'Alice', status: 'Online' }; eventBus.notify('userLoggedIn', userA);

// 3. A subscriber can unsubscribe (cleanup) console.log("\n[Logger] unsubscribes."); unsubscribeLogger();

// 4. Another external action triggers the Observable (notify) console.log("\n--- TRIGGERING EVENT 2: Status Change ---"); const userB = { name: 'Bob', status: 'Active' }; eventBus.notify('userLoggedIn', userB);

/* OUTPUT:

Subscribers are connecting to the Event Bus...

--- TRIGGERING EVENT 1: Initial Login --- OBSERVABLE NOTIFICATION: Dispatching event 'userLoggedIn' to 2 subscribers. [Logger]: Received update! Data: { name: 'Alice', status: 'Online' } [User Panel]: Updating display for user: Alice, Status: Online

[Logger] unsubscribes.

--- TRIGGERING EVENT 2: Status Change --- OBSERVABLE NOTIFICATION: Dispatching event 'userLoggedIn' to 1 subscribers. [User Panel]: Updating display for user: Bob, Status: Active */
