import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'

function MerchScreen(){
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products } = productList

  const clothingProducts = products.filter(product => product.category == 'Clothing')
  const otherProducts = products.filter(product => product.category == 'Other')
  const [searchParams, setSearchParams] = useSearchParams()

  let keyword = searchParams.get('keyword')
  useEffect(()=>{
    if(keyword !== null){
      dispatch(listProducts(`?keyword=${keyword}`))
    }
    else{
      dispatch(listProducts(''))
    }
  }, [dispatch, keyword])

  return (
    <div>
      <h1 className='text-center my-3'>Clothing</h1>
      {loading ? <Loader />
          : error ? <Message variant='dark'>{error}</Message>
          :
          <Row>
            {clothingProducts.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
            </Row>
      }

      <div>
        <h1 className='text-center my-3'>Mugs and Tumblers</h1>
        {loading ? <Loader />
            : error ? <Message variant='dark'>{error}</Message>
            :
            <Row>
              {otherProducts.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
              </Row>
        }
            </div>
          </div>
  )
}

export default MerchScreen;
