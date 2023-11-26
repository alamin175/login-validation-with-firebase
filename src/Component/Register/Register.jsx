import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification} from 'firebase/auth'
import app from '../../Firebase/firebase-config';
import { Link } from 'react-router-dom';
const auth = getAuth(app)
const Register = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        setSuccess('')
        setError('')
        const email = event.target.email.value
        const password = event.target.password.value

        //*  Strong Password Validation  *//

        if (!/(?=.*[A-Z])/.test(password)) {
            setError('There are atleast a Uppercase in password')
            return; /* code ta off korar jonno return use korte hobe , that means, ei condition ta true na hole shamner dik e jabe na.*/
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('There are at least a special character (!@#$&*) ')
            return;
        } 
        else if (!/(?=.*[0-9])/.test(password)) {
            setError('There are atleast a number in password')
            return; 
        }
        else if (!/.{8}/.test(password)) {
            setError('Password should be at least 8 character')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const createdUser = result.user
            event.target.reset()
            console.log(createdUser);
            emailVerification(createdUser)
            setSuccess('User has been Created Successfully')
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
        })
    }
    const emailVerification = user => {
        sendEmailVerification(user)
        alert('Please Verify your email address')
    }
    const handleEmail = (event) => {
    // console.log(event.target.email.value)
    }
    const handlePassword = (event) => {
        // console.log(event.target.password.value)
    }
    return (
            
        <div className='w-25 mx-auto' >
            <h1 className='mt-5'>Please Register</h1>
            <form onSubmit={handleSubmit} >
                <input  className='rounded mb-3'placeholder='Enter Your Name' type="text" required name="name" id="name" />
                <input  className='rounded mb-3'placeholder='Enter Your Email' type="email" required name="email" id="email" />
                <input  className='rounded mb-3'placeholder='Enter Your Password' required type="password" name="password" id="password" />
                <button className='btn btn-primary' name='submit' type='submit'>Submit</button>
            </form>
            <p><small>Already have an account? Please <Link to='/login'>Login</Link> </small></p>
            <p className='text-danger'>{error} </p>
            <p className='text-success'>{success} </p>

        </div>
    );
};

export default Register;