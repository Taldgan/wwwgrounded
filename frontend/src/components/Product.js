import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product }){
  return (
    <Card className="my-3 p-3 border-0" bg='light'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Product
