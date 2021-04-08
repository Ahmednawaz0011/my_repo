
// Cart Item Schema

module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("Cart", {
    product: {
      type: Sequelize.STRING,
      ref: 'Product'
    },
    quantity: Sequelize.INTEGER,
    totalPrice: {
      type: Sequelize.INTEGER
    },
    priceWithTax: {
      type: Sequelize.INTEGER,
      default: 0
    },
    status: {
      type: Sequelize.ENUM,
      default: 'Not processed',
      values: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    }
  });

  return Cart;
};


module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("Cart", {
    products: {    
      type: Sequelize.STRING,
      allowNull: false,
      get() {
          return this.getDataValue('favColors').split(';')
      },
      set(val) {
         this.setDataValue('favColors',val.join(';'));
      }},
    user: {
      type: Sequelize.STRING,
      // type: Schema.Types.ObjectId,
      ref: 'User'
    },
  updated: Sequelize.DATE,
  created: {
    type: Sequelize.DATE,
    default: Date.now
  }
  });

  return Cart;
};
