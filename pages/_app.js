import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createContext} from 'react'

export const MyContext = createContext();

const productLists = [
  {
      id: 1,
      name: 'Spiderman Costume',
      image: '/images/superman.jpg',
      code: '0448',
      price: 1400,
      sale_price: 690,
      rating: 4,
  },
  {
      id: 2,
      name: 'Spiderman Costume for kids',
      image: '/images/spiderman.jpg',
      code: '0458',
      price: 1600,
      sale_price: 690,
      rating: 4,
  },
  {
      id: 3,
      name: 'Batman Costume for kids',
      image: '/images/batman.jpg',
      code: '0441',
      price: 1400,
      sale_price: 790,
      rating: 5,
  },
  {
      id: 4,
      name: 'Superman Costume for dogs',
      image: '/images/superman-dog.jpg',
      code: '0248',
      price: 1400,
      sale_price: 890,
      rating: 4.5,
  },
  {
      id: 5,
      name: 'Wonder Women Costume for kids',
      image: '/images/wonderwomen.jpg',
      code: '0243',
      price: 1400,
      sale_price: 790,
      rating: 4,
  },
];


function MyApp({ Component, pageProps }) {
  return (
    <MyContext.Provider value={productLists}>
      <Component {...pageProps} />
    </MyContext.Provider>
  )
  
}

export default MyApp
