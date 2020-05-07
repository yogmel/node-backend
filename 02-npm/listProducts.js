const faker = require('faker');

const listProducts = (num) => {
  console.log('===============');
  console.log('WELCOME TO SHOP');
  console.log('===============');

  for(let i = 0; i < num; i++) {
    console.log(`${faker.commerce.productName()} - $${faker.finance.amount()}`);
  }
}

listProducts(10);
