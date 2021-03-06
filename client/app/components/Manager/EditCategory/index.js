/**
 *
 * EditCategory
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';

const EditCategory = props => {
  const {
    category,
    categoryChange,
    formErrors,
    updateCategory,
    deleteCategory
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateCategory();
  };

  return (
    <div className='edit-category'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Category Name'}
              value={category.name}
              onInputChange={(name, value) => {
                categoryChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Category Description'}
              value={category.description}
              onInputChange={(name, value) => {
                categoryChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Save'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Delete'
            onClick={() => deleteCategory(category.id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
