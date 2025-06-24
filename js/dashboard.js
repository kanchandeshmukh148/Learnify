document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        // Fetch user data
        const response = await fetch('/api/auth/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Authentication failed');
        }
        
        const user = await response.json();
        
        // Update UI with user data
        document.querySelector('.profile-name').textContent = user.name;
        document.querySelector('.profile-email').textContent = user.email;
        
        // Fetch enrolled courses
        const coursesResponse = await fetch('/api/courses/enrolled', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (coursesResponse.ok) {
            const courses = await coursesResponse.json();
            // Update courses in UI
        }
        
        // Initialize progress circles
        initProgressCircles();
        
    } catch (err) {
        console.error('Dashboard error:', err);
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }
});

function initProgressCircles() {
    document.querySelectorAll('.progress-circle').forEach(circle => {
        const percent = parseInt(circle.getAttribute('data-percent'));
        const circumference = 2 * Math.PI * 36;
        const offset = circumference - (percent / 100) * circumference;
        
        const ring = circle.querySelector('.progress-ring-circle');
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = offset;
    });
}