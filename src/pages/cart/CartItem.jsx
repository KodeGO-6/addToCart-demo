import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'

export const CartItem = (props) => {
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext)

  return (
    <div className='cartItem'>
        <img src={props.data.image} alt='#' />
        <div className='description'>
            <p>{props.data.title}</p>
            <p>$ {props.data.price}</p>
            <div className='countHandler'>
                <button onClick={() => removeFromCart(props.data.id)}> - </button>
                <input 
                    value={cartItems[props.data.id]} 
                    onChange={(e) => updateCartItemCount(Number(e.target.value), props.data.id)}/>
                <button onClick={() => addToCart(props.data.id)}> + </button>
            </div>
        </div>
    </div>
  )
}
