document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.querySelector('.course-list');
    const courseDetailSection = document.getElementById('course-detail');
    const courseDetailContent = document.getElementById('course-detail-content');
    const authLink = document.getElementById('auth-link');
    const loginSection = document.getElementById('login');
    const registerSection = document.getElementById('register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    function checkAuth() {
        const username = localStorage.getItem('username');
        if (username) {
            authLink.innerHTML = `<a href="#" id="logout">Logout (${username})</a>`;
            document.getElementById('logout').addEventListener('click', logout);
        } else {
            authLink.innerHTML = '<a href="#login">Login</a>';
        }
    }

    function logout() {
        localStorage.removeItem('username');
        checkAuth();
    }

    async function fetchCourses() {
        const response = await fetch('http://localhost:3000/api/courses');
        const courses = await response.json();
        courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('course');
            courseElement.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description.split('<')[0]}...</p>
                <button onclick="viewCourse(${course.id})">View Course</button>
            `;
            courseList.appendChild(courseElement);
        });
    }

    window.viewCourse = async function (courseId) {
        const response = await fetch(`http://localhost:3000/api/courses/${courseId}`);
        const course = await response.json();
        if (course) {
            const videoUrl = `https://drive.google.com/file/d/${course.videoId}/preview`;
            courseDetailContent.innerHTML = `
                <h3>${course.title}</h3>
                <div>${course.description}</div>
                <iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
                <h4>Quiz</h4>
                <p>${course.quiz.question}</p>
                <ul>
                    ${course.quiz.options.map(option => `<li><button onclick="checkAnswer('${course.quiz.answer}', '${option}')">${option}</button></li>`).join('')}
                </ul>
            `;
            courseDetailSection.style.display = 'block';
        }
    };

    window.checkAnswer = function (correctAnswer, selectedAnswer) {
        if (correctAnswer === selectedAnswer) {
            alert('Correct!');
        } else {
            alert('Incorrect, try again.');
        }
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        checkAuth();
        loginSection.style.display = 'none';
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;
        localStorage.setItem('username', newUsername);
        localStorage.setItem('password', newPassword);
        checkAuth();
        registerSection.style.display = 'none';
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
        });
    });

    fetchCourses();
    checkAuth();
});

