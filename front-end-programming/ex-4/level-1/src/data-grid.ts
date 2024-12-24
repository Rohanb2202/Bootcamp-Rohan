import {
    AllCommunityModule,
    ColDef,
    GridApi,
    GridOptions,
    ModuleRegistry,
    createGrid,
  } from "ag-grid-community";
  
  ModuleRegistry.registerModules([AllCommunityModule]);
  
  interface IRow {
    id: number;
    name: string;
    age: number;
    grade: string;
  }
  
  let gridApi: GridApi<IRow>;
  
  export function createDataGrid(
    containerId: string,
    rowData: any[],
    columnDefs: ColDef[]
  ): void {
    const gridOptions: GridOptions<IRow> = {
      columnDefs,
      rowData,
      defaultColDef: {
        flex: 1,
      },
    };
  
    const gridDiv = document.getElementById(containerId);
    if (!gridDiv) {
      throw new Error(`Container with ID "${containerId}" not found.`);
    }
  
    gridApi = createGrid(gridDiv, gridOptions);
  
    // Example usage of gridApi
    console.log(gridApi);
  }