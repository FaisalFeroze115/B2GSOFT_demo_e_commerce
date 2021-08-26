import React, {useState, useEffect} from 'react'
import Link from 'next/link'

const Header = ({itemCount}) => {
    const[cartCount, setCartCount] = useState(0);

    useEffect(()=>{
        const saved = localStorage.getItem("cart");
        if(saved && saved.length > 0){
        const myCart = JSON.parse(saved);
        setCartCount(myCart.length);
        }
    },[])

    return (
        <div style={headerStyle}>

            <Link href='/'>
                <a style={{textDecoration: 'none', color: '#000'}}>B2GSOFT</a> 
            </Link>

            <Link href='/my_cart'>
                <a style={{textDecoration: 'none', color: '#000', position: 'relative'}}>
                    My Cart <span style={countStyle}>{itemCount ? itemCount : cartCount}</span> 
                </a> 
            </Link>
        </div>
    )
}

export default Header

const headerStyle = {
    padding: '20px 50px',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '25px'
}

const countStyle = {
    position: 'absolute',
    top: '-13px',
    left: '-17px',
    backgroundColor: '#de951af5',
    padding: '2px',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
}
