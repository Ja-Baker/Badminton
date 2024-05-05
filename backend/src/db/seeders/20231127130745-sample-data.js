const db = require('../models');
const Users = db.users;

const Orders = db.orders;

const Products = db.products;

const Reviews = db.reviews;

const OrdersData = [
  {
    // type code here for "relation_many" field

    // type code here for "relation_one" field

    order_date: new Date('2024-02-18'),

    status: 'refunded',
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_one" field

    order_date: new Date('2023-07-15'),

    status: 'pending',
  },

  {
    // type code here for "relation_many" field

    // type code here for "relation_one" field

    order_date: new Date('2023-06-03'),

    status: 'refunded',
  },
];

const ProductsData = [
  {
    name: 'James Watson',

    price: 96.88,

    // type code here for "images" field

    condition: 'old',

    description: 'Hmm. In the end, cowards are those who follow the dark side.',

    stock_quantity: 8,
  },

  {
    name: 'Albert Einstein',

    price: 31.35,

    // type code here for "images" field

    condition: 'new',

    description:
      'Always two there are, no more, no less. A master and an apprentice.',

    stock_quantity: 1,
  },

  {
    name: 'Sigmund Freud',

    price: 30.44,

    // type code here for "images" field

    condition: 'used',

    description: 'Younglings, younglings gather ’round.',

    stock_quantity: 5,
  },
];

const ReviewsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    rating: 3,

    comment:
      'Do not assume anything Obi-Wan. Clear your mind must be if you are to discover the real villains behind this plot.',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    rating: 6,

    comment:
      'Like fire across the galaxy the Clone Wars spread. In league with the wicked Count Dooku, more and more planets slip. Against this threat, upon the Jedi Knights falls the duty to lead the newly formed army of the Republic. And as the heat of war grows, so, to, grows the prowess of one most gifted student of the Force.',
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    rating: 1,

    comment:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',
  },
];

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateOrderWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setUser) {
    await Order0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setUser) {
    await Order1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setUser) {
    await Order2.setUser(relatedUser2);
  }
}

async function associateReviewWithProduct() {
  const relatedProduct0 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Review0 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Review0?.setProduct) {
    await Review0.setProduct(relatedProduct0);
  }

  const relatedProduct1 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Review1 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Review1?.setProduct) {
    await Review1.setProduct(relatedProduct1);
  }

  const relatedProduct2 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Review2 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Review2?.setProduct) {
    await Review2.setProduct(relatedProduct2);
  }
}

async function associateReviewWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review0 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Review0?.setUser) {
    await Review0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review1 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Review1?.setUser) {
    await Review1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review2 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Review2?.setUser) {
    await Review2.setUser(relatedUser2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Orders.bulkCreate(OrdersData);

    await Products.bulkCreate(ProductsData);

    await Reviews.bulkCreate(ReviewsData);

    await Promise.all([
      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateOrderWithUser(),

      await associateReviewWithProduct(),

      await associateReviewWithUser(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orders', null, {});

    await queryInterface.bulkDelete('products', null, {});

    await queryInterface.bulkDelete('reviews', null, {});
  },
};
