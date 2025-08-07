import axios from "axios";

// To ensure only one refresh happens at a time
let isRefreshing = false;
let subscribers = [];

const onTokenRefreshed = (newAccessToken) => {
  subscribers.forEach((callback) => callback(newAccessToken));
  subscribers = [];
};

const addSubscriber = (callback) => {
  subscribers.push(callback);
};

axios.interceptors.response.use(
  (response) => response, // For successful responses, just return the response
  async (error) => {
    // Handle token refresh on 401 error
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        // If there's no refresh token, redirect to login
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If a refresh request is in progress, add the current request to the subscribers queue
        return new Promise((resolve) => {
          addSubscriber((newAccessToken) => {
            // Set the new access token to the Authorization header
            error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            resolve(axios(error.config)); // Retry the original request
          });
        });
      }

      isRefreshing = true;

      try {
        // Send request to refresh the access token using the refresh token
        const response = await axios.post(
          rootAddress + "token/refresh/",
          { refresh: refreshToken },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, // Include credentials in the request
          }
        );

        if (response.status === 200) {
          // Save the new tokens
          const newAccessToken = response.data.access;
          const newRefreshToken = response.data.refresh;

          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          localStorage.setItem('access_token', newAccessToken);
          localStorage.setItem('refresh_token', newRefreshToken);

          // Retry all requests that failed due to 401 using the new token
          onTokenRefreshed(newAccessToken);

          // Retry the original request with the new token
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        // If the refresh token fails (e.g., expired refresh token), clear the localStorage and redirect to login
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // If it's not a 401 or refresh attempt fails, return the error
    return Promise.reject(error);
  }
);



// import axios from "axios";

// let refresh = false;

// axios.interceptors.response.use(
//   (resp) => resp, // For successful responses, just return the response
//   async (error) => {
//     // Handle token refresh on 401 error
//     if (error.response.status === 401 && !refresh) {
//       refresh = true;

//       const refreshToken = localStorage.getItem('refresh_token');
//       console.log(refreshToken); // This logs the refresh token for debugging
      
//       try {
//         // Send request to refresh token
//         const response = await axios.post(
//           rootAddress + "token/refresh/',
//           { refresh: refreshToken },
//           {
//             headers: { 'Content-Type': 'application/json' },
//             withCredentials: true, // Include credentials in the request
//           }
//         );

//         if (response.status === 200) {
//           // Save the new tokens
//           axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
//           localStorage.setItem('access_token', response.data.access);
//           localStorage.setItem('refresh_token', response.data.refresh);
          
//           // Retry the original request with the new token
//           return axios(error.config);
//         }
//       } catch (refreshError) {
//         // If token refresh fails, return the original error
//         console.error('Token refresh failed', refreshError);
//         return Promise.reject(refreshError);
//       } finally {
//         refresh = false;
//       }
//     }

//     // If it's not a 401 or refresh attempt fails, return the error
//     return Promise.reject(error);
//   }
// );
