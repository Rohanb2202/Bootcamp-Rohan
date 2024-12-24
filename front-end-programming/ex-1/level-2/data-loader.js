

// data-loader.js
export async function loadStudentData() {
    try {
        const response = await fetch('students.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading student data:', error);
        return [];
    }
}