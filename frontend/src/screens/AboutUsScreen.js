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
    
    <div className='AboutUs'>
      <p class='AUHeader'>About Us</p>
      <h2 className='Sub-Header'>Coffee by Programmers, For Programmers</h2>
      <p className= 'Our-Story'>As we all know, programmers work day and night writing code. Whether its work
      or passion projects, many programmers turn to coffee to help push through
      sleepless nights. The only problem is, drink to much and alert as you may be
      you won't be able to focus. To solve this problem we created our own brand
      of coffee named Grounded Coffee. Our special blend of ingredients not only create
      a great tasting drink, but will keep you focused for longer without the usual
      after effects of drinking to much coffee. With five different coffee blends to
      choose from there's something for everyone to enjoy.</p>
    </div>
  )
}

export default AboutUsScreen;
