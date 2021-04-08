
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
  email: {
    type: Sequelize.STRING,
    required: () => {
      return this.provider !== 'email' ? false : true;
    }
  },
  phoneNumber:{
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  merchantRequest: {
    type: Sequelize.BOOLEAN,
    default: 0
  },
  provider: {
    type: Sequelize.STRING,
    required: true,
    default: 'email'
  },
  avatar: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.ENUM,
    default: 'ROLE_MEMBER',
    values: ['ROLE_MEMBER', 'ROLE_ADMIN', 'ROLE_MERCHANT']
  },
  resetPasswordToken: { type: Sequelize.STRING },
  resetPasswordExpires: { type: Sequelize.DATE },
  updated: Sequelize.DATE,
  created: {
    type: Sequelize.DATE,
    default: Date.now
  }
  });

  return User;
};
