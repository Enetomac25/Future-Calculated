const urlParams = new URLSearchParams(window.location.search);
const c_id = urlParams.get('c_id'); // This will be the course_Id passed in the URL

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
            displayCourseDetails();
        } else {
            alert("No data available");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to display course details for a specific course
function displayCourseDetails(courseId = `${c_id}`) {
    const courseData = coursesData[courseId]; // Get the course data for the specified course ID

    // Check if the course data exists
    if (!courseData) {
        console.error(`Course with ID ${courseId} does not exist.`);
        return;
    }

    const detailsContainer = document.querySelector('.course_details'); // Select the course details container

    const university = courseData.u_id.toUpperCase();
    // Create the HTML structure for course details dynamically
    const courseDetailsHTML = `
        <div class="column">
            <div class="tutor">
            <img src="images/course-icon-trans.png" alt="">
            <div>
               <h3 class="course_name" style="font-size: 28px;">${courseData.course_name}</h3>
               <span style="font-weight: bold;">University : </span><span>${university}</span>
               </div>
            </div>
            <div class="details">
                <h3>Faculty: </h3><p class="faculty">${courseData.faculty}</p>
                <h3>Programme Code: </h3><p class="programme_code">${courseData.programme_code || 'N/A'}</p>
                <h3>Duration: </h3><p class="duration">${courseData.duration}</p>
                <h3>Course Description</h3><br><p class="course_descr">${courseData.course_descr || 'N/A'}</p>
                <h3>Study Mode: </h3><p class="study_mode">${courseData.study_mode || 'N/A'}</p>
                <h3>APS Score: </h3><p class="aps_entry_num">${courseData.aps_entry_num}</p>
            </div>
         </div>
      </div>
        <div class="column">
            <div class="details">
                <h3>Math Level: </h3><p class="math_entry_level">${courseData.math_entry_level || 'N/A'}</p>
                <h3>Math Lit Level: </h3><p class="math_lit_entry_level">${courseData.math_lit_entry_level || 'N/A'}</p>
                <h3>English Level: </h3><p class="eng_entry_level">${courseData.eng_entry_level || 'N/A'}</p>
                <h3>Qualification: </h3><p class="qualification">${courseData.qualification || 'N/A'}</p>
                <h3>NQF: </h3><p class="nqf_level">${courseData.nqf_level || 'N/A'}</p>
                <h3>Modules: </h3><p class="modules">${courseData.modules || 'N/A'}</p>
                <h3>Fees: </h3><p class="fees">${courseData.fees || 'N/A'}</p>
                <a href="${courseData.uni_link}" class="inline-option-btn" style="float: right;">Apply Now</a>
            </div>
        </div>`;

    // Clear previous content
    detailsContainer.innerHTML = '';
    // Clear previous details and set new HTML
    detailsContainer.innerHTML = courseDetailsHTML;

    // Optionally, you can scroll to the course details section or display it
    detailsContainer.scrollIntoView({ behavior: 'smooth' });
}

fetchCourseData();