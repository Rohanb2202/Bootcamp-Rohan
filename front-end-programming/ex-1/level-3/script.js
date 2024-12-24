import { DataManager } from './data-manager.js';
import { GridManager } from './grid-manager.js';

class StudentDashboard {
    constructor() {
        this.dataManager = new DataManager();
        this.gridManager = new GridManager();
        this.initializeEventListeners();
    }

    async initialize() {
        try {
            // Load initial data from CSV
            const studentData = await this.dataManager.loadStudentsFromCSV('students.csv');
            this.gridManager.initializeGrid(studentData);
        } catch (error) {
            console.error('Initialization error:', error);
            // Fallback to empty grid if CSV loading fails
            this.gridManager.initializeGrid([]);
        }
    }

    initializeEventListeners() {
        const addStudentBtn = document.getElementById('addStudentBtn');
        const exportBtn = document.getElementById('exportBtn');

        addStudentBtn.addEventListener('click', () => this.addRandomStudent());
        exportBtn.addEventListener('click', () => this.exportStudentData());
    }

    addRandomStudent() {
        const newStudent = this.generateRandomStudent();
        this.gridManager.addStudent(newStudent);
    }

    generateRandomStudent() {
        const names = [
            'Emma Johnson', 'Liam Smith', 'Olivia Brown', 
            'Noah Davis', 'Ava Wilson', 'Ethan Taylor', 
            'Sophia Martinez', 'Mason Anderson', 'Isabella Thomas'
        ];

        const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];
        
        return {
            ID: this.gridManager.getNextId(),
            Name: names[Math.floor(Math.random() * names.length)],
            Age: Math.floor(Math.random() * 5 + 17),
            Grade: grades[Math.floor(Math.random() * grades.length)]
        };
    }

    exportStudentData() {
        this.gridManager.exportToCsv();
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new StudentDashboard();
    dashboard.initialize();
});