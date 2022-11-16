import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')

  const userRegister = useSelector(state => state.userRegister)
  const {error, loading, userInfo} = userRegister

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    if(password != confirmPassword){
      setMessage('Passwords do no match')
    }else{
      dispatch(register(name, email, password))
    }
  }
  return(
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
          required
          type='name'
          placeholder='Enter name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          </Form.Control>
        </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label className='my-3'>Email Address</Form.Label>
            <Form.Control
            required
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            </Form.Control>
          </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label className='my-3'>Password</Form.Label>
          <Form.Control
          required
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='passwordConfirm'>
          <Form.Label className='my-3'>Confirm Password</Form.Label>
          <Form.Control
          required
          type='password'
          placeholder='Enter Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        >
          </Form.Control>

          <Button className='my-3' type='submit' variant='primary'>Register</Button>
        </Form.Group>
        <Row className='py-3'>
          <Col>
            Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}> 
              Sign In
            </Link>
          </Col>

        </Row>
      </Form>

    </FormContainer>
  )
}

export default RegisterScreen
