// OR for SCSS version
// import './styles/style.css'
import './styles/styles.scss'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { DataManager } from './data-manager';
import { GridManager } from './grid-manager';
import { Student } from './types';

class StudentDashboard {
    private dataManager: DataManager;
    private gridManager: GridManager;

    constructor() {
        this.dataManager = new DataManager();
        this.gridManager = new GridManager();
        this.initializeEventListeners();
    }

    async initialize(): Promise<void> {
        try {
            const studentData = await this.dataManager.loadStudentsFromCSV('/students.csv');
            console.log('Loaded student data:', studentData); // Debug log
            this.gridManager.initializeGrid(studentData);
        } catch (error) {
            console.error('Initialization error:', error);
            this.gridManager.initializeGrid([]);
        }
    }

    // ... rest of the code remains the same

    private initializeEventListeners(): void {
      const addStudentBtn = document.querySelector<HTMLButtonElement>('#addStudentBtn');
      const exportBtn = document.querySelector<HTMLButtonElement>('#exportBtn');

      if (addStudentBtn && exportBtn) {
          addStudentBtn.addEventListener('click', () => this.addRandomStudent());
          exportBtn.addEventListener('click', () => this.exportStudentData());
      }
  }

  private addRandomStudent(): void {
      const newStudent = this.generateRandomStudent();
      this.gridManager.addStudent(newStudent);
  }

  private generateRandomStudent(): Student {
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

  private exportStudentData(): void {
      this.gridManager.exportToCsv();
  }
}



// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new StudentDashboard();
    dashboard.initialize().catch(console.error);
});


