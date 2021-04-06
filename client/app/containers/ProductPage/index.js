/**
 *
 * ProductPage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import { BagIcon } from '../../components/Common/Icon';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class ProductPage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    // this.props.fetchStoreProduct(slug);
    document.body.classList.add('product-page');
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      // this.props.fetchStoreProduct(slug);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('product-page');
  }

  render() {
    const {
      isLoading,
      // product,
      productShopData,
      shopFormErrors,
      itemsInCart,
      productShopChange,
      handleAddToCart,
      handleRemoveFromCart
    } = this.props;

    let  product = 
      {
        "slug": "pr-3",
        "imageUrl": "https://static-01.daraz.pk/p/2601c2ade007f68d03a7adf3f8da6821.jpg_720x720q80.jpg_.webp",
        "name":"Oxford Cotton Plain Polo T-Shirt For Men",
        "brand":{
          "name":"Polo",
          slug: "polo"
        },
        "category":{
          name: "Men's Fashion",
          slug: 'men-fashion'
        },
        "description": "Cotton Polo, Plain T-Shirt, Charcoal",
        "price": 3299
      
    }

    return (
      <div className='product-shop'>
        {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(product).length > 0 ? (
          <Row className='flex-row'>
            <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
              <div className='position-relative'>
                <img
                  className='item-image'
                  src={`${
                    product.imageUrl
                      ? product.imageUrl
                      : '/images/placeholder-image.png'
                  }`}
                />
                {product.inventory <= 0 && !shopFormErrors['quantity'] ? (
                  <p className='stock out-of-stock'>Out of stock</p>
                ) : (
                  <p className='stock in-stock'>In stock</p>
                )}
              </div>
            </Col>
            <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
              <div className='product-container'>
                <div className='item-box'>
                  <div className='item-details'>
                    <h1 className='item-name one-line-ellipsis'>
                      {product.name}
                    </h1>
                    <p className='sku'>{product.sku}</p>
                    <hr />
                    {product.brand && (
                      <p className='by'>
                        see more from{' '}
                        <Link
                          to={`/shop/brand/${product.brand.slug}`}
                          className='default-link'
                        >
                          {product.brand.name}
                        </Link>
                      </p>
                    )}
                    <p className='item-desc'>{product.description}</p>
                    <p className='price'>${product.price}</p>
                  </div>
                  <div className='item-customize'>
                    <Input
                      type={'number'}
                      error={shopFormErrors['quantity']}
                      label={'Quantity'}
                      name={'quantity'}
                      decimals={false}
                      min={1}
                      max={product.inventory}
                      placeholder={'Product Quantity'}
                      disabled={
                        product.inventory <= 0 && !shopFormErrors['quantity']
                      }
                      value={productShopData.quantity}
                      onInputChange={(name, value) => {
                        productShopChange(name, value);
                      }}
                    />
                  </div>
                  <div className='item-actions'>
                    {itemsInCart.includes(product._id) ? (
                      <Button
                        variant='primary'
                        disabled={
                          product.inventory <= 0 && !shopFormErrors['quantity']
                        }
                        text='Remove From Bag'
                        className='bag-btn'
                        icon={<BagIcon />}
                        onClick={() => handleRemoveFromCart(product)}
                      />
                    ) : (
                      <Button
                        variant='primary'
                        disabled={
                          product.quantity <= 0 && !shopFormErrors['quantity']
                        }
                        text='Add To Bag'
                        className='bag-btn'
                        icon={<BagIcon />}
                        onClick={() => handleAddToCart(product)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <NotFound message='no product found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.storeProduct,
    productShopData: state.product.productShopData,
    shopFormErrors: state.product.shopFormErrors,
    itemsInCart: state.cart.itemsInCart,
    isLoading: state.product.isLoading
  };
};

export default connect(mapStateToProps, actions)(ProductPage);
