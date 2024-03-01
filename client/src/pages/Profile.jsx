import { useSelector } from "react-redux"

export default function Profile() {
  
  const { currentUser } = useSelector(state => state.user);
    
  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl font-semibold text-center">Profile</h1>
      
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        <input type="text" id = "username" placeholder="username" className="border rounded-md p-3"/>
        <input type="text" id = "email" placeholder="email" className="border rounded-md p-3"/>
        <input type="text" id = "password" placeholder="password" className="border rounded-md p-3"/>
        <button className="bg-sky-600 text-white uppercase p-3 rounded-md hover:opacity-80 disabled:opacity-50">Submit</button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer font-medium">Delete account</span>
        <span className="text-red-700 cursor-pointer font-medium">Sign out</span>
      </div>
    </div>
  )
}
