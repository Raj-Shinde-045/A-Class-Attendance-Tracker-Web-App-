const students = [
    { rollNo: 1, name: "Aarav Patel" },
    { rollNo: 2, name: "Aditi Sharma" },
    { rollNo: 3, name: "Advait Choudhury" },
    { rollNo: 4, name: "Akshay Kumar" },
    { rollNo: 5, name: "Amrita Singh" },
    { rollNo: 6, name: "Ananya Gupta" },
    { rollNo: 7, name: "Aniket Desai" },
    { rollNo: 8, name: "Anjali Rao" },
    { rollNo: 9, name: "Arjun Reddy" },
    { rollNo: 10, name: "Arun Nair" },
    { rollNo: 11, name: "Ashwin Menon" },
    { rollNo: 12, name: "Bhavya Krishnan" },
    { rollNo: 13, name: "Chetan Verma" },
    { rollNo: 14, name: "Deepa Iyer" },
    { rollNo: 15, name: "Dhruv Kapoor" },
    { rollNo: 16, name: "Divya Malhotra" },
    { rollNo: 17, name: "Esha Patel" },
    { rollNo: 18, name: "Gaurav Mehta" },
    { rollNo: 19, name: "Gitanjali Das" },
    { rollNo: 20, name: "Harsh Singhania" },
    { rollNo: 21, name: "Ishaan Joshi" },
    { rollNo: 22, name: "Jaya Lakshmi" },
    { rollNo: 23, name: "Karan Mehra" },
    { rollNo: 24, name: "Kavya Reddy" },
    { rollNo: 25, name: "Kunal Chopra" },
    { rollNo: 26, name: "Lakshmi Narayan" },
    { rollNo: 27, name: "Madhav Sharma" },
    { rollNo: 28, name: "Manish Gupta" },
    { rollNo: 29, name: "Meera Saxena" },
    { rollNo: 30, name: "Mohan Krishnan" },
    { rollNo: 31, name: "Nandini Patel" },
    { rollNo: 32, name: "Neha Kapoor" },
    { rollNo: 33, name: "Nikhil Menon" },
    { rollNo: 34, name: "Nisha Reddy" },
    { rollNo: 35, name: "Ojas Verma" },
    { rollNo: 36, name: "Pallavi Desai" },
    { rollNo: 37, name: "Pranav Nair" },
    { rollNo: 38, name: "Priya Malhotra" },
    { rollNo: 39, name: "Rahul Sharma" },
    { rollNo: 40, name: "Rajesh Kumar" },
    { rollNo: 41, name: "Riya Singh" },
    { rollNo: 42, name: "Rohan Mehta" },
    { rollNo: 43, name: "Saanvi Patel" },
    { rollNo: 44, name: "Sanjay Iyer" },
    { rollNo: 45, name: "Shreya Gupta" },
    { rollNo: 46, name: "Siddharth Reddy" },
    { rollNo: 47, name: "Sneha Kapoor" },
    { rollNo: 48, name: "Tanvi Desai" },
    { rollNo: 49, name: "Uday Sharma" },
    { rollNo: 50, name: "Uma Krishnan" },
    { rollNo: 51, name: "Varun Nair" },
    { rollNo: 52, name: "Vidya Lakshmi" },
    { rollNo: 53, name: "Vikram Singhania" },
    { rollNo: 54, name: "Vishal Joshi" },
    { rollNo: 55, name: "Yash Malhotra" },
    { rollNo: 56, name: "Zara Khan" },
    { rollNo: 57, name: "Aditya Choudhury" },
    { rollNo: 58, name: "Bhavana Rao" },
    { rollNo: 59, name: "Chirag Patel" },
    { rollNo: 60, name: "Diya Sharma" },
    { rollNo: 61, name: "Eshaan Mehta" },
    { rollNo: 62, name: "Falguni Desai" }
];

let currentStudentIndex = 0;
const studentNameElement = document.getElementById("student-name");
const absentBtn = document.getElementById("absent-btn");
const presentBtn = document.getElementById("present-btn");
const presentList = document.getElementById("present-list");
const absentList = document.getElementById("absent-list");
const studentCard = document.getElementById("student-card");
const callNameBtn = document.getElementById("call-name-btn");

// Add these lines at the beginning of the file
const selectedClass = localStorage.getItem('selectedClass');
const selectedSubject = localStorage.getItem('selectedSubject');
// const teacherName = localStorage.getItem('teacherName');
const selectedDate = localStorage.getItem('selectedDate');

// Add this function to update the header with class info
function updateHeader() {
    const headerElement = document.querySelector('h1');
    headerElement.textContent = `${selectedClass} - ${selectedSubject} - ${selectedDate}`;
    // Remove these two lines
    // const teacherElement = document.createElement('p');
    // teacherElement.textContent = `Teacher: ${teacherName}`;
    // headerElement.after(teacherElement);
}

