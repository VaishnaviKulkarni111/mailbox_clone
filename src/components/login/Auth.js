
import React, { useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import './auth.css'
const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
    };

  return (<>
     <div className="formbody">
    <div className="col-md-3 p-3 border">
    <h1 className="mb-4">{isLogin ? "Login" : "Sign up"}</h1>
    <Form >
      <FloatingLabel controlId="email" label="Email" className="mb-3">
        <Form.Control
          type="email"
          placeholder="name@example.com"
          name="email"
         
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="password" label="Password" className="mb-3">
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
        
          required
        />
      </FloatingLabel>

      {!isLogin && <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mb-3">
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
         
          required
        />
      </FloatingLabel>}
      {isLogin && (
            <Button variant="link" >
              Forgot Password?
            </Button>
          )}

     { !isLoading && <Button className="btn btn-primary btn-block" type="submit">
      {!isLogin ? "Sign up" : "Login"}
      </Button>}
      {isLoading && <p>Sending Request...</p>}
     
    </Form>
    <div className='signup_link'>
            <div type="button"    onClick={switchAuthModeHandler}  >
              {isLogin ? "Don't have an account? " : "Already have an Account?"}
              <span style={{ cursor: "pointer", color: "#007bff" }}>
                {isLogin ? "Sign up!" : "Login"}
              </span>
            </div>
          </div>
          </div>
          </div>      
    </>);
};

export default AuthPage;
