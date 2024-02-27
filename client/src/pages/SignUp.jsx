import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch("/api/auth/register", 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await res.json();
    
    if(data.statusCode >=400){
      setLoading(false);
      setError(data.message);
    } else {
      setLoading(false);
      setError(null);
      navigate("/login")
    }
    
  };
  
  return (
    <div className='p-3 flex flex-col my-20 rounded-lg sm:bg-white max-w-lg  mx-auto'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Sign up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      
        <input 
        type = "text" 
        placeholder ="Username" 
        className='border p-3 rounded-lg' 
        id='username'
        onChange={handleChange}></input>
        
        <input 
        type = "email" 
        placeholder ="Email" 
        className='border p-3 rounded-lg' 
        id='email'
        onChange={handleChange}></input>
        
        <input 
        type = "password" 
        placeholder ="Password" 
        className='border p-3 rounded-lg' 
        id='password'
        onChange={handleChange}></input>
        
        <button disabled = {setLoading} className='bg-sky-600 p-3 rounded-lg uppercase text-white
        hover:opacity-90 disabled:opacity-70'>{loading ? "Loading...": "Sign Up"}</button>
        
      </form>
      <div className='flex gap-3 mt-4'>
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-600 my-2'>{error}</p>}
    </div>
  )
}
