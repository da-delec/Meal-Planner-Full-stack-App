import React from 'react'

const Loader = () => {
  return (
    <div className=' absolute h-screen w-screen flex justify-center bg-gray-950 items-center'>
      <div className=' flex flex-col items-center justify-center h-40 w-60 bg-gray-800 rounded-md'>
         <h1 className=' text-white'>Your data is loading...</h1>
         <span className='loading bg-primary loading-infinity loading-lg'></span>
      </div>
    </div>
  )
}

export default Loader
