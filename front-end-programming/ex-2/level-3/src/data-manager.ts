// data-manager.ts
import Papa from 'papaparse';
import { Student } from './types';

export class DataManager {
    async loadStudentsFromCSV(filePath: string): Promise<Student[]> {
        return new Promise((resolve, reject) => {
            Papa.parse<Student>(filePath, {
                download: true,
                header: true,
                complete: (results) => {
                    if (results.errors.length) {
                        reject(results.errors);
                    } else {
                        const processedData = results.data
                            .filter(student => student.ID && student.Name && student.Age && student.Grade)
                            .map(student => ({
                                ...student,
                                ID: parseInt(student.ID.toString(), 10),
                                Age: parseInt(student.Age.toString(), 10)
                            }));
                        resolve(processedData);
                    }
                },
                error: (error) => reject(error)
            });
        });
    }
}