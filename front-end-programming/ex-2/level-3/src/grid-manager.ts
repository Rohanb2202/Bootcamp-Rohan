// grid-manager.ts
import { GridApi, Student } from './types';
import { GridOptions } from 'ag-grid-community';

export class GridManager {
    exportToCsv() {
      throw new Error('Method not implemented.');
    }
    getNextId(): number {
      throw new Error('Method not implemented.');
    }
    addStudent(newStudent: Student) {
      throw new Error('Method not implemented.');
    }
    private gridApi: any = null;
    private gridOptions: GridOptions | null = null;

    initializeGrid(studentData: Student[]): void {
        const gridDiv = document.querySelector<HTMLElement>('#studentGrid');
        if (!gridDiv) throw new Error('Grid container not found');

        this.gridOptions = {
            columnDefs: [
                { 
                    field: 'ID', 
                    sortable: true, 
                    filter: true,
                    width: 100 
                },
                { 
                    field: 'Name', 
                    sortable: true, 
                    filter: true 
                },
                { 
                    field: 'Age', 
                    sortable: true, 
                    filter: true,
                    width: 100 
                },
                { 
                    field: 'Grade', 
                    sortable: true, 
                    filter: true,
                    width: 100,
                    cellStyle: (params: any) => {
                        if (params.value === 'A' || params.value === 'A-') {
                            return { backgroundColor: '#e6f3e6' };
                        }
                        return null;
                    }
                }
            ],
            defaultColDef: {
                resizable: true,
                suppressMovable: true
            },
            rowData: studentData,
            pagination: true,
            paginationAutoPageSize: true,
            domLayout: 'normal'
        };

        // @ts-ignore
        this.gridApi = agGrid.createGrid(gridDiv, this.gridOptions).api;
    }

    // ... rest of the methods remain the same
}