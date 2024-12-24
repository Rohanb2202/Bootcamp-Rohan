export class DataManager {
    async loadStudentsFromCSV(filePath) {
        return new Promise((resolve, reject) => {
            Papa.parse(filePath, {
                download: true,
                header: true,
                complete: (results) => {
                    if (results.errors.length) {
                        reject(results.errors);
                    } else {
                        // Convert age to number for proper sorting
                        const processedData = results.data.map(student => ({
                            ...student,
                            ID: parseInt(student.ID, 10),
                            Age: parseInt(student.Age, 10)
                        }));
                        resolve(processedData);
                    }
                },
                error: (error) => reject(error)
            });
        });
    }
}