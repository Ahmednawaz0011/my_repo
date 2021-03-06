/**
 *
 * OrderList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import { formatDate } from '../../../helpers/date';

const OrderList = props => {
  const { orders } = props;

  const renderFirstItem = products => {
    return (
      <img
        className='item-image'
        src={`${
          products[0] && products[0].Product && products[0].Product.imageUrl
            ? `/api/product/get/${products[0].Product.imageUrl}`
            : '/images/placeholder-image.png'
        }`}
      />
    );
  };

  return (
    <div className='order-list'>
      {orders.map((order, index) => (
        <div key={index} className='order-box'>
          <Link to={`/order/${order?.id}`} className='d-block box-link'>
            <div className='d-flex flex-column flex-lg-row mb-3'>
              <div className='order-first-item p-lg-3'>
                {renderFirstItem(order.OrderDetails || [])}
              </div>
              <div className='d-flex flex-column flex-xl-row justify-content-between flex-1 ml-lg-2 mr-xl-4 p-3'>
                <div className='order-details'>
                  <div className='mb-1'>
                    <span>Status</span>
                    <span className='order-label order-status'>{` ${order?.status}`}</span>
                  </div>
                  <div className='mb-1'>
                    <span>Order #</span>
                    <span className='order-label'>{` ${order?.id}`}</span>
                  </div>
                  <div className='mb-1'>
                    <span>Ordered on</span>
                    <span className='order-label'>{` ${formatDate(
                      order?.created
                    )}`}</span>
                  </div>
                  {/* <div className='mb-1'>
                    <span>Order Total</span>
                    <span className='order-label'>{` $${order?.total}`}</span>
                  </div> */}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
