import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';
import { useSelector } from "react-redux";
import Contact from "../components/Contact";


export default function Listing() {
    
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contact, setContact] = useState(false);
    const {currentUser} = useSelector((state) => state.user)
    const [copied, setCopied] = useState(false);
    
    useEffect(() => {
        
        try {
            const fetchListing = async () => {
                setLoading(true);
                setError(false);
                const listingId = params.listingId;
                console.log(listingId);
                const res = await fetch(`/api/listing/${listingId}`);
    
                const data = await res.json(); 
                if(data.statusCode >= 400){
                    setError(data.message);
                    setLoading(false);
                }
                setListing(data);
                setLoading(false);
            }
            fetchListing();
        } catch (error) {
            setError(error.message);
        }
        
    }, [])
    
    
  return (
    <main>
        {loading && <p className="text-center my-10 text-2xl">Loading...</p>}
          {error && <p className="text-center my-10 text-2xl">Something went wrong!!</p>}
          {listing && !loading && !error && (
            <div>
                <Swiper navigation>
                    {listing.imageUrls.map((url) => (
                        <SwiperSlide key={url}>
                            <div
                                className="h-[500px]"
                                style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                    <FaShare
                    className="text-sky-500"
                    onClick={()=>{
                        navigator.clipboard.writeText(window.location.href);
                        setCopied(true);
                        setTimeout(() => {
                            setCopied(false);
                        }, 2000);
                    }} />
                </div>
                {copied && (
                    <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">Link copied!</p>
                )}
                <div className="flex flex-col p-3 my-7 max-w-4xl mx-auto gap-4">
                    <p className="text-2xl font-semibold">
                        {listing.name} - ${' '}
                        {listing.offer
                        ? listing.discountedPrice.toLocaleString('en-US')
                        : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                    </p>
                    <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                          <FaMapMarkerAlt className='text-green-700' />
                          {listing.address}
                    </p>
                    <div className="flex gap-4">
                        <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                            {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </p>
                        {
                            listing.offer && (
                                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">${(+listing.regularPrice - +listing.discountedPrice).toLocaleString('en-US')} Discount</p>
                            )
                        }
                        
                    </div>
                    <p className="text-slate-800">
                        <span className="font-semibold text-black">Description - {' '}</span> {listing.description}
                    </p>
                    <ul className="flex flex-wrap items-center font-semibold text-sm text-green-900 gap-4 sm: gap-6">
                        <li className="flex items-center gap-1 whitespace-nowrap">
                            <FaBed className="text-lg"/>
                            {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                        </li>
                        <li className="flex items-center gap-1 whitespace-nowrap">
                            <FaBath className="text-lg"/>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bedrooms} bath`}
                        </li>
                        <li className="flex items-center gap-1 whitespace-nowrap">
                            <FaParking className="text-lg"/>
                            {listing.parking ? "Parking" : 'No Parking'}
                        </li>
                        <li className="flex items-center gap-1 whitespace-nowrap">
                            <FaChair className="text-lg"/>
                            {listing.furnished ? "Furnished" : 'Not Furnished'}
                        </li>
                    </ul>
                    {currentUser && listing.userRef !== currentUser._id && !contact && (
                        
                    <button onClick={() => setContact(true)} className="bg-slate-700 text-white uppercase rounded-md hover:opacity-80 p-3">Contact Landlord</button>
                    )}
                    
                    {contact && <Contact listing = {listing}/>}
                    
                </div>
                
                
            </div>)
          }
    </main>
  )
}
