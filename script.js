document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        {
            id: 1,
            title: 'Power Machines N6',
            description: `
                <h4>Course Overview:</h4>
                <p>Power Machines N6 is an advanced technical course designed for students pursuing a career in electrical engineering, particularly in the field of power systems and machinery. This course provides an in-depth understanding of the principles, operations, and applications of various electrical machines and power systems used in industrial settings.</p>
                
                <h4>Course Objectives:</h4>
                <ul>
                    <li>To understand the construction, operation, and performance characteristics of different types of electrical machines, including transformers, synchronous machines, and induction motors.</li>
                    <li>To analyze the principles of electromechanical energy conversion and apply these principles to practical scenarios.</li>
                    <li>To explore the control and protection mechanisms used in power systems and machines.</li>
                    <li>To develop problem-solving skills related to the design, operation, and maintenance of power machines.</li>
                    <li>To learn about recent advancements and emerging technologies in the field of power engineering.</li>
                </ul>
                
                <h4>Course Content:</h4>
                <ul>
                    <li><strong>Transformers:</strong>
                        <ul>
                            <li>Construction and operating principles</li>
                            <li>Equivalent circuits and phasor diagrams</li>
                            <li>Efficiency and regulation</li>
                            <li>Autotransformers and three-phase transformers</li>
                        </ul>
                    </li>
                    <li><strong>Synchronous Machines:</strong>
                        <ul>
                            <li>Construction and types (generators and motors)</li>
                            <li>Operating principles and performance characteristics</li>
                            <li>Synchronous reactance and equivalent circuits</li>
                            <li>Parallel operation of generators</li>
                        </ul>
                    </li>
                    <li><strong>Induction Motors:</strong>
                        <ul>
                            <li>Construction and types (squirrel-cage and wound-rotor)</li>
                            <li>Operating principles and performance characteristics</li>
                            <li>Starting and speed control methods</li>
                            <li>Equivalent circuits and torque-speed characteristics</li>
                        </ul>
                    </li>
                    <li><strong>Electromechanical Energy Conversion:</strong>
                        <ul>
                            <li>Principles and applications</li>
                            <li>Energy conversion processes in different types of machines</li>
                            <li>Losses and efficiency calculations</li>
                        </ul>
                    </li>
                    <li><strong>Power System Protection:</strong>
                        <ul>
                            <li>Protection devices and their applications</li>
                            <li>Fault analysis and protection schemes</li>
                            <li>Circuit breakers, fuses, and relays</li>
                        </ul>
                    </li>
                    <li><strong>Control of Electrical Machines:</strong>
                        <ul>
                            <li>Control strategies for different types of machines</li>
                            <li>Drive systems and their applications</li>
                            <li>Variable frequency drives and their implementation</li>
                        </ul>
                    </li>
                    <li><strong>Emerging Technologies:</strong>
                        <ul>
                            <li>Advances in power electronics</li>
                            <li>Renewable energy integration</li>
                            <li>Smart grids and their components</li>
                        </ul>
                    </li>
                </ul>
                
                <h4>Assessment Methods:</h4>
                <ul>
                    <li>Written examinations</li>
                    <li>Practical laboratory work and reports</li>
                    <li>Assignments and projects</li>
                    <li>Class participation and presentations</li>
                </ul>
                
                <h4>Prerequisites:</h4>
                <ul>
                    <li>Successful completion of Power Machines N5 or equivalent</li>
                    <li>Basic knowledge of electrical circuits and systems</li>
                </ul>
                
                <h4>Career Opportunities:</h4>
                <p>Graduates of Power Machines N6 can pursue careers as electrical engineers, power system engineers, maintenance engineers, and consultants in various industries including manufacturing, utilities, and renewable energy sectors.</p>
            `,
            videoId: '1KWVo6RF9avrp1QWXzonS3S3JfR5AjgVd',
            quiz: {
                question: '1. State two advantages of a multi stage compressor over a single stage compressor ?',
                options: ['Higher Efficiency & Increased Pressure Ratio', 'Lower Maintenance Costs & Lower Initial Cost', 'Simpler Operation & Suitable for Low Pressure Applications'],
                answer: 'Higher Efficiency & Increased Pressure Ratio'
            }
        },
        // Add more courses as needed
    ];

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

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        // For simplicity, storing the password in plain text. In a real application, use hashing.
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
            window.scrollTo({ top: document.getElementById(targetId).offsetTop, behavior: 'smooth' });
        });
    });

    window.viewCourse = function (courseId) {
        const course = courses.find(c => c.id === courseId);
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

    checkAuth();
});

