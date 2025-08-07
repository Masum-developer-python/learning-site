import React, { useState, useEffect} from 'react';
export function UserNavigation() {
   const user = sessionStorage.getItem("user");
   const [isAuth, setIsAuth] = useState(false);
   useEffect(() => {
     if (sessionStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
        console.log(isAuth);
      }
    }, [isAuth]);
     return ( 
    
        <li >    
          
          {/* <li className="m-auto">  */}
          {isAuth ? <a href="/home">{user}</a> : null}
          <br />
          {/* </li><li> */}
          {isAuth ? <a href="/logout">Logout</a> :  
                    <a href="/login">Login</a>}
          {/* </li> */}
           
        </li>
       
     );
}