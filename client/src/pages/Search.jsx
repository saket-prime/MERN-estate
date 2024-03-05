import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex:row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form className='flex flex-col gap-7'>
                <div className='flex items-center gap-2'>
                
                    <label 
                    className='whitespace-nowrap font-semibold'
                    >Search Term :</label>
                    
                    <input 
                    className='border w-full p-3 rounded-lg'
                    placeholder='Search...' 
                    />
                    
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                
                    <label className='font-semibold'>Type:</label>
                    
                    <div className='flex gap-2'>
                        <input type='checkbox' id= 'all' className='w-5'/>
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                          <input type='checkbox' id= 'rent' className='w-5'/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                          <input type='checkbox' id= 'sell' className='w-5'/>
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                          <input type='checkbox' id= 'offer' className='w-5'/>
                        <span>Offer</span>
                    </div>
                    
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                
                      <label className='font-semibold'>Amenities:</label>
                    
                    <div className='flex gap-2'>
                        <input type='checkbox' id= 'parking' className='w-5'/>
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                          <input type='checkbox' id= 'furnished' className='w-5'/>
                        <span>Furnished</span>
                    </div>                   
                    
                </div>
                <div className='flex gap-2 items-center'>
                      <label className='font-semibold'>Sort:</label>
                    <select className='border rounded-lg p-3'>
                        <option>Price high to low</option>
                        <option>Price low to high</option>
                        <option>Lates</option>
                        <option>Oldest</option>
                    </select>
                </div>
                <button className='bg-sky-700 text text-white p-3 rounded-md uppercase hover:opacity-80'>Search</button>
            </form>
        </div>
        <div>
            <h1 className='text-3xl text-slate-700 font-semibold p-3 border-b mt-5'>Listing results:</h1>
        </div>
    </div>
  )
}
