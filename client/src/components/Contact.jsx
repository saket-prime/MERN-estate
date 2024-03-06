import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        
        const fetchLandlord = async() => {
            
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                if(data.statusCode >= 400){
                    console.log(data.message);
                }
                setLandlord(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
            
        }
        fetchLandlord();
        
    }, [listing.userRef])
    
    const onChange = (e) => {
        setMessage(e.target.value);
    }
    
  return (
    <div>
        {landlord && (
             <div className='flex flex-col gap-2'>
                  <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
                  <textarea 
                    name='message'
                    id='message'
                    rows='2'
                    value={message}
                    onChange={onChange}
                    placeholder='Enter your message here...'
                    className='w-full border p-3 rounded-lg'
                  />
                  
                  <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                  className='bg-slate-700 p-3 text-white text-center uppercase rounded-lg hover:opacity-80'>
                    Send Message
                  </Link>
             </div>
             
        )}
    </div>
  )
}
