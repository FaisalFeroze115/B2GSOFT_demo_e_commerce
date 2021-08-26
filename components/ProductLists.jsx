import React, {useState, useContext, useEffect} from 'react'
import { MyContext } from '../pages/_app'
import Product from './Product'
import Link from 'next/link'

const ProductLists = ({addToCart}) => {
    const productData = useContext(MyContext);
    return (
        <div style={gridStyle}>
            {
                productData.map(product => (
                    <Link key={product.id} href={`/products/${product.id}`} passHref>
                        <a style={aStyle}>
                            <Product
                                name={product.name}
                                image={product.image}
                                code={product.code}
                                price={product.price}
                                sale_price = {product.sale_price}
                                rating={product.rating}
                                id = {product.id}
                                addToCart = {addToCart}
                            /> 
                        </a>
                        
                    </Link>  
                ))
            }
        </div>
    )
}

export default ProductLists

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridRowGap: '30px'
}

const aStyle = {
    textDecoration: 'none',
    color: '#000',
}
