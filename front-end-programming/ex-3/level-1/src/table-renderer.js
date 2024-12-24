export function renderStudentTable(students) {
    const tableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Render new rows
    students.forEach(student => {
        const row = tableBody.insertRow();
        
        row.insertCell(0).textContent = student.id;
        row.insertCell(1).textContent = student.name;
        row.insertCell(2).textContent = student.age;
        row.insertCell(3).textContent = student.grade;
        
        row.classList.add('highlight');
        setTimeout(() => row.classList.remove('highlight'), 1000);
    });
}