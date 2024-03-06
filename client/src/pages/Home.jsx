import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'
import ListingItem from '../components/ListingItem';

export default function Home() {
  
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  
  console.log(saleListings);
  useEffect(() => {
    
    const fetchOfferListings = async () => {
      try {
        
        const res = await fetch('/api/listing?offer=true&limit=4')
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        
        console.log(error);
        
      }
    }
    
    fetchOfferListings();
    
  }, [])
  
  const fetchRentListings = async () => {
    try {
      
      const res = await fetch('/api/listing?type=rent&limit=4')
      const data = await res.json();
      setRentListings(data);
      fetchSaleListings();
      
    } catch (error) {
      console.log(error);
    }
  }
  
  const fetchSaleListings = async () => {
    try {
      
      const res = await fetch('/api/listing?type=sell&limit=4')
      const data = await res.json();
      setSaleListings(data);
      
    } catch (error) {
      console.log(error);
    }
  }
  
  
  return (
    <div>
      
      <div className='flex flex-col p-28 px-3 gap-6 max-w-6xl mx-auto '>
        
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br/>
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-base'>
          Apple Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to chhose from.
        </div>
        
        <Link to={'/search'} className='text-xs w-28 sm: text-sm text-blue-800 font-bold hover:underline'> Let's get started...</Link>
        
      </div>
      
      {/* {swiper} */}
      
      <div>
      <Swiper navigation>
        
        {offerListings && offerListings.length > 0 && (
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[500px]"
                style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover' }}>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
        
      </div>
      
      <div className='max-w-[1400px] mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl text-slate-600 font-semibold'> Recent offers </h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}> Show more offers</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  offerListings.map((listing)=>(
                    <ListingItem key={listing._id} listing={listing} />
                  ))
                }
              </div>
            </div>
          )
        }
        
        {
          rentListings && rentListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl text-slate-600 font-semibold'> Recent places for rent </h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}> Show more places for rent</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  rentListings.map((listing)=>(
                    <ListingItem key={listing._id} listing={listing} />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div >
              <div className='my-3'>
                <h2 className='text-2xl text-slate-600 font-semibold'> Recent places on sale </h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sell'}> Show more places on sale</Link>
              </div>
              <div className='flex mx-auto flex-wrap gap-4'>
                {
                  saleListings.map((listing)=>(
                    <ListingItem key={listing._id} listing={listing} />
                  ))
                }
              </div>
            </div>
          )
        }
        
      </div>
      
      
      
    </div>
  )
}
