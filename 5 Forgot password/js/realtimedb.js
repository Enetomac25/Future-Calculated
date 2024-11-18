// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvgxDXMplnEUE_Uz0VwUu1BlEko3JgCB0",
    authDomain: "db001-f36e7.firebaseapp.com",
    databaseURL: "https://db001-f36e7-default-rtdb.firebaseio.com",
    projectId: "db001-f36e7",
    storageBucket: "db001-f36e7.appspot.com",
    messagingSenderId: "1067304932491",
    appId: "1:1067304932491:web:799eb1cd3e9db42130708e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Get a reference to the database

let coursesData = {}; // To hold all courses data for filtering

// Reference to the courses node
const dbRef = ref(db);

// Fetch all courses and store them for filtering
async function fetchCourseData() {
    try {
        const snapshot = await get(child(dbRef, `courses`)); // Fetch all courses

        if (snapshot.exists()) {
            coursesData = snapshot.val();
            displayCourses(coursesData); // Display all courses initially
        } else {
            alert("No data available");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to display courses based on filtered or unfiltered data
function displayCourses(courses) {
    const coursesContainer = document.querySelector('.course_container');
    
    // Clear previous content
    coursesContainer.innerHTML = '';

    // Loop through each course and display its data
    for (const course_id in courses) {
        if (courses.hasOwnProperty(course_id)) {
            const courseData = courses[course_id];
            const courseName = courseData.course_name;
            const faculty = courseData.faculty;
            const duration = courseData.duration;
            const apsRequired = courseData.aps_entry_num;
            const university = courseData.u_id.toUpperCase();

            // Create the HTML structure for each course dynamically, including a button for alert
            const courseBox = `
              <div class="box">
                  <div class="tutor">
                      <img src="images/course-icon-trans.png" alt="Course Icon">
                      <div>
                          <h3 class="course_name">${courseName}</h3>
                      </div>
                  </div>
                  <p>Faculty: <span class="faculty">${faculty}</span></p>
                  <p>Duration: <span class="duration">${duration}</span></p>
                  <p>APS Required: <span class="aps_score">${apsRequired}</span></p>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                      <h1>University: <span class="university">${university}</span></h1>
                     
                        <button class="inline-btn" data-course-id="${course_id}" style="background-color:var(--main-color); font-size: 12px; padding: 0.8rem 1rem; width: 140px;">More Details</button>
                
                  </div>
              </div>`;

            // Append each course box to the container
            coursesContainer.innerHTML += courseBox;
        }
    }

    // Add event listeners to all "More Details" buttons (remove unused alert buttons)
    document.querySelectorAll('.inline-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const course_Id = e.target.getAttribute('data-course-id');
            window.location.href = `course_details.html?c_id=${course_Id}`;
        });
    });
}


// Function to filter courses based on the search input
function filterCourses() {
    const searchQuery = document.getElementById('search_box').value.toLowerCase();

    // Filter courses based on search query matching course name, APS, duration, university, or faculty
    const filteredCourses = Object.fromEntries(
        Object.entries(coursesData).filter(([courseId, courseData]) => {
            return (
                courseData.course_name.toLowerCase().includes(searchQuery) ||
                courseData.faculty.toLowerCase().includes(searchQuery) ||
                courseData.duration.toLowerCase().includes(searchQuery) ||
                courseData.aps_entry_num.toString().includes(searchQuery) ||
                courseData.u_id.toLowerCase().includes(searchQuery)
            );
        })
    );

    // Display the filtered courses
    displayCourses(filteredCourses);
}

// Fetch data for all courses when the page loads
fetchCourseData();

// Add event listener to filter courses as the user types
document.getElementById('search_box').addEventListener('input', filterCourses);
