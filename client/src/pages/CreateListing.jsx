import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react"
import { app } from "../firebase";


export default function CreateListing() {
    
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
    })
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    
    console.log(formData.imageUrls.length);
    const handleImageSubmit = (e) => {
        if(files.length > 0 && files.length + formData.imageUrls.length < 7){
            setUploading(true);
            setImageUploadError(false);
            const promises = [];
            
            for(let i = 0; i < files.length; i++){
                promises.push(storeImage(files[i]));
            }
            console.log(promises);
            Promise.all(promises).then((urls) => {
                setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)})
                setUploading(false);
                imageUploadError(false);
                
            }).catch((err) => {
                setImageUploadError('Image upload failed(2mb max per image)');
                setUploading(false);
            });
        } else {
            setImageUploadError('You can only upload 6 images per listing.');
            setUploading(false);
        }
    }
    
    const storeImage = async (file) =>{
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            uploadTask.on(
                'state_changed', 
                (snapshot) => {
                  const progress = (snapshot.bytesTransferred/ snapshot.totalBytes * 100)
                },
                (error) =>{
                    setImageUploadError(error.name);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
                )
        })
    }
    
    const handleImageRemove = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        })
    }
    
  return (
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
            Create a Lisitng
        </h1>
        <form className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-4 flex-1">
            
                  <input type="text" placeholder="Name" className="p-3 border rounded-md outline-sky-500" 
                id="name" maxLength='62' minLength='10' required/>
                
                  <textarea type="text" placeholder="Name" className="p-3 border rounded-md outline-sky-500" 
                id="name" required/>
                
                  <input type="text" placeholder="Address" className="p-3 border rounded-md outline-sky-500" 
                id="name" required/>
                
                <div className="flex gap-6 flex-wrap">
                    <div className="flex gap-3">
                        <input type="checkbox" id='sell' className="w-5"/>
                        <span> Sell </span>
                    </div>
                    <div className="flex gap-3">
                        <input type="checkbox" id='rent' className="w-5"/>
                        <span> Rent </span>
                    </div>
                    <div className="flex gap-3">
                        <input type="checkbox" id='parking spot' className="w-5"/>
                        <span> Parking Spot </span>
                    </div>
                    <div className="flex gap-3">
                        <input type="checkbox" id='furnished' className="w-5"/>
                        <span> Furnished </span>
                    </div>
                    <div className="flex gap-3">
                        <input type="checkbox" id='offer' className="w-5"/>
                        <span> Offer </span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-3">
                        <input type="number" id="bedrooms" min='1' max='10' required
                            className="p-3 border border-gray-300 rounded-lg outline-sky-500"
                        />
                        <p>Beds</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="number" id="bathrooms" min='1' max='10' required
                            className="p-3 border border-gray-300 rounded-lg outline-sky-500"
                        />
                        <p>Baths</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="number" id="regularPrice" min='1' max='10' required
                            className="p-3 border border-gray-300 rounded-lg outline-sky-500"
                        />
                        <div className="flex flex-col items-center">
                            <p>Regular Price</p>
                            <span className="text-xs">($ /Month)</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="number" id="discountPrice" min='1' max='10' required
                            className="p-3 border border-gray-300 rounded-lg outline-sky-500"
                        />
                          <div className="flex flex-col items-center">
                            <p>Discounted Price</p>
                            <span className="text-xs">($ /Month)</span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <p className="font-semibold">Images:
                    <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
                </p>
                <div className="flex gap-4">
                    <input  
                    onChange={(e) => setFiles(e.target.files)} 
                    className="p-3 border border-gray-300 rounded w-full" 
                    type="file" 
                    id="images" 
                    accept="images/*"
                    multiple
                    />
                    <button 
                    onClick={handleImageSubmit}
                    disabled= {uploading} 
                    type="button"
                    className="p-3 border border-green-700 rounded uppercase hover:shadow-lg text-green-700 disabled:opacity-80" > {uploading ? 'uploading...': 'upload'}</button>
                </div>
                  <p className="text-red-600 text-sm">{imageUploadError && imageUploadError}</p>
                  {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                    <div key={index} className="flex justify-between p-3 border items-center">
                        <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg" />
                        <button type="button" onClick={() => handleImageRemove(index)} className="text-red-700 uppercase hover:opacity-75">Delete</button>
                    </div>
                    
                  ))}
                <button className="bg-sky-600 p-3 rounded-md text-white uppercase disabled:opacity-60 hover:opacity-80"> create Listing</button>
            </div>
        </form>
     </main>
  )
}
