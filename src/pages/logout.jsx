import { useEffect } from "react";
import axios from "axios";
import { rootAddress } from "../data";
const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        const refreshToken = sessionStorage.getItem("refresh_token");
        const accessToken = sessionStorage.getItem("access_token");

        // If no refresh token or access token, log out immediately
        if (!refreshToken || !accessToken) {
          console.log("No tokens found, logging out immediately.");
          sessionStorage.removeItem("access_token");
          sessionStorage.removeItem("refresh_token");
          sessionStorage.removeItem("user");
          window.location.href = "/login";
          return;
        }

        // First, try to refresh the access token
        const refreshResponse = await axios.post(
          rootAddress + "token/refresh/",
          { refresh: refreshToken },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.access;
          const newRefreshToken = refreshResponse.data.refresh;

          // Update the access and refresh tokens in sessionStorage
          sessionStorage.setItem("access_token", newAccessToken);
          sessionStorage.setItem("refresh_token", newRefreshToken);

          // Now that we have a valid access token, proceed with the logout
          await axios.post(
            rootAddress + "logout/",
            { refresh_token: newRefreshToken }, // Send the refresh token in the body
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newAccessToken}`, // Use the new access token
              },
              withCredentials: true, // Send cookies if necessary
            }
          );

          // Log the response for debugging
          console.log("Logout successful.");

          // Clear sessionStorage and reset axios default Authorization header
          sessionStorage.removeItem("access_token");
          sessionStorage.removeItem("refresh_token");
          sessionStorage.removeItem("user");
          axios.defaults.headers.common["Authorization"] = "";
        }
        
      } catch (e) {
        console.error("Error during logout:", e.response ? e.response.data : e);
        // If refresh failed, handle it and logout anyway
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("user");
        axios.defaults.headers.common["Authorization"] = "";
        window.location.reload(); // Reload the page to reflect the logout state
        window.location.reload();
        window.history.go(-1);
      }
    })();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;

// import { useEffect } from "react";
// import axios from "axios";

// const Logout = () => {
//   useEffect(() => {
//     // Get the refresh token and access token from sessionStorage
//     const refreshToken = sessionStorage.getItem("refresh_token");
//     const accessToken = sessionStorage.getItem("access_token");
//     console.log(accessToken);
//     console.log(refreshToken);
//     (async () => {
//       try {

//         // If no refresh token or access token, log out immediately
//         if (!refreshToken || !accessToken) {
//           console.log("No tokens found, logging out immediately.");
//           sessionStorage.clear();
//           window.location.href = "/login";
//           return;
//         }

//         // Send the logout request with the refresh token and access token
//         const response = await axios.post(
//           rootAddress + 'logout/',
//           { refresh_token: refreshToken }, // Send the refresh token in the body
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${accessToken}`, // Add Authorization header with the access token
//             },
//             withCredentials: true, // Ensure to send cookies if necessary
//           }
//         );

//         // Log the response for debugging
//         console.log("Logout successful:", response.data);

//         // Clear sessionStorage and reset axios default Authorization header
//         sessionStorage.clear();
//         axios.defaults.headers.common['Authorization'] = '';

//         // Redirect to login page
//         window.location.href = "/login";
//       } catch (e) {
//         console.error("Error during logout:", e.response ? e.response.data : e);
//         if (e.response) {
//           console.error("Response error data:", e.response.data);
//           console.error("Response status:", e.response.status);
//         }

//       }
//     })();
//   }, []); // Only run this on component mount

//   return <div>Logging out...</div>; // You can show a loading spinner or nothing
// };

// export default Logout;

// // import { useEffect } from "react";
// // import axios from "axios";

// // const Logout = () => {
// //   useEffect(() => {
// //     // Define an async function for the logout process
// //     (async () => {
// //       try {
// //         // Get the refresh token from sessionStorage
// //         const refreshToken = sessionStorage.getItem("refresh_token");
// //         console.log(refreshToken);
// //         if (!refreshToken) {
// //           console.log("No refresh token found, logging out immediately.");
// //           sessionStorage.clear();
// //           window.location.href = "/login";
// //           return;
// //         }

// //         // Send the logout request with the refresh token
// //         const response = await axios.post(
// //           rootAddress + 'logout/',
// //           { refresh_token: refreshToken }, // Send the refresh token as the body
// //           {
// //             headers: {
// //               'Content-Type': 'application/json',
// //             },
// //             withCredentials: true, // Ensure to send cookies if necessary
// //           }
// //         );

// //         // Log the response for debugging
// //         console.log("Logout successful:", response.data);

// //         // Clear sessionStorage and reset axios default Authorization header
// //         sessionStorage.clear();
// //         axios.defaults.headers.common['Authorization'] = '';

// //         // Redirect to login page
// //         window.location.href = "/login";
// //       } catch (e) {
// //         console.error("Error during logout:", e.response ? e.response.data : e);
// //       }
// //     })();
// //   }, []); // Only run this on component mount

// //   return <div>Logging out...</div>; // You can show a loading spinner or nothing
// // };

// // export default Logout;

// // // import { useEffect } from "react";
// // // import axios from "axios";

// // // const Logout = () => {
// // //   useEffect(() => {
// // //     // Define an async function for the logout process
// // //     (async () => {
// // //       try {
// // //         // Send the logout request with the refresh token
// // //         const refreshToken = sessionStorage.getItem("refresh_token");
// // //         console.log(refreshToken);
// // //         if (!refreshToken) {
// // //           // If no refresh token, handle the case where it's missing
// // //           console.log("No refresh token found, logging out immediately.");
// // //           sessionStorage.clear();
// // //           window.location.href = "/login";
// // //           return;
// // //         }

// // //         // Send the logout request to the backend
// // //         const { data } = await axios.post(
// // //           rootAddress + 'logout/',
// // //           { refresh_token: refreshToken },
// // //           {
// // //             headers: {
// // //               'Content-Type': 'application/json',
// // //             },
// // //             withCredentials: true, // Make sure to send cookies with credentials if needed
// // //           }
// // //         );

// // //         // Log out process successful: clear sessionStorage and reset headers
// // //         console.log("Logout successful:", data);
// // //         sessionStorage.clear(); // Clear all local storage data
// // //         axios.defaults.headers.common['Authorization'] = ''; // Clear Authorization header
// // //         window.location.href = "/login"; // Redirect to the login page
// // //       } catch (e) {
// // //         // Handle errors
// // //         console.log("Logout not working", e);
// // //       }
// // //     })();
// // //   }, []); // Empty dependency array means this effect runs once when the component mounts

// // //   return <div></div>; // You can display a loading spinner or nothing here
// // // };

// // // export default Logout;

// // // // import {useEffect, useState} from "react"
// // // // import axios from "axios";
// // // // const Logout = () => {
// // // //     useEffect(() => {
// // // //        (async () => {
// // // //          try {
// // // //            const {data} = await
// // // //                  axios.post(rootAddress + 'logout/',{
// // // //                  refresh_token:sessionStorage.getItem('refresh_token')
// // // //                  } ,{headers: {'Content-Type': 'application/json'}},
// // // //                  {withCredentials: true});
// // // //            sessionStorage.clear();
// // // //            axios.defaults.headers.common['Authorization'] = null;
// // // //            window.location.href = '/login'
// // // //            } catch (e) {
// // // //              console.log('logout not working', e)
// // // //            }
// // // //          })();
// // // //     }, []);
// // // //     return (
// // // //        <div></div>
// // // //      )
// // // // }
// // // // export default Logout;
