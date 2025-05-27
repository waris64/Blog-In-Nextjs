import React from 'react';
import Header from '../components/Header'
import AllBlogs from '../components/AllBlogs';
const App = () => {
  return (
    <div>
      <Header image='https://www.w3schools.com/favicon.ico' />
      <AllBlogs />
    </div>
  )
}

export default App