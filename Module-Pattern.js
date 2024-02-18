// eCommerce module
const eCommerceModule = (() => {
  // Private variables
  const products = [];

  // Private function to calculate total price of products
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.price;
    });
    return totalPrice;
  };

  // Public interface
  return {
    // Public function to add a product
    addProduct: (product) => {
      products.push(product);
    },
    // Public function to remove a product
    removeProduct: (productName) => {
      const filteredProducts = products.filter((product) => product.name !== productName);
      products.length = 0;
      filteredProducts.forEach((product) => products.push(product));
    },
    // Public function to get total price of products
    getTotalPrice: () => calculateTotalPrice(),
  };
})();

// Usage
eCommerceModule.addProduct({ name: 'Laptop', price: 1000 });
eCommerceModule.addProduct({ name: 'Headphones', price: 100 });
eCommerceModule.addProduct({ name: 'Mouse', price: 20 });

console.log(eCommerceModule.getTotalPrice()); // Output: 1120
eCommerceModule.removeProduct('Mouse');
console.log(eCommerceModule.getTotalPrice()); // Output: 1100
