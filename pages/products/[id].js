import {useRouter} from 'next/router'
import { useContext, useState, useEffect } from 'react';
import {MyContext} from '../_app'
import { Container } from 'react-bootstrap';
import Header from '../../components/Header'
import Image from 'next/image'

export default function SingleProduct(){

    const router = useRouter();
    const {id} = router.query
    const productData = useContext(MyContext);

    return (
        <div>
            <Header/>
            {
                productData.map(product=>(
                    product.id == id ?
                    <Container key={product.id}>
                        <Image src={product.image} width='600' height='400'/>
                        <h2>{product.name}</h2>
                        <p>Code: <span style={{fontWeight: 'bold'}}>{product.code}</span></p>
                        <p>Price: <span style={{fontWeight: 'bold'}}>{product.price}</span></p>
                        <p>Sale Price: <span style={{fontWeight: 'bold'}}>{product.sale_price}</span></p>
                        <p>Rating: <span style={{fontWeight: 'bold'}}>{product.rating}</span></p>
                    </Container>
                    : null
                ))
            }
        </div>
    )

}
