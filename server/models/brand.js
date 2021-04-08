// const Mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');
// const { Schema } = Mongoose;

// const options = {
//   separator: '-',
//   lang: 'en',
//   truncate: 120
// };

// Mongoose.plugin(slug, options);

// // Brand Schema
// const BrandSchema = new Schema({
//   name: {
//     type: String,
//     trim: true
//   },
//   slug: {
//     type: String,
//     slug: 'name',
//     unique: true
//   },
//   image: {
//     data: Buffer,
//     contentType: String
//   },
//   description: {
//     type: String,
//     trim: true
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   merchant: {
//     type: Schema.Types.ObjectId,
//     ref: 'Merchant',
//     default: null
//   },
//   updated: Date,
//   created: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = Mongoose.model('Brand', BrandSchema);

module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define("Brand", {
  name: {
    type: Sequelize.STRING,
    // trim: true
  },
  slug: {
    type: Sequelize.STRING,
    slug: 'name',
    unique: true
  },
  image: {
    // data: Buffer,
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING,
    trim: true
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  merchant: {
    type: Sequelize.STRING,
    // type: Schema.Types.ObjectId,
    ref: 'Merchant',
    defaultValue: null
  },
  updated: Sequelize.DATE,
  created: {
    type: Sequelize.DATE,
    defaultValue: Date.now
  }
  });

  return Brand;
};
