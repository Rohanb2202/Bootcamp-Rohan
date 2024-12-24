export class GridManager {
    constructor() {
        this.gridOptions = null;
        this.gridApi = null;
    }

    initializeGrid(studentData) {
        const gridDiv = document.getElementById('studentGrid');

        this.gridOptions = {
            columnDefs: [
                { 
                    headerName: 'ID', 
                    field: 'ID', 
                    sortable: true, 
                    filter: true,
                    width: 100 
                },
                { 
                    headerName: 'Name', 
                    field: 'Name', 
                    sortable: true, 
                    filter: true 
                },
                { 
                    headerName: 'Age', 
                    field: 'Age', 
                    sortable: true, 
                    filter: true,
                    width: 100 
                },
                { 
                    headerName: 'Grade', 
                    field: 'Grade', 
                    sortable: true, 
                    filter: true,
                    width: 100,
                    cellStyle: params => {
                        if (params.value === 'A' || params.value === 'A-') {
                            return { backgroundColor: '#e6f3e6' };
                        }
                        return null;
                    }
                }
            ],
            defaultColDef: {
                resizable: true,
            },
            rowData: studentData,
            pagination: true,
            paginationAutoPageSize: true
        };

        this.gridApi = agGrid.createGrid(gridDiv, this.gridOptions);
    }

    addStudent(student) {
        if (this.gridApi) {
            this.gridApi.applyTransaction({ add: [student] });
        } else {
            console.error('Grid not initialized');
        }
    }

    getNextId() {
        if (!this.gridApi) return 1;
        
        const rowData = [];
        this.gridApi.forEachNode(node => rowData.push(node.data));
        return Math.max(...rowData.map(student => student.ID), 0) + 1;
    }

    exportToCsv() {
        if (this.gridApi) {
            this.gridApi.exportDataAsCsv({
                fileName: 'students.csv',
                columnKeys: ['ID', 'Name', 'Age', 'Grade']
            });
        } else {
            console.error('Grid not initialized for export');
        }
    }
}