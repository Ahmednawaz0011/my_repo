/*
 *
 * Brand reducer
 *
 */

import {
  FETCH_BRANDS,
  FETCH_STORE_BRANDS,
  FETCH_BRAND,
  BRAND_CHANGE,
  BRAND_EDIT_CHANGE,
  SET_BRAND_FORM_ERRORS,
  SET_BRAND_FORM_EDIT_ERRORS,
  RESET_BRAND,
  ADD_BRAND,
  REMOVE_BRAND,
  FETCH_BRANDS_SELECT,
  BRAND_SELECT
} from './constants';

const initialState = {
  brands: [],
  storeBrands: [{
    name: "Gucci",
    slug: "gucci"
  },{
    name: "Polo",
    slug: "polo"
  },{
    name: "Gucci gucci",
    slug: "gucci-gucci"
  },{
    name: "Ecommerce products",
    slug: "ecommerce-products"
  },{
    name: "calvin klein",
    slug: "calvin-klein"
  },{
    name: "Tommy Hilfiger",
    slug: "tommy-hilfiger"
  },{
    name: "Apple",
    slug: "aplle"
  }],
  brand: {
    name: '',
    description: ''
  },
  brandsSelect: [],
  selectedBrands: [],
  brandFormData: {
    name: '',
    description: '',
    isActive: true
  },
  formErrors: {},
  editFormErrors: {}
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANDS:
      return {
        ...state,
        brands: action.payload
      };
    case FETCH_STORE_BRANDS:
      return {
        ...state,
        storeBrands: action.payload
      };
    case FETCH_BRAND:
      return {
        ...state,
        brand: action.payload,
        editFormErrors: {}
      };
    case FETCH_BRANDS_SELECT:
      return {
        ...state,
        brandsSelect: action.payload
      };
    case BRAND_SELECT:
      return {
        ...state,
        selectedBrands: action.payload
      };
    case ADD_BRAND:
      return {
        ...state,
        brands: [...state.brands, action.payload]
      };
    case REMOVE_BRAND:
      const index = state.brands.findIndex(b => b._id === action.payload);
      return {
        ...state,
        brands: [
          ...state.brands.slice(0, index),
          ...state.brands.slice(index + 1)
        ]
      };
    case BRAND_CHANGE:
      return {
        ...state,
        brandFormData: {
          ...state.brandFormData,
          ...action.payload
        }
      };
    case BRAND_EDIT_CHANGE:
      return {
        ...state,
        brand: {
          ...state.brand,
          ...action.payload
        }
      };
    case SET_BRAND_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_BRAND_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    case RESET_BRAND:
      return {
        ...state,
        brandFormData: {
          name: '',
          description: '',
          isActive: true
        },
        selectedBrands: [],
        formErrors: {}
      };
    default:
      return state;
  }
};

export default brandReducer;
