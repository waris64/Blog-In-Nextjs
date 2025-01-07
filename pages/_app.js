import { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import '../styles/global.css';
export default function App({ Component, pageProps }) {
  useEffect(()=>{
    const token  = localStorage.getItem('token');
    if(token){
      const decode = decode(token);
      console.log("user role : ", decode.role)
    }
  },[])
  return <Component {...pageProps} />;
}
