


module.exports = (sequelize, Sequelize) => {

  const Product = sequelize.define("Product", {
    sku: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING,
      trim: true
    },
    slug: {
      type: Sequelize.STRING,
      slug: 'name',
      unique: true
    },
    imageUrl: {
      type: Sequelize.STRING
    },
    imageKey: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING,
      trim: true
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.INTEGER
    },
    taxable: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    },
    brand: {
      type: Sequelize.INTEGER,
    },
    category: {
      type: Sequelize.INTEGER,
    },
  updated: Sequelize.DATE,
  created: {
    type: Sequelize.DATE,
    default: Date.now
  }
  });
  return Product;
};


