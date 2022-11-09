import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
})

export const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store



//import { configureStore, combineReducers } from '@reduxjs/toolkit'
//import thunk from 'redux-thunk'
//import { productListReducer, productDetailsReducer } from './reducers/productReducers'
//
//const reducer = combineReducers({
//  productList: productListReducer,
//  productDetails: productDetailsReducer,
//})
//
//export const initialState = {}
//
//const middleware = [thunk]
//
//const store = configureStore({
//  reducer: reducer,
//  preloadedState: initialState,
//  middleware: middleware,
//})
//
//export default store
