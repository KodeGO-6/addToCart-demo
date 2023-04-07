import React, { useContext } from 'react'
import useFetchData from '../../useFetchData'
import { ShopContext } from '../../context/ShopContext'

export const Product = () => {
    const { data, loading, error } = useFetchData('https://fakestoreapi.com/products')
    const { addToCart, cartItems } = useContext(ShopContext)
    localStorage.setItem('PRODUCTS', data)

    if (loading) {
        return <div>Loading...</div>
        
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className='products--container'>
            {data.map(product => (
                <div key={product.id} className='card'>
                    <div className='image--wrapper'><img src={product.image} alt={product.category} /></div>
                    <div className='card--description'>
                        <h6>{product.title}</h6>
                        <small>{product.category}</small>
                        <h6>Price: $ {product.price}</h6>
                        <button 
                            className='addToCart--btn' 
                            onClick={() => addToCart(product.id)}> 
                            Add to Cart {cartItems[product.id] > 0 && <>({cartItems[product.id]})</>}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