// Call this function after the page loads
updateHeader();

// Check if speech synthesis is supported
if ('speechSynthesis' in window) {
    console.log("Speech synthesis supported");
} else {
    console.error("Speech synthesis not supported");
    alert("Speech synthesis is not supported in your browser. The app will work, but without voice.");
}

// Initialize speech synthesis
const synth = window.speechSynthesis;
let speechQueue = [];
let isSpeaking = false;

function speakText(text) {
    if (!synth) {
        console.error("Speech synthesis not available");
        return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.2; // Slightly increase speech rate
    utterance.pitch = 1; // Normal pitch
    utterance.volume = 1; // Full volume
    speechQueue.push(utterance);
    
    if (!isSpeaking) {
        speakNext();
    }
}

function speakNext() {
    if (speechQueue.length > 0 && !isSpeaking) {
        isSpeaking = true;
        const utterance = speechQueue.shift();
        utterance.onend = () => {
            isSpeaking = false;
            speakNext();
        };
        utterance.onerror = (event) => {
            console.error("SpeechSynthesisUtterance error", event);
            isSpeaking = false;
            speakNext();
        };
        synth.speak(utterance);
    }
}

function callOutName() {
    if (currentStudentIndex < students.length) {
        const student = students[currentStudentIndex];
        speakText(`Roll number ${student.rollNo}, ${student.name}`);
    } else {
        speakText("End of list reached");
    }
}

callNameBtn.addEventListener("click", callOutName);

function updateStudentCard() {
    if (currentStudentIndex < students.length) {
        const student = students[currentStudentIndex];
        studentNameElement.textContent = `${student.rollNo}. ${student.name}`;
        studentCard.style.transform = "translateX(0)";
        // Reset the animation
        studentNameElement.style.animation = 'none';
        studentNameElement.offsetHeight; // Trigger reflow
        studentNameElement.style.animation = null;
        
        // Automatically call out the name when a new student is displayed
        speakText(`Roll number ${student.rollNo}, ${student.name}`);
    } else {
        studentNameElement.textContent = "End of List";
        studentCard.style.transform = "translateX(0)";
        studentCard.style.backgroundColor = "#333";
        absentBtn.style.display = "none";
        presentBtn.style.display = "none";
        callNameBtn.style.display = "none";
        exportBtn.style.display = "block";
        speakText("End of List");
    }
}

function markStudent(status) {
    if (currentStudentIndex >= students.length) return;

    const student = students[currentStudentIndex];
    const listItem = document.createElement("li");
    listItem.textContent = `${student.rollNo}. ${student.name}`;
    listItem.dataset.rollNo = student.rollNo;
    
    if (status === "present") {
        presentList.appendChild(listItem);
        studentCard.style.transform = "translateX(100%)";
        speakText("Present");
    } else {
        absentList.appendChild(listItem);
        studentCard.style.transform = "translateX(-100%)";
        speakText("Absent");
    }
    
    currentStudentIndex++;
    setTimeout(updateStudentCard, 300);
}

absentBtn.addEventListener("click", () => markStudent("absent"));
presentBtn.addEventListener("click", () => markStudent("present"));

// Implement swiping functionality
const hammer = new Hammer(studentCard);

hammer.on("swipeleft", () => markStudent("absent"));
hammer.on("swiperight", () => markStudent("present"));

// Remove the initial speakText call
// speakText("Welcome to Class Attendance Tracker");

updateStudentCard();

// Modify the exportToCSV function to include class info
function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `Class,${selectedClass}\n`;
    csvContent += `Subject,${selectedSubject}\n`;
    csvContent += `Date,${selectedDate}\n\n`;
    csvContent += "Roll No,Status,Student Name\n";
    
    // Add present students
    presentList.querySelectorAll('li').forEach(li => {
        csvContent += `${li.dataset.rollNo},Present,${li.textContent.split('. ')[1]}\n`;
    });
    
    // Add absent students
    absentList.querySelectorAll('li').forEach(li => {
        csvContent += `${li.dataset.rollNo},Absent,${li.textContent.split('. ')[1]}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_${selectedClass}_${selectedSubject}_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Remove the saveAttendanceRecord function and its call

// Modify the export button creation
const exportBtn = document.createElement("button");
exportBtn.textContent = "Export to CSV";
exportBtn.id = "export-btn";
exportBtn.style.display = "none"; // Hide initially
exportBtn.addEventListener("click", exportToCSV);

// Add the export button to the DOM immediately after creating it
document.querySelector('.container').appendChild(exportBtn);

// Add this near the top of the file with other element selections
const backBtn = document.getElementById("backBtn");

// Add this event listener near the bottom of the file
backBtn.addEventListener("click", function() {
    window.location.href = 'landing page/land.html';
});
