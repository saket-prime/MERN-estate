import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { 
  updateStart, 
  updateSuccess, 
  updateFailure, 
  deleteUserFailure, 
  deleteUserStart, 
  deleteUserSuccess, 
  signoutUserFailure,
  signoutUserStart,
  signoutUserSuccess, } from "../app/user/userSlice";
import {Link} from 'react-router-dom';

export default function Profile() {
  
  const imgRef = useRef(null);
  const { currentUser } = useSelector(state => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [sucessUpdate, setSuccessUpdate] = useState(false);
  const dispatch = useDispatch();
  const [showListingsErr, setShowListingsErr] = useState(false);
  const [userListings, setUserListings] = useState([]);
  
  useEffect(()=> {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);
  
  
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({...formData, avatar: downloadURL})
      });
    });
    
  }
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      console.log(data);
      
      if (data.statusCode >= 400) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setSuccessUpdate(true);
      }
      
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  }
  
  const handleDeleteUser = async () => {
    
    try {
      dispatch(deleteUserStart());
      const result = await fetch(`api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      
      const data = await result.json();
      console.log(data);
      
      
      if (data.statusCode == 200) {
        dispatch(deleteUserSuccess());
      } else {
        dispatch(deleteUserFailure(data.message));
      }
      
      
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleLogoutUser = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch('/api/auth/signout')
      
      const data = await res.json();
      
      if(data.statusCode >= 400){
        dispatch(signoutUserFailure(data.message));
      }
      dispatch(signoutUserSuccess());
      
    } catch (error) {
      dispatch(signoutUserFailure(error.message))
    }
  }
  
  const handleShowListings = async () =>{
    try {
      setShowListingsErr(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      
      const data = await res.json();
      setUserListings(data);
      
      if(res.statusCode >= 400){
        setShowListingsErr(true);
      }
    } catch (error) {
      setShowListingsErr(true);
    }
    
  }
  
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`,{
        method: 'DELETE',
      });
      
      const data = res.json();
      if(data.statusCode >= 400){
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
      
    } catch (error) {
      console.log(error.message);
    }
  }
  
    
  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl font-semibold text-center">Profile</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
        onChange={(e) =>setFile(e.target.files[0]) } 
        type="file" 
        ref={imgRef} 
        hidden 
        accept="image/*"/>
        
        <img 
        onClick={() => imgRef.current.click()} 
          src={currentUser.avatar || formData.avatar} 
        alt="profile" 
        className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" 
          
        />
        
        <p className="text-sm self-center">
          {fileUploadError ? 
          (<span className="text-red-700">Error file upload (file must be an image and less than 2mb)</span>)
          : filePerc === 100 ? 
          (<span className="text-green-700">Image successfully uploaded!</span>)
          : ('')
           }
        </p>
        <input onChange={handleChange} type="text" id = "username" defaultValue={currentUser.username} placeholder="username" className="border rounded-md p-3"/>
        <input onChange={handleChange} type="text" id="email" defaultValue={currentUser.email} placeholder="email" className="border rounded-md p-3"/>
        
        <input onChange ={handleChange} type="password" id = "password" placeholder="password" className="border rounded-md p-3"/>
        <button disabled ={loading} className="bg-sky-600 text-white uppercase p-3 rounded-md hover:bg-sky-700 disabled:opacity-50">
          {loading ? "Loading..." : "update"}
        </button>
        <Link className = "bg-green-600 text-white p-3 text-center uppercase rounded-md hover:bg-green-700" to={'/create-listing'}>Create listing</Link>
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer font-medium">Delete account</span>
        <span onClick={handleLogoutUser} className="text-red-700 cursor-pointer font-medium">Sign out</span>
      </div>
      {error && <p className='text-red-600 '>{error}</p>}
      {sucessUpdate && <p className='text-green-600 my-5'>User updated successfully !!</p>}
    <button onClick={handleShowListings} className="text-green-700 uppercase font-medium w-full">Show listings</button>
    {showListingsErr && <p className="text-red-700 mt-5 text-sm">Error showing listings</p>}
    
    {userListings && userListings.length > 0 &&
      <div className="flex flex-col gap-4">
        <p className="self-center text-2xl my-7 font-semibold">Your Listings</p>
        {userListings.map((listing) => (
          <div key={listing._id} className="flex p-3 border rounded-lg bg-sky-200 items-center justify-between gap-3">
            <Link to={`/listing/${listing._id}`}>
              <img className="w-16 h-16 object-contain" alt="listing-cover" src={listing.imageUrls[0]} />
            </Link>
            <Link to={`/listing/${listing._id}`} className="text-slate-700 truncate hover:underline font-semibold flex-1">
              <p>{listing.name}</p>
            </Link>
            <div className="flex flex-col">
              <button onClick={() => handleListingDelete(listing._id)} className="text-red-600">Delete</button>
              <Link to={`/update-listing/${listing._id}`}><button className="text-green-600">Edit</button></Link>
            </div>
          </div>
          
        ))}
      </div>
    }
    </div>
  )
}
