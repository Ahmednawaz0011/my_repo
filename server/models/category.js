
module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("Category", {
  _id: {
    type: Sequelize.STRING,
    // type: Schema.ObjectId,
    auto: true
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
  image: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING,
    trim: true
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    default: true
  },
  updated: Sequelize.DATE,
  created: {
    type: Sequelize.DATE,
    default: Date.now
  }
  });

  return Category;
};
