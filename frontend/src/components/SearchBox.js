import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox(){
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const submitHandler = (e) =>{
    e.preventDefault()
    if(keyword){
      navigate(`/?keyword=${keyword}`)
    } else{
      navigate(window.location.pathname)
    }
  }

  return (
    <Form onSubmit={submitHandler}>
  <Row>
        <Col xs='auto'>
        <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        className='mr-sm-2 ml-sm-5'
      >
        </Form.Control>
      </Col>
        <Col>
          <Button
          type='submit'
          variant='outline-success'
          className='p-2'
        >
            Submit
        </Button>
      </Col>
  </Row>
  </Form>
  )

}

export default SearchBox
