import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../app/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const googleAuthHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            console.log(result);
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photourl: result.user.photoURL,
                }),
            });
            
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate("/");
            
        } catch (error) {
            console.log("Could not sign in with google", error);
        }
       
        
    }
    
  return (
    <button onClick={googleAuthHandler} type='button' className='bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-70'>Continue with Google</button>
  )
}
