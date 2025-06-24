// Sample course data - in a real app, this would come from an API
const courses = [
    {
        id: 1,
        title: "Web Development Bootcamp",
        description: "Learn full-stack web development with HTML, CSS, JavaScript, and Node.js",
        image: "images/web-dev.jpg",
        price: "$199",
        rating: "4.8",
        instructor: "John Doe"
    },
    {
        id: 2,
        title: "Data Science Fundamentals",
        description: "Introduction to data analysis, visualization, and machine learning",
        image: "images/data-science.jpg",
        price: "$249",
        rating: "4.7",
        instructor: "Jane Smith"
    },
    {
        id: 3,
        title: "Mobile App Development",
        description: "Build cross-platform mobile apps with React Native",
        image: "images/mobile-dev.jpg",
        price: "$179",
        rating: "4.6",
        instructor: "Mike Johnson"
    },
    {
        id: 4,
        title: "UI/UX Design Principles",
        description: "Master the fundamentals of user interface and experience design",
        image: "images/ui-ux.jpg",
        price: "$149",
        rating: "4.9",
        instructor: "Sarah Williams"
    }
];

// Display popular courses on homepage
document.addEventListener('DOMContentLoaded', function() {
    const popularCoursesContainer = document.getElementById('popularCourses');
    
    if (popularCoursesContainer) {
        courses.slice(0, 4).forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-img">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="course-info">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <span class="course-price">${course.price}</span>
                        <span class="course-rating"><i class="fas fa-star"></i> ${course.rating}</span>
                    </div>
                </div>
            `;
            popularCoursesContainer.appendChild(courseCard);
            
            // Add click event to view course details
            courseCard.addEventListener('click', () => {
                window.location.href = `course-detail.html?id=${course.id}`;
            });
        });
    }
});