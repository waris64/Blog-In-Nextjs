import React from 'react';
const Header = (props) => {
    return (
          <div className='flex justify-around w-full items-center py-2  border sticky top-0'>
            <div className='bg-red-50 '>
               <img src={props.image} alt="w3school" />
            </div>
            <div>
                <nav className='decoration-none flex list-none gap-5 items-center ' >
                    <li className='hover:scale-105'><a href="#">Home</a></li>
                    <li className='hover:scale-105'><a href="#">Blog</a></li>
                    <li className='hover:scale-105'><a href="#">About</a></li>
                    <li className='hover:scale-105'><a href="#">Contact</a></li>
                </nav>
            </div>
          </div>
    )
}

export default Header;