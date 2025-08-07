import { useEffect, useState } from "react";
import axios from "axios";
import { rootAddress } from "../data";
// Define the Login function.
export default function Home() {
  const [message, setMessage] = useState("0");
  const user = sessionStorage.getItem("user");
  console.log(user);
  useEffect(() => {
    // Check if the access token exists in sessionStorage
    const refreshToken = sessionStorage.getItem("refresh_token");
    const accessToken = sessionStorage.getItem("access_token");
    console.log(accessToken);
    console.log(refreshToken);
    if (accessToken === null) {
      // Redirect to login page if no access token is found
      window.location.href = "/login";
      console.log("Access token not found, redirecting to login");
    } else {
      // Send request with the access token
      (async () => {
        try {
          const { data } = await axios.get(
            rootAddress + "home/",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`, // Send the token here
              },
            }
          );
          console.log("Message from server:", data.message); // Log response message
          setMessage(data.message); // Assuming the server response has 'message'
          window.location.reload(); // Reload the page to reflect the new state
          window.location.reload();
          window.history.go(-2);
        } catch (e) {
          if (e.response && e.response.status === 401) {
            // Unauthorized: Redirect to login
            console.log("Not authorized, redirecting to login");
            window.location.href = "/login";
          } else {
            console.log("Error:", e);
          }
        }
      }
    )();
    }
  }, []);

  return (
    <div className="form-signin mt-5 text-center font-bangla">
      <h3>Hi {user}, {message}</h3>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import axios from "axios";

// // Define the Login function.
// export default function Home() {
//   const [message, setMessage] = useState("0");
//   console.log(sessionStorage.getItem("access_token"));

//   useEffect(() => {
//     // Redirect to login if there is no access token
//     if (sessionStorage.getItem("access_token") === null) {
//       window.location.href = "/login";
//       console.log('access token not found ,redirect to login');
//     } else {
//       // Send request with the access token
//       (async () => {
//         try {
//           const { data } = await axios.get(
//             rootAddress + "home/",
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${sessionStorage.getItem("access_token")}`, // Send the token here
//               },
//             }
//           );
//           setMessage(data.message); // Assuming the server response has 'message'
//           console.log(message);
//         } catch (e) {
//           console.log("Not authorized", e); // Log the error in case of 401 or other errors
//         }
//       })();
//     }
//   }, []);

//   return (
//     <div className="form-signin mt-5 text-center">
//       <h3>Hi {message}</h3>
//     </div>
//   );
// }
