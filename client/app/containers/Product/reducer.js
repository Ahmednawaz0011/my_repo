/*
 *
 * Product reducer
 *
 */

import {
  FETCH_PRODUCTS,
  FETCH_STORE_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_STORE_PRODUCT,
  PRODUCT_CHANGE,
  PRODUCT_EDIT_CHANGE,
  PRODUCT_SHOP_CHANGE,
  SET_PRODUCT_FORM_ERRORS,
  SET_PRODUCT_FORM_EDIT_ERRORS,
  SET_PRODUCT_SHOP_FORM_ERRORS,
  RESET_PRODUCT,
  RESET_PRODUCT_SHOP,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  PRODUCT_SELECT,
  FETCH_PRODUCTS_SELECT,
  SET_PRODUCTS_LOADING
} from './constants';

const initialState = {
  products: [],
  storeProducts: [
    {
      "slug": "pr-1",
      "imageUrl": "https://static-01.daraz.pk/p/86a8de5d319c0cb92f2d92ecf52541ba.jpg_720x720q80.jpg_.webp",
      "name":"Stylish Smart Watch",
      "brand":{
        "name":"Gucci"
       
      },
      "description": "New Design Fashionable",
      "price": 699
    },{
      "slug": "pr-2",
      "imageUrl": "https://static-01.daraz.pk/p/f152dab93c418275ca77e38c1a795b22.jpg_720x720q80.jpg_.webp",
      "name":"Men Digital Watches with Touch Sensor Electronic Watch",
      "brand":{
        "name":"Gucci"
      },
      "description": "New Design Fashionable. New Design Fashionable. New Design Fashionable. New Design Fashionable. New Design Fashionable.",
      "price": 1299
    },{
      "slug": "pr-3",
      "imageUrl": "https://static-01.daraz.pk/p/2601c2ade007f68d03a7adf3f8da6821.jpg_720x720q80.jpg_.webp",
      "name":"Oxford Cotton Plain Polo T-Shirt For Men",
      "brand":{
        "name":"Polo"
      },
      "description": "Cotton Polo, Plain T-Shirt, Charcoal",
      "price": 3299
    },{
      "slug": "pr-1",
      "imageUrl": "https://static-01.daraz.pk/p/86a8de5d319c0cb92f2d92ecf52541ba.jpg_720x720q80.jpg_.webp",
      "name":"Stylish Smart Watch",
      "brand":{
        "name":"Gucci"
       
      },
      "description": "New Design Fashionable",
      "price": 699
    },{
      "slug": "pr-2",
      "imageUrl": "https://static-01.daraz.pk/p/f152dab93c418275ca77e38c1a795b22.jpg_720x720q80.jpg_.webp",
      "name":"Men Digital Watches with Touch Sensor Electronic Watch",
      "brand":{
        "name":"Gucci"
      },
      "description": "New Design Fashionable. New Design Fashionable. New Design Fashionable. New Design Fashionable. New Design Fashionable.",
      "price": 1299
    },{
      "slug": "pr-3",
      "imageUrl": "https://static-01.daraz.pk/p/2601c2ade007f68d03a7adf3f8da6821.jpg_720x720q80.jpg_.webp",
      "name":"Oxford Cotton Plain Polo T-Shirt For Men",
      "brand":{
        "name":"Polo"
      },
      "description": "Cotton Polo, Plain T-Shirt, Charcoal",
      "price": 3299
    }
  ],
  product: {
    _id: ''
  },
  storeProduct: {},
  productsSelect: [],
  selectedProducts: [],
  isProductAddOpen: false,
  productFormData: {
    sku: '',
    name: '',
    description: '',
    quantity: 1,
    price: 1,
    taxable: 0,
    image: {},
    isActive: true
  },
  isLoading: false,
  productShopData: {
    quantity: 1
  },
  taxableSelect: [
    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' }
  ],
  formErrors: {},
  editFormErrors: {},
  shopFormErrors: {}
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case FETCH_STORE_PRODUCTS:
      return {
        ...state,
        storeProducts: action.payload
      };
    case FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
        editFormErrors: {}
      };
    case FETCH_STORE_PRODUCT:
      return {
        ...state,
        storeProduct: action.payload,
        productShopData: {
          quantity: 1
        },
        shopFormErrors: {}
      };
    case SET_PRODUCTS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case FETCH_PRODUCTS_SELECT:
      return { ...state, productsSelect: action.payload };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case REMOVE_PRODUCT:
      const index = state.products.findIndex(b => b._id === action.payload);
      return {
        ...state,
        products: [
          ...state.products.slice(0, index),
          ...state.products.slice(index + 1)
        ]
      };
    case PRODUCT_CHANGE:
      return {
        ...state,
        productFormData: {
          ...state.productFormData,
          ...action.payload
        }
      };
    case PRODUCT_EDIT_CHANGE:
      return {
        ...state,
        product: {
          ...state.product,
          ...action.payload
        }
      };
    case PRODUCT_SHOP_CHANGE:
      return {
        ...state,
        productShopData: {
          ...state.productShopData,
          ...action.payload
        }
      };
    case PRODUCT_SELECT:
      return {
        ...state,
        selectedProducts: action.payload
      };
    case SET_PRODUCT_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_PRODUCT_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    case SET_PRODUCT_SHOP_FORM_ERRORS:
      return {
        ...state,
        shopFormErrors: action.payload
      };
    case RESET_PRODUCT:
      return {
        ...state,
        productFormData: {
          sku: '',
          name: '',
          description: '',
          quantity: 1,
          price: 0,
          image: {},
          isActive: true
        },
        formErrors: {},
        selectedProducts: []
      };
    case RESET_PRODUCT_SHOP:
      return {
        ...state,
        productShopData: {
          quantity: 1
        },
        shopFormErrors: {}
      };
    default:
      return state;
  }
};

export default productReducer;
