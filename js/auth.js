// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Save token and redirect
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (err) {
        console.error('Login error:', err);
        alert('An error occurred during login');
    }
});

// Register Form Submission
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Save token and redirect
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (err) {
        console.error('Registration error:', err);
        alert('An error occurred during registration');
    }
});

// Logout Functionality
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

document.getElementById('sidebarLogout')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});