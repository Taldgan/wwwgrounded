import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'

function HomeScreen(){
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products } = productList

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
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? <Loader />
          : error ? <Message variant='dark'>{error}</Message>
          :
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
            </Row>

      }
          </div>
  )
}

export default HomeScreen;
