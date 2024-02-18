// eCommerce module
var eCommerceModule = (function() {
  // Private variables
  var products = [];

  // Private function to calculate total price of products
  function calculateTotalPrice() {
    var totalPrice = 0;
    products.forEach(function(product) {
      totalPrice += product.price;
    });
    return totalPrice;
  }

  // Public interface
  return {
    // Public function to add a product
    addProduct: function(product) {
      products.push(product);
    },
    // Public function to remove a product
    removeProduct: function(productName) {
      products = products.filter(function(product) {
        return product.name !== productName;
      });
    },
    // Public function to get total price of products
    getTotalPrice: function() {
      return calculateTotalPrice();
    }
  };
})();

// Usage
eCommerceModule.addProduct({ name: 'Laptop', price: 1000 });
eCommerceModule.addProduct({ name: 'Headphones', price: 100 });
eCommerceModule.addProduct({ name: 'Mouse', price: 20 });

console.log(eCommerceModule.getTotalPrice()); // Output: 1120
eCommerceModule.removeProduct('Mouse');
console.log(eCommerceModule.getTotalPrice()); // Output: 1100
