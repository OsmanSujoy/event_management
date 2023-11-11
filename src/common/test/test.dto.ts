// import Chance from 'chance';
// import { Cart } from '../../cart/cart.dto';
// import { Order } from '../../order/order.dto';
// import { Product } from '../../product/product.dto';
// import { Message, User } from '../../user/user.dto';

// const chance = new Chance();

// export const user: User = {
//   id: chance.guid(),
//   username: chance.first(),
//   password: chance.string(),
//   email: chance.email(),
//   roles: ['ADMIN'],
// };
// export const product: Product = {
//   id: chance.guid(),
//   productName: chance.string(),
//   productDescription: chance.string(),
//   productCatalogue: chance.string(),
//   productStock: chance.integer({ min: 1, max: 20 }),
//   productPrice: chance.integer({ min: 1, max: 20 }),
//   createdBy: user.id,
//   updatedBy: user.id,
//   createdAt: chance.string(),
//   updatedAt: chance.string(),
// };
// export const order: Order = {
//   id: chance.guid(),
//   status: chance.string(),
//   orderedBy: user.id,
//   orderedItem: [chance.guid()],
//   totalPayment: chance.integer({ min: 1, max: 20 }),
//   createdAt: chance.string(),
//   updatedAt: chance.string(),
// };
// export const cart: Cart = {
//   id: chance.guid(),
//   quantity: chance.integer({ min: 1, max: 20 }),
//   subTotal: chance.integer({ min: 1, max: 20 }),
//   cartedBy: user.id,
//   product: product.id,
//   status: chance.bool(),
// };

// user.createdProducts = [product];
// user.updatedProducts = [product];
// user.createdOrders = [order];
// user.createdCarts = [cart];

// export const message: Message = { message: 'Success' };
