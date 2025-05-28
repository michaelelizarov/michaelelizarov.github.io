'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const userTypeSelect = document.getElementById('user-type');
    const errorMessageDiv = document.getElementById('error-message');
    // Use the global translation function
    const getLocalizedString = window.getTranslatedStringGlobal;
    
    // Form functionality
    function displayErrorMessage(messageKey) {
        if (errorMessageDiv && typeof getLocalizedString === 'function') {
            errorMessageDiv.textContent = getLocalizedString(messageKey);
            errorMessageDiv.classList.remove('hidden');
        } else if (errorMessageDiv) {
            errorMessageDiv.textContent = `[${messageKey}]`; // Fallback if translation function not ready
            errorMessageDiv.classList.remove('hidden');
        }
    }
    
    function clearErrorMessage() {
        if (errorMessageDiv) {
            errorMessageDiv.textContent = '';
            errorMessageDiv.classList.add('hidden');
        }
    }
    
    function handleLoginSuccess(userType) {
        clearErrorMessage();
        // Store user type for other pages to potentially use.
        // This helps sidebar and other components know the context.
        localStorage.setItem('currentUserType', userType);
        document.body.dataset.userType = userType; // Also set on body for immediate JS on next page
        if (userType === 'instructor') {
            window.location.href = 'landing_instructor.html'; // Redirect to instructor landing page
        } else if (userType === 'trainee_general') {
            window.location.href = 'landing_trainee_general.html'; // Redirect to trainee general landing page
        } else if (userType === 'trainee_workshop') {
            window.location.href = 'landing_trainee_workshop.html'; // Redirect to trainee workshop landing page
        } else {
            console.error('Unknown user type selected:', userType);
            displayErrorMessage('login_error_unknown_usertype');
        }
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            clearErrorMessage();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const userType = userTypeSelect.value;
            if (!email || !password) {
                displayErrorMessage('login_error_empty_fields');
                return;
            }
            // Simulate authentication (replace with actual auth logic)
            // For demo purposes, any non-empty email/password for known user types is considered valid.
            if (userType === 'instructor' || userType === 'trainee_general' || userType === 'trainee_workshop') {
                 // Mock successful login for any valid type with non-empty credentials
                handleLoginSuccess(userType);
            } else {
                // This case should ideally not be reached if select is populated correctly
                displayErrorMessage('login_error_generic'); // Or a more specific error
            }
        });
    }
}); 