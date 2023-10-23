import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignUpPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showNextPage, setshowNextPage] = useState(false);
  // State for the signup form
  const [formData, setFormData] = useState({
    mobileNumber: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    userCaptcha:'',
    generatedCaptcha:'',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  function generateRandomCaptcha(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let captcha = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        captcha += characters.charAt(randomIndex);
      }
      return captcha;
    }
  const [captcha, setCaptcha] = useState(generateRandomCaptcha(6));
  const [userCaptcha, setUserCaptcha] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleCaptchaRefresh = () => {
    setCaptcha(generateRandomCaptcha(6));
    formData.generatedCaptcha(captcha);
    setUserCaptcha("");
    setIsCaptchaValid(false);
  };

  const handleCaptchaChange = (e) => {
    setUserCaptcha(e.target.value);
    if (e.target.value.toLowerCase() === captcha.toLowerCase()) {
      setIsCaptchaValid(true);
    } else {
      setIsCaptchaValid(false);
    }
  };
  const handleSubmitNew = async (e) => {
    e.preventDefault();
    if (!isCaptchaValid) {
      alert("CAPTCHA is incorrect. Please try again.");
      return;
    }
    
  

    try {
      // Continue with form submission and API call
      const response = await axios.post("http://localhost:8080/signUpProcess/validationCheck", formData);
      console.log('Signup response:', response);
      toast.success(response);
      // Add logic to handle the signup response from the backend here
    } catch (error) {
      if(error.response){
        const errorMessage=error.response.data;
        toast.error(errorMessage);
      }else{
        toast.error("Something went wrong!");
      }
    }

    console.log('Sign up form data:', formData);
  };

  // Handle signup form submission
  const handleSubmit = async  (e) => {
    e.preventDefault();
    if (!formData.mobileNumber || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all required fields.');
      return;
    }
    if(!formData.password.match(formData.confirmPassword)){
      alert('password did not match with confirm password');
      return;
    }
    if(!formData.mobileNumber.replace(/\D/g, '')){
      alert('enter only numbers');
      return;
    }
    if(formData.mobileNumber.length>10){
      formData.mobileNumber=formData.mobileNumber.slice(0,10);
    }
    // Implement your signup logic here, e.g., sending data to the backend API
    try {
      const response =  await axios.post("http://localhost:8080/signUpProcess/signUp", formData);
      toast.success("User successfully created");
      console.log('Signup response:', response);

       setFormData({
        mobileNumber: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
      });
       setShowLogin(true);
    } catch (error) {
      if(error.response){
        const errorMessage = error.response.data;
        toast.error(errorMessage);
      }else if(error.request){
        toast.error('No response from the server')
      }
      else{
        toast.error('Signup failed. Please try again');
      }

      console.error('Signup error:', error);
    
    }
  };

  // State for the login form
  const [loginData, setLoginData] = useState({
    mobileNumber: '',
    password: '',
  });
  // const handleChange2 = (e) => {
  //   const { name, value } = e.target;
  //   setLoginData({
  //     ...loginData,
  //     [name]: value,
  //   });
  // };


  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    // Implement your login logic here, e.g., sending login data to the backend API
    try {
      const response =  await axios.post("http://localhost:8080/signUpProcess/logIn", loginData);
      console.log('login response:', response);
      toast.success("login success")
      // Add logic to handle the signup response from the backend here
    } catch (error) {
      if(error.response){
        const errorMessage=error.response.data;
        toast.error(errorMessage);

         }else if(error.request){
            toast.error('No response from the server')
          }
       else{
        toast.error('Signup failed. Please try again');
      }

      
    }    console.log('Login form data:', loginData);
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
    }}>
      <div style={{
        flex: 1,
        backgroundColor: "#191970",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <img src="your-logo.png" alt="Logo" />
        <h1 style={{ fontSize: "36px", color: "white" }}>Christ (Deemed to be University)</h1>
      </div>
      <div style={{
        flex: 1,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "500px", // Increase the box length
          width: "400px",
          margin: "10px",
        }}>
           <ToastContainer />
         {!showLogin?(
             <div>
              {!showNextPage ? (
                <div>
                  <h1>Sign Up</h1>
                  <p onClick={() => setShowLogin(true)} style={{ cursor: 'pointer', color: 'blue' }}><span>Already have an Account?</span> Click to Login</p>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "70px" }}>
                  <div className="input-label">
                      <label>Mobile Number:</label>
                      <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        style={{ color: "lightgrey" }}
                        disabled={showNextPage}
                      />
                    </div>
                    <div className="input-label">
                    <label>Email(optional):</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ color: "lightgrey" }}
                        disabled={showNextPage}
                      />
                     </div>
                     <span>{captcha}</span> {/* Display the generated CAPTCHA */}
                     <div className="inpt-label">
                       <label>captcha</label>
                       <input
                       type="text"
                       name="userCaptcha"
                        onChange={handleChange}
                       style={{ color: "lightgrey" }}
                       disabled={showNextPage}
                       />
                       <button type="button" onClick={handleCaptchaRefresh}>
        Refresh CAPTCHA
      </button>
                     </div>
                    <button type="submit"  onClick={() => setshowNextPage(true)}  style={{ backgroundColor: "lightgreen", width: "100px", fontSize: "16px", margin: "0 auto" }}>Continue</button>
                  </form>
                </div>
              ) : (
                <div>
                {/* <h1>Sign Up</h1> */}
                {/* <p onClick={() => setShowLogin(true)} style={{ cursor: 'pointer', color: 'blue' }}>Already have an Account? Click to Login</p> */}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
                <div className="input-label">
                      <label>First Name:</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        style={{ color: "lightgrey" }}
                      />
                    </div>
                    <div className="input-label">
                      <label>Last Name:</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        style={{ color: "lightgrey" }}
                      />
                    </div>
                    <div className="input-label">
                      <label>Password:</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ color: "lightgrey" }}
                      />
                    </div>
                    <div className="input-label">
                      <label> Confirm Password:</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={{ color: "lightgrey" }}
                      />
                    </div>
                  <button type="submit" style={{ backgroundColor: "lightgreen", width: "100px", fontSize: "16px", margin: "0 auto" }}>Sign Up</button>
                </form>
                {/* <button  onClick={() => setshowNextPage(true)}  style={{ backgroundColor: "red", width: "100px", fontSize: "16px", margin: "0 auto" }}>Back</button> */}
              </div>
            )}
           
          </div>
         ):
(
  <div>
    <h1>Login</h1>
    <p onClick={() => setShowLogin(false)} style={{ cursor: 'pointer', color: 'blue' }}>Dont't have an Account? Click to SignUp</p>
    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <label>
        Mobile Number:
        <input
          type="text"
          name="mobileNumber"
          value={loginData.mobileNumber}
          //onChange={handleChange2}
          onChange={(e) => setLoginData({ ...loginData, mobileNumber: e.target.value })}
          style={{ color: "lightgrey" }} // Lighter placeholder color
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={loginData.password}
          //onChange={handleChange}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          style={{ color: "lightgrey" }} // Lighter placeholder color
        />
      </label>
      <button type="submit" style={{ backgroundColor: "#365f95", width: "100px", fontSize: "16px", margin: "0 auto", }}>Login</button>
    </form>
  </div>
)       }

        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
