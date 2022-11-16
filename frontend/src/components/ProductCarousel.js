import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image, Row, Col} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

function ProductCarousel(){
  const dispatch = useDispatch()

  const productTopRated = useSelector(state => state.productTopRated)
  const {error, loading, products} = productTopRated

  useEffect(() =>{
    dispatch(listTopProducts())
  }, [dispatch])

  return (
    loading ? <Loader/>
    : error
    ? <Message variant='danger'>{error}</Message>
    : (
      <Carousel pause='hover' className='bg-light' variant='dark'>
        {products.map(product => (
          <Carousel.Item key={product._id}>
            <Row>
              <Col>
              </Col>
              <Col>
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid style={{opacity: 0.2, width: 200, height: 250}}/>
                  <Carousel.Caption className='carousel.caption'>
                    <h4>{product.name}</h4>
                  </Carousel.Caption>
                </Link>
              </Col>
              <Col>
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                  <Carousel.Caption className='carousel.caption'>
                    <h4>{product.name}</h4>
                  </Carousel.Caption>
                </Link>
              </Col>

              <Col>
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid style={{opacity: 0.2, width: 200, height: 250}}/>
                  <Carousel.Caption className='carousel.caption'>
                    <h4>{product.name}</h4>
                  </Carousel.Caption>
                </Link>
              </Col>
              <Col>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
        </Carousel>
    )
  )

}

export default ProductCarousel
