import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  
  const { currentUser } = useSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  
  useEffect(() => {
    
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }    
  },[location.search]);
  
  
  return (
    <header className='bg-sky-300 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold text-xl sm:text-2xl flex flex-wrap'>
                <span className='text-sky-700'>Apple</span>
                <span className='text-sky-950'>Estate</span>
            </h1>
            </Link>
            <form onSubmit={handleSubmit} className='bg-sky-200 p-3 rounded-md flex items-center'>
                <input 
                type='text' 
                placeholder='Search...' 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className='bg-transparent focus:outline-none  w-24 sm:w-64'/>
                <button>
                  <FaSearch className='text-sky-950 '/>
                </button>
            </form>
            <ul className='flex gap-4'>
                  <Link to='/'><li className='font-medium hidden text-xl sm:inline  text-sky-700 hover:underline'>Home</li></Link>
                  <Link to='/about'><li className='font-medium text-xl hidden sm:inline  text-sky-700 hover:underline'>About</li></Link>
                  <Link to='/profile'>
                  {currentUser
                  ? (<img src={currentUser.avatar} className = "rounded-full object-cover h-8 w-8" alt="profile" />) 
                  : (<li className='font-medium text-xl text-sky-700 hover:underline'>Sign in</li>)}
                  </Link>
            </ul>
        </div>
        
            
    </header>
  )
}
