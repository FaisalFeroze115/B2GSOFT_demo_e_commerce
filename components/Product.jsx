import React from 'react'
import Image from 'next/image'
import { BsFillStarFill } from "react-icons/bs";
import { Button } from 'react-bootstrap';


const Product = ({name,image,code,price,sale_price,rating,id,addToCart}) => {


    return (
        <div style={{width: '250px', backgroundColor: 'rgb(219 230 219 / 36%)', padding: '15px 15px'}}>
            <div>
                { image ? <Image src={image} alt='product image' width="250" height="200" layout="responsive"/> 
                : <img src="" alt="product image"/>
                }
                
            </div>
            <div style={contentFlex}>
                <div style={starStyle}>
                    <BsFillStarFill/> {rating}/5
                </div>
                <div>
                    <span>1200 SOLD</span>
                </div>
            </div>
            <div>
                <p style={{fontWeight: 'bold', marginTop: '10px'}}>{name}</p>
            </div>
            <div>
                <p style={{margin: '0'}}><span>code </span> <span style={{fontWeight: 'bold'}}>{code}</span></p>
                <p><span style={{textDecoration: 'line-through'}}>tk {price} </span> <span style={{fontWeight: 'bold', marginLeft: '8px'}}> tk {sale_price}</span></p>
            </div>

            <div style={contentFlex}>
                <Button onClick={(e)=>{addToCart(id,e)}} variant="primary">Add to Cart</Button>
                <Button onClick={(e)=>{alert('hello'); e.preventDefault();}} variant="warning">Order Now</Button>
            </div>
        </div>
    )
}

export default Product

const contentFlex = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}

const starStyle = {
    backgroundColor: 'rgb(249 190 39)',
    color: '#333',
    padding: '0 5px',
}
