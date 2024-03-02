import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { updateStart, updateSuccess, updateFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from "../app/user/userSlice";

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
  
  const handleDeleteUser = async (e) => {
    
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
  
  
  
    
  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl font-semibold text-center">Profile</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e) =>setFile(e.target.files[0]) } type="file" ref={imgRef} hidden accept="image/*"/>
        <img onClick={() => imgRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
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
        <button disabled ={loading} className="bg-sky-600 text-white uppercase p-3 rounded-md hover:opacity-80 disabled:opacity-50">
          {loading ? "Loading..." : "update"}
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer font-medium">Delete account</span>
        <span className="text-red-700 cursor-pointer font-medium">Sign out</span>
      </div>
      {error && <p className='text-red-600 '>{error}</p>}
      {sucessUpdate && <p className='text-green-600 my-5'>User updated successfully !!</p>}
    </div>
  )
}
