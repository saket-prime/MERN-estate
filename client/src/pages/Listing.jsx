import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'


export default function Listing() {
    
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
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
          {listing && !loading && !error && 
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
            </div>
          }
    </main>
  )
}
