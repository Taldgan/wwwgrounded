import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderScreen(){
  const params = useParams()
  const orderId = params.id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector(state => state.orderDetails)
  const {order, error, loading} = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const {loading: loadingPay, success: successPay} = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const {loading: loadingDeliver, success: successDeliver} = orderDeliver

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  if(!loading && !error){
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  }

  const addPayPalScript = () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.paypal.com/sdk/js?client-id=FAKE_CLIENT_ID'
    script.async = true
    script.onload = () =>{
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() =>{
    if(!userInfo){
      navigate('/login')
    }
    if(!order || successPay || order._id !== Number(orderId) || successDeliver){
      dispatch({type: ORDER_PAY_RESET })
      dispatch({type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    }
    else if(!order.isPaid){
      setSdkReady(true)
      setSdkReady(true)
      if(!window.paypal){
        addPayPalScript()
      }
      else{
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, navigate, userInfo])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, true))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {'   '} 
                {order.shippingAddress.postalCode},
                {'   '} 
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant='warning'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod} 
              </p>

              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='warning'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? <Message variant='info'>
                Your order is empty
                </Message> : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded/>
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                    </ListGroup>
                )}
                  </ListGroup.Item>

                </ListGroup>
              </Col>

              <Col md={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item> 
                      <h2>Order Summary</h2>
                    </ListGroup.Item> 
                    <ListGroup.Item> 
                      <Row>
                        <Col>Items:</Col>
                        <Col>${order.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item> 
                    <ListGroup.Item> 
                      <Row>
                        <Col>Shipping:</Col>
                        <Col>${order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item> 
                      <Row>
                        <Col>Tax Price:</Col>
                        <Col>${order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item> 
                      <Row>
                        <Col>Total Price:</Col>
                        <Col>${order.totalPrice}</Col>
                      </Row>
                      {!order.isPaid && (
                        <ListGroup.Item>
                          {loadingPay && <Loader />}

                          {!sdkReady ? (
                            <Loader />
                          ) : (
                            <PayPalScriptProvider options={{ "client-id": "Afev_V-d7XNTxGUkBHstFeFe4SlCBw5wlUVwXAL5xdnubIEaXhF9pu1bAXQx-VTaTh3XXqA75nJGN_nt", "enable-funding" : "card"}}>
                              <PayPalButtons 
                              className='my-3'  
                              createOrder={(data, actions)=>{
                                return actions.order.create({
                                  purchase_units: [
                                    {
                                      amount: {
                                        value: `${order.totalPrice}`,
                                      },
                                    }
                                  ],

                                })
                              }}
                              onApprove={(data, actions) => {
                                  successPaymentHandler()
                              }}
                              style={{ layout: "vertical" }} />
                          </PayPalScriptProvider>
                          )}
                        </ListGroup.Item>
                      )}
                    </ListGroup.Item>
                  {userInfo && userInfo.isAdmin && !order.isPaid && (
                      <Button
                      type='button'
                      className='btn btn-block'
                      onClick={successPaymentHandler}
                    >
                        Mark As Paid
                      </Button>
                  )}
                  {loadingDeliver && <Loader/>}
                  {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                      <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                        Mark As Delivered
                      </Button>
                  )}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </div>
  )
}

export default OrderScreen

