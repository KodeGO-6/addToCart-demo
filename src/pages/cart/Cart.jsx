import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { CartItem } from './CartItem'
import useFetchData from '../../useFetchData'
import { useNavigate } from 'react-router-dom'

export const Cart = () => {
  const { data, loading, error } = useFetchData('https://fakestoreapi.com/products')
  const { cartItems, getTotalCartAmount } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount()
  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div>Your Cart</div>
      <div className='cartItems'>
        {data.map((product) => {
          if(cartItems[product.id] !== 0) {
            return <CartItem data={product} />
          }
        })}
      </div>
      { totalAmount > 0 ? 
        <div className='checkout'>
          
          <p>Subtotal: $ {totalAmount}</p>
          <button onClick={() => navigate('/')}> Continue Shopping </button>
          <button> Checkout </button>
        
        </div>
      : <h1> Your Cart is Empty </h1>}  
    </div>
  )
}
