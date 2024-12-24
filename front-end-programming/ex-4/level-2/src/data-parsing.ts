import Papa from "papaparse";

export interface RowData {
  ID: number;
  Name: string;
  Age: number;
  Grade: string;
}

export function parseCSV(csvContent: string): RowData[] {
  const parsed = Papa.parse<RowData>(csvContent, {
    header: true,
    skipEmptyLines: true,
  });
  if (parsed.errors.length) {
    throw new Error(`Error parsing CSV: ${parsed.errors[0].message}`);
  }

  return parsed.data;
}