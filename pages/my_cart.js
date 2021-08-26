import { useContext, useState, useEffect, useCallback } from 'react';
import Header from '../components/Header'
import Image from 'next/image'
import { Container } from 'react-bootstrap';
import {MyContext} from './_app'
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router'


export default function MyCart(){
    const cartProducts = useContext(MyContext);
    const [myLocalCartProducts, setMyLocalCartProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [subTotals, setSubTotals] = useState([]);
    const [newLocalAfterRemove, setNewLocalAfterRemove] = useState([]);
    const router = useRouter()

    useEffect(()=>{
        const saved = localStorage.getItem("cart");
        if(saved && saved.length > 0){
            const myCart = JSON.parse(saved);
            // setMyLocalCartProducts(myCart);
            

            let totalSum = 0;
            let subItemCart = [];
            for(let localCartItem of myCart){
                for(let proItem of cartProducts){
                    if(localCartItem.productId === proItem.id){
                        let subCart = {
                            name: proItem.name,
                            quantity: localCartItem.quantity,
                            subtotal: proItem.sale_price*localCartItem.quantity
                        }
                        subItemCart.push(subCart)
                        //setSubTotals([...subTotals, subCart]);
                        totalSum = totalSum + (proItem.sale_price*localCartItem.quantity);
                    }
                }
            }
            setTotal(totalSum);
            setSubTotals(subItemCart);
            setMyLocalCartProducts(myCart);
            
        }
    },[])

    const getTotal = () => {
        let totalSum = 0;
        for(let localCartItem of myLocalCartProducts){
            for(let proItem of cartProducts){
                if(localCartItem.productId === proItem.id){
                    totalSum = totalSum + (proItem.sale_price*localCartItem.quantity);
                }
            }
        }
        setTotal(totalSum);
    }


    const checkOut = () => {
        const demoCart = [];
        localStorage.setItem('cart', JSON.stringify(demoCart));
        router.push('/');
    }

    const removeItem = useCallback( (id) => {
            const localSave = localStorage.getItem("cart");
            const localCart = JSON.parse(localSave);
            let newLocalCart = [];

            console.log(localCart)

            for(let local of localCart){
                if(local.productId == id){
                    continue;
                }else{
                    let newItem = {
                        productId: local.productId, 
                        quantity: local.quantity
                    }
                    newLocalCart.push(newItem);
                }
            }
            
            localStorage.setItem('cart', JSON.stringify(newLocalCart));
            setMyLocalCartProducts(newLocalCart);

            let totalSum = 0;
            let subItemCart = [];
            for(let localCartItem of newLocalCart){
                for(let proItem of cartProducts){
                    if(localCartItem.productId === proItem.id){
                        let subCart = {
                            name: proItem.name,
                            quantity: localCartItem.quantity,
                            subtotal: proItem.sale_price*localCartItem.quantity
                        }
                        subItemCart.push(subCart)
                        totalSum = totalSum + (proItem.sale_price*localCartItem.quantity);
                    }
                }
            }
            setTotal(totalSum);
            setSubTotals(subItemCart);
            
        }
    )


    return(
        <div>
            <Header />
            <Container>
                <div style={gridStyle}>
                    <div>
                        {   
                            myLocalCartProducts.length > 0 ?
                            myLocalCartProducts?.map(cartItem => (
                                cartProducts.map(product => (
                                    cartItem.productId == product.id ?
                                    <div key={product.id} style={gridStyle2}> 
                                        <div>
                                            <p style={pStyle}>{product.name}</p>
                                            <p style={pStyle}>rating: {product.rating}</p>
                                            <p style={pStyle}>Code: {product.code}</p>
                                            <p style={pStyle}>Tk: {product.sale_price} <span style={{textDecoration: 'line-through'}}>Tk: {product.price}</span></p>
                                            <p style={pStyle}>Quantity: {cartItem.quantity}</p>
                                            <p style={pStyle}>Sub-Total: {cartItem.quantity * product.sale_price}</p>
                                            <Button onClick={()=>removeItem(product.id)} variant="danger">Remove For Cart</Button>
                                        </div>
                                        <div>
                                            <Image src={product.image} alt='product image' width="280" height="200"/>
                                        </div>
                                    </div>
                                    : null
                                ))
                            ))
                            : <p>No Products Added To Cart</p>
                        } 
                        
                    </div>
                    
                    <div>
                        {
                           
                            <div>
                               {
                                   myLocalCartProducts.length > 0 ? 
                                    <div>
                                        {
                                            subTotals.map((subItem, index) =>(
                                                <div key={index}>
                                                    <p>{++index}. {subItem.name}, Quantity: {subItem.quantity}, Sub-Total: {subItem.subtotal}</p>
                                                </div>
                                            ))
                                        }
                                        <p>Total: {total}</p>
                                        <Button onClick={checkOut} variant="primary">Procced To Checkout</Button>
                                    </div>
                                    : null
                                   
                               }
                               
                            </div>
                           
                        }
                    </div>
                </div>

            </Container>
        </div>
    )

}

const gridStyle ={
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
    gridColumnGap: '20px'
}

const gridStyle2 ={
    display: 'grid',
    gridTemplateColumns: '4fr 3fr',
    paddingBottom: '12px',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px'
}

const pStyle = {
    margin: '2px',
    fontSize: '16px'
}