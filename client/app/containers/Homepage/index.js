/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/helpers';
import ProductList from '../../components/Store/ProductList';
class Homepage extends React.PureComponent {
  render() {
    const { products, isLoading } = this.props;
    return (
      <div className='homepage'>
        <Row className='flex-row'>
          <Col xs='12' lg='12' className='order-lg-2 mb-3 px-3 px-md-2'>
            <div className='home-carousel' >
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={false}
                slides={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <img key={index} src={item.imageUrl} />
                ))}
              </CarouselSlider>
            </div>
          </Col>
        </Row>
        <h1 style={{paddingTop: 10, paddingBottom: 10}}>Categories</h1>
        <Row>
          <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/apparel.jpeg' className='mb-3' />
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/handbag.jpeg' className='mb-3' />
            </div>
          </Col>
          {/* 
          <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/apparel.jpeg' className='mb-3' />
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/handbag.jpeg' className='mb-3' />
            </div>
          </Col> */}
        </Row>

        <h1 style={{paddingTop: 10, paddingBottom: 10}}>Brands</h1>
        <Row>
          <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/nike.png' />
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
          <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/adidas.jpeg' />
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/polo.png' />
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='/images/gucci.png' />
            </div>
          </Col>
        </Row>
        <div>
          <h1>Featured Products</h1>
        <ProductList products={products} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.storeProducts,
  };
};

export default connect(mapStateToProps, actions)(Homepage);
