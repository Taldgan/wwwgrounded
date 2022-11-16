import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'

function AboutUsScreen(){
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
    <div></div>
  )
}

export default AboutUsScreen;
