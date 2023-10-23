// import React, { useState } from "react";
// import axios from "axios";


// const Login = () => {
//     const [formData, setFormData] = useState({
//       mobileNumber: "",
//       password: "",
     
//     });
   
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({ ...formData, [name]: value });
//     };
   
//     const handleSubmit = async (e) => {
//       e.preventDefault();
   
//       try {
//         const response = await axios.get("http://localhost:8080/signUpProcess/login", formData);
//         console.log(response);
//       } catch (error) {
//         console.error(error);
//       }
//     };
   
//     return (
//         <div style={{
//             backgroundColor: "darkblue",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "column",
//             border: "5px solid lightblue", // Highlighted border
//           }}>
//             <div style={{
//               backgroundColor: "white",
//               padding: "20px",
//               borderRadius: "10px",
//               boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "stretch",
//               height: "450px", // Increase the box length
//               width: "300px",
//               margin: "10px",
//             }}>
//               <h1>Login</h1>
//               <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//                 <label>
//                   Mobile Number:
//                   <input
//                     type="text"
//                     name="mobileNumber"
//                     placeholder="Enter your mobile number"
//                     value={formData.mobileNumber}
//                     onChange={handleChange}
//                     style={{ color: "lightgrey" }} // Lighter placeholder color
//                   />
//                 </label>
//                 <label>
//                   Password:
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Enter your password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     style={{ color: "lightgrey" }} // Lighter placeholder color
//                   />
//                 </label>
//                 <button type="submit" style={{ backgroundColor: "lightgreen", width: "100px", fontSize: "16px" }}>login</button> {/* Smaller button */}
//               </form>
//             </div>
//           </div>
          
//     );
//    };
//    export default Login;