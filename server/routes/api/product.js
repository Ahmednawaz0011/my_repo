const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs')
// Bring in Models & Helpers
const db = require("../../models");
const Product = db.product;
const Brand = db.brand;
const Category = db.category;
const path = require('path')
// const Product = require('../../models/product');
// const Brand = require('../../models/brand');
// const Category = require('../../models/category');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const upload = require('../../middleware/upload')

const storage = multer.memoryStorage();
// const upload = multer({ storage });

router.post(
  '/add',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  upload.single('image'),
  async (req, res) => {
    try {
      const sku = req.body.sku;
      const name = req.body.name;
      const description = req.body.description;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const taxable = req.body.taxable;
      const isActive = req.body.isActive;
      const brand = req.body.brand != 0 ? req.body.brand : null;
      const category = req.body.category != 0 ? req.body.category : null;
      const imageUrl = req.file ? req.file.filename : '';

      console.log(req.file.filename, 'file is the');


      if (!sku) {
        return res.status(400).json({ error: 'You must enter sku.' });
      }

      if (!description || !name) {
        return res
          .status(400)
          .json({ error: 'You must enter description & name.' });
      }

      if (!quantity) {
        return res.status(400).json({ error: 'You must enter a quantity.' });
      }

      if (!price) {
        return res.status(400).json({ error: 'You must enter a price.' });
      }

      const foundProduct = await Product.findOne({ where: { sku: sku } });

      if (foundProduct) {
        return res.status(400).json({ error: 'This sku is already in use.' });
      }

      const product = {
        sku,
        name,
        description,
        quantity,
        price,
        taxable,
        isActive,
        brand,
        category,
        imageUrl,
        // imageKey
      };

      const savedProduct = await Product.create(product);

      res.status(200).json({
        success: true,
        message: `Product has been added successfully!`,
        product: savedProduct
      });
    } catch (error) {
      console.log(error, ' eroro');

      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch store products api
router.get('/list', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).populate(
      'brand',
      'name'
    );
    res.status(200).json({
      products
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch products api
router.get(
  '/',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      let products = [];

      if (req.user.merchant) {
        const brands = await Brand.find({
          merchant: req.user.merchant
        }).populate('merchant', '_id');

        const brandId = brands[0]['_id'];

        products = await Product.find({})
          .populate({
            path: 'brand',
            populate: {
              path: 'merchant',
              model: 'Merchant'
            }
          })
          .where('brand', brandId);
      } else {
        products = await Product.findAll({
          include: [
            { model: Brand},{ model: Category }]
        })
      }

      res.status(200).json({
        products
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch product api
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    const productDoc = await Product.findOne({ where: { id: productId } })

    if (!productDoc) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    res.status(200).json({
      product: productDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch product slug api
router.get('/item/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const productDoc = await Product.findOne({ slug, isActive: true }).populate(
      'brand'
    );

    if (!productDoc) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    res.status(200).json({
      product: productDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all products by category api
router.get('/list/category/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const categoryDoc = await Category.findOne(
      { slug, isActive: true },
      'products -_id'
    ).populate('products');

    if (!categoryDoc) {
      return res.status(404).json({
        message: 'No products found.'
      });
    }

    res.status(200).json({
      products: categoryDoc ? categoryDoc.products : categoryDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all products by brand api
router.get('/list/brand/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const brand = await Brand.find({ slug, isActive: true });

    if (brand.length <= 0) {
      return res.status(404).json({
        message: `Cannot find brand with the slug: ${slug}.`
      });
    }

    const products = await Product.find({ brand: brand[0]._id }).populate(
      'brand',
      'name'
    );

    res.status(200).json({
      products
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/list/select', auth, async (req, res) => {
  try {
    const products = await Product.find({}, 'name');

    res.status(200).json({
      products
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put(
  '/:id',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const update = req.body.product;
      const query = { id: productId };

      await Product.update(update, { where: query });

      res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id/active',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const update = req.body.product;
      const query = { id: productId };

      await Product.update(update, { where: query });

      res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.delete(
  '/delete/:id',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Merchant),
  async (req, res) => {
    try {
      const product = await Product.destroy({ where: { id: req.params.id } });

      res.status(200).json({
        success: true,
        message: `Product has been deleted successfully!`,
        product
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.get('/get/:imgName', (req, res) => {
  const url = path.join(__dirname, '../../uploads/' + req.params.imgName)
  res.sendFile(url);
})

module.exports = router;
