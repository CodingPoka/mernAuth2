

import React from 'react';
import Navbar from './Navbar';

const Home = () => {
    return (
        <div className='w-full'>
            <Navbar/>
           
           <div className='flex flex-col justify-center items-center mt-5'>
            <h1 className='text-2xl font-bold'>Welcome To My Website</h1>
            <h1 className='text-xl'>This is Home Page</h1>
            <button className='bg-gray-100 px-4 rounded-xl py-1'>Get Started →</button>
           </div>
        </div>
    );
};

export default Home;