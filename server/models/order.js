
module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Order", {
    cart: {
      type: Sequelize.STRING,
      ref: 'Cart'
    },
    user: {
      type: Sequelize.STRING,
      ref: 'User'
    },
    total: {
      type: Sequelize.INTEGER,
      default: 0
    },
  updated: Sequelize.DATE,
  created: {
    type: Sequelize.DATE,
    default: Date.now
  }
  });

  return Order;
};


