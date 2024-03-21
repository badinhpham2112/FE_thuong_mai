import React, { useEffect , useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


const googleComponents = () => {   
 
    <GoogleOAuthProvider clientId="454775511451-8q4vm869u40kkuv44fiumsnn06fr8c39.apps.googleusercontent.com">
    <GoogleLogin
      onSuccess={credentialResponse => {
      const decoded = jwt_decode(credentialResponse.credential);
      const {email, name} = decoded;
      // mutation.mutate(email, name);
      console.log(decoded);
    }}
    onError={() => {
      console.log('Login Failed');
    }}
   />
</GoogleOAuthProvider>
    


  
}


export default googleComponents;
