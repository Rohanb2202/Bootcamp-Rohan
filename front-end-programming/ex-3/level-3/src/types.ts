export interface Student {
    ID: number;
    Name: string;
    Age: number;
    Grade: string;
}

export interface GridApi {
    applyTransaction(transaction: { add: Student[] }): void;
    forEachNode(callback: (node: any) => void): void;
    exportDataAsCsv(params: { fileName: string; columnKeys: string[] }): void;
}