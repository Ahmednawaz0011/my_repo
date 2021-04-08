
module.exports = (sequelize, Sequelize) => {
  const Merchant = sequelize.define("Merchant", {
    name: {
      type: Sequelize.STRING,
      trim: true
    },
    email: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    brand: {
      type: Sequelize.STRING
    },
    business: {
      type: Sequelize.STRING,
      trim: true
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    status: {
      type: Sequelize.ENUM,
      default: 'Waiting Approval',
      values: ['Waiting Approval', 'Rejected', 'Approved']
    },
  updated: Sequelize.DATE,
  created: {
    type: Sequelize.DATE,
    default: Date.now
  }
  });

  return Merchant;
};


