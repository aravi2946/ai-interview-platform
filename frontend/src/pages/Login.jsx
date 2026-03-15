import GoogleLoginButton from "../components/GoogleLoginButton"
import axios from "axios"


const Login = () => {

    const handleGoogleSuccess = async ({ credential }) => {
        
        try {
            
            const res = await axios.post('http://localhost:3000/api/auth/google', { credential })
        
            const { token, user } = res.data;
            
            if (token) {
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                window.location.href = "/dashboard"
            } else {
                console.error("Token not received");
                
            }
        }catch(error) {
            console.error("Google Authentication Failed",error);
            
        }
    }
  return (
      <div style={{display:'grid',placeItems:"center",height:"100vh"}}>
          <div>
              <h2>Sign in to continue</h2>
              <GoogleLoginButton onSuccess={handleGoogleSuccess}/>

              
          </div>
      
    </div>
  )
}

export default Login
