import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../Firebase/firebase-config';

const auth = getAuth(app)
const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef()
    const handleLogin = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password);
        setError('')
        setSuccess('')
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                setSuccess('User Login Successfully')
                event.target.reset()
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
                
            })
    }
    const resetPassword = () => {
        const email = emailRef.current.value
        if (!email) {
            alert('Enter an email Address')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(result => {
                console.log(result)
                alert('Please check your email for reset password.')
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
        })
    }
    return (
        <div className='w-25 mx-auto' >
            <h1 className='mt-5'>Please Login</h1>
            <form onSubmit={handleLogin} >
                <input  className='rounded mb-3'placeholder='Enter Your Email' ref={emailRef} type="email" required name="email" id="email" />
                <input  className='rounded mb-3'placeholder='Enter Your Password' required type="password" name="password" id="password" />
                <button className='btn btn-primary' name='login' type='submit'>Login</button>
            </form>
            <p className='mt-3'>Forget password? <button onClick={resetPassword} className='btn btn-link'>Reset Password</button></p>
            <p><small>New on our Website? please <Link to='/register'>Register</Link> </small></p>
            <p className='text-danger'>{error} </p>
            <p className='text-success'>{success} </p>

        </div>
    );
};

export default Login;