// script.js
import { loadStudentData } from './data-loader.js';
import { renderStudentTable } from './table-renderer.js';

// Browser Detection Function
function detectBrowser() {
    const ua = navigator.userAgent;
    let browserName = "Unknown";
    let browserVersion = "Unknown";

    if (ua.includes("Firefox")) {
        browserName = "Mozilla Firefox";
        const match = ua.match(/Firefox\/([0-9.]+)/);
        browserVersion = match ? match[1] : "Unknown";
    } else if (ua.includes("Chrome")) {
        browserName = "Google Chrome";
        const match = ua.match(/Chrome\/([0-9.]+)/);
        browserVersion = match ? match[1] : "Unknown";
    } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
        browserName = "Safari";
        const match = ua.match(/Version\/([0-9.]+)/);
        browserVersion = match ? match[1] : "Unknown";
    } else if (ua.includes("MSIE") || ua.includes("Trident/")) {
        browserName = "Internet Explorer";
        const match = ua.match(/(MSIE|rv:)([0-9.]+)/);
        browserVersion = match ? match[2] : "Unknown";
    } else if (ua.includes("Edge")) {
        browserName = "Microsoft Edge";
        const match = ua.match(/Edge\/([0-9.]+)/);
        browserVersion = match ? match[1] : "Unknown";
    }

    return { browserName, browserVersion };
}

// Display Browser Info
function displayBrowserInfo() {
    const { browserName, browserVersion } = detectBrowser();
    const infoDiv = document.getElementById('browser-info');
    infoDiv.innerHTML = `
        <h3>Browser Information</h3>
        <p><strong>Browser:</strong> ${browserName}</p>
        <p><strong>Version:</strong> ${browserVersion}</p>
        <p><strong>Screen Size:</strong> ${window.innerWidth} x ${window.innerHeight} pixels</p>
        <p><strong>User Agent String:</strong> ${navigator.userAgent}</p>
    `;
}

// Add Student Button Handler
async function setupAddStudentButton() {
    const addStudentBtn = document.getElementById('addStudentBtn');
    const students = await loadStudentData();
    
    addStudentBtn.addEventListener('click', () => {
        const newStudent = {
            id: students.length + 1,
            name: `Student ${students.length + 1}`,
            age: Math.floor(Math.random() * 10 + 18),
            grade: String.fromCharCode(65 + Math.floor(Math.random() * 5))
        };
        
        students.push(newStudent);
        renderStudentTable(students);
    });
}

// Change Font Button Handler
let fontIndex = 0;
const fonts = [
    'Poppins, sans-serif', 
    'Arial, sans-serif', 
    'Roboto, sans-serif', 
    'Montserrat, sans-serif'
];

function setupChangeFontButton() {
    const changeFontBtn = document.getElementById('changeFontBtn');
    
    changeFontBtn.addEventListener('click', () => {
        fontIndex = (fontIndex + 1) % fonts.length;
        document.body.style.fontFamily = fonts[fontIndex];
    });
}

// Initialize the Application
async function init() {
    const students = await loadStudentData();
    renderStudentTable(students);
    
    setupAddStudentButton();
    setupChangeFontButton();
    
    displayBrowserInfo();
    window.addEventListener('resize', displayBrowserInfo);
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);