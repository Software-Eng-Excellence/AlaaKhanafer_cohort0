import { promises as fs } from 'fs';
import { parse as csvParse } from 'csv-parse';
import { stringify as csvStringify} from 'csv-stringify';

/**
 * Read a CSV file and return its content as a 2D array of strings
 * @param filePath - path to the CSV file
 * @param includeHeader - whether to include the header row in the output
 * @returns Promise<string[][]> - 2D array of strings
 */

export async function readCSVFile(filePath: string, includeHeader: boolean = false): Promise<string[][]> {
    try{
        const fileContent = await fs.readFile(filePath, 'utf8');
        return new Promise((resolve, reject) => {
            csvParse(fileContent, {
                trim: true,
                skip_empty_lines: true,
            }, (err, records: string[][]) => {
                if (err) reject(err);
                if (!includeHeader) records.shift();
                resolve(records);
            });
        });
    } catch (error) {
        throw new Error(`Error reading CSV file: ${error}`);
    }
}

export async function writeCSVFile(filePath: string, data: string[][]): Promise<void> {
    try {
        const csvData = await new Promise<string>((resolve, reject) => {
            csvStringify(data, (err, output) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(output);
                }
            });
        });
        await fs.writeFile(filePath, csvData, 'utf8');
    } catch (error) {
        throw new Error(`Error writing CSV file: ${error}`);
    }
}