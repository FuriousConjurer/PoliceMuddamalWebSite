import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import policeLogo from './mumbai_logo.png';

function validateLogin(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example hardcoded credentials
    const validUsername = 'admin';
    const validPassword = '12345';

    // Check if credentials match
    if (username === validUsername && password === validPassword) {
        // If credentials are correct, redirect to the new page
        window.location.href = 'muddemalDetails.html'; // Redirect to the dashboard or target page
    } else {
        // Show error message if credentials are wrong
        document.getElementById('errorMessage').style.display = 'block';
    }
}