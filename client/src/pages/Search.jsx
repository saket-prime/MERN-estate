import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem';

export default function Search() {
    
    const navigate = useNavigate();
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    
    useEffect(() => {
       
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
        
        if(
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl 
        ) {
            setSidebarData(
                {
                    searchTerm: searchTermFromUrl || '',
                    type: typeFromUrl || 'all',
                    parking: parkingFromUrl === 'true' ? true : false,
                    furnished: furnishedFromUrl === 'true' ? true : false,
                    offer: offerFromUrl === 'true' ? true : false,
                    sort: sortFromUrl || 'created_at',
                    order: orderFromUrl || 'desc',
                }
            )
        }
    
        const fetchListings = async () => {
            
            setLoading(true);
            const searchQuery = urlParams.toString()
            const res = await fetch(`/api/listing?${searchQuery}`);
            const data = await res.json();
            
            if(data.statusCode >= 400){
                console.log(data.message);
            }
            setLoading(false);
            setListings(data);
            if(data.length > 8){
                setShowMore(true);
            } else{
                setShowMore(false);
            }
            
        }
        fetchListings();
      
    }, [location.search])
    
    
      
    
    const handleChange = (e) => {
         
        if(e.target.id === 'rent' || e.target.id === 'sell' || e.target.id === 'all'){
            setSidebarData({
                ...sidebarData,
                type: e.target.id
            })
        }
        if(e.target.id === 'furnished' || e.target.id === 'parking' || e.target.id === 'offer'){
            setSidebarData({
                ...sidebarData,
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false
            })
        }
        
        if(e.target.id === 'searchTerm') {
            setSidebarData({
                ...sidebarData,
                searchTerm: e.target.value,
            })
        }
        
        if(e.target.id === "sort_order"){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebarData({
                ...sidebarData,
                sort, order,
            })
        }
        
        
    }
    
    const handleSubmit =(e) => {
        e.preventDefault();
        
        const urlParams  = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
        
    }
    
    const onShowMoreClick = async () => {
        
        const urlParams = new URLSearchParams(location.search);
        const startIndex = listings.length;
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing?${searchQuery}`)
        const data = await res.json();
        if(data.length < 9){
            setShowMore(false);
        }
        setListings([...listings, ...data]);
    }
    
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 md:w-1/4 border-b-2 md:border-r-2 md: border-sky-200 md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
                <div className='flex items-center gap-2'>
                
                    <label 
                    className='whitespace-nowrap font-semibold'
                    >Search Term :</label>
                    
                    <input 
                    className='border w-full p-3 rounded-lg'
                    id='searchTerm'
                    placeholder='Search...' 
                    value={sidebarData.searchTerm}
                    onChange={handleChange}
                    />
                    
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                
                    <label className='font-semibold'>Type:</label>
                    
                    <div className='flex gap-2'>
                        <input 
                        type='checkbox' id= 'all' 
                        className='w-5'
                        checked={sidebarData.type === 'all'}
                        onChange={handleChange}
                        />
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                        type='checkbox' 
                        id= 'rent' 
                        className='w-5'
                              checked={sidebarData.type === 'rent'}
                              onChange={handleChange}
                        />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                          <input 
                          type='checkbox' 
                          id= 'sell' 
                          className='w-5'
                              checked={sidebarData.type === 'sell'}
                              onChange={handleChange}
                          />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                          <input 
                          type='checkbox' 
                          id= 'offer' 
                          className='w-5'
                              checked={sidebarData.offer}
                              onChange={handleChange}
                          />
                        <span>Offer</span>
                    </div>
                    
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                
                      <label className='font-semibold'>Amenities:</label>
                    
                    <div className='flex gap-2'>
                        <input type='checkbox' id= 'parking' className='w-5'
                              checked={sidebarData.parking }
                              onChange={handleChange}
                        />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                          <input type='checkbox' id= 'furnished' 
                          className='w-5'
                              checked={sidebarData.furnished}
                              onChange={handleChange}
                          />
                        <span>Furnished</span>
                    </div>                   
                    
                </div>
                <div className='flex gap-2 items-center'>
                      <label className='font-semibold'>Sort:</label>
                    <select 
                    onChange={handleChange}
                    defaultValue={'created_at_desc'}
                    id='sort_order'
                    className='border rounded-lg p-3'>
                        <option value='regularPrice_desc'>Price high to low</option>
                        <option value='regularPrice_asc'>Price low to high</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </select>
                </div>
                <button className='bg-sky-700 text text-white p-3 rounded-md uppercase hover:opacity-80'>Search</button>
            </form>
        </div>
        <div className='p-3 w-3/4'>
            <h1 
            className='text-3xl text-slate-700 font-semibold p-3 border-b border-sky-300 mt-5'>
            Listing results:
            </h1>
            <div className='p-7 flex flex-wrap gap-4'>
            {loading && (
                      <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
            )}
            {!loading && listings.length === 0 && (
                <p className='text-xl text-slate-700 text-center '> No Listings Found!!</p>
            )}   
            { !loading && listings && listings.map((listing) => (
                <ListingItem key={listing._id} listing ={listing}/>
            ))} 
            {showMore && (
                <button 
                onClick={onShowMoreClick}
                className='text-green-700 hover: underline w-full text-center p-7'
                >
                Show More</button>
            )}
            </div>
        </div>
    </div>
  )
}
