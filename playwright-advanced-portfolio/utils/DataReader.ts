import fs from 'fs';
import path from 'path';
import {parse} from 'csv-parse/sync';
import * as XLSX from 'xlsx';


export class DataReader {
    /**
     * Reads a CSV file from the data folders and parses it into JSON objects
     * @param fileName Name of the file (e.g. users.csv)
     */

    public static getCsvData<T>(fileName: string): T[] {

        //Resolve the abosulte file path dynamically
        const filePath = path.resolve(__dirname, '../data', fileName);

        //read the file content as raw text strings
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});

        // Parse raw text into structured key-valye rows
        return parse(fileContent, {
            columns: true,  //autom-maps headers ('username') as object keys
            skip_empty_lines: true,
            
        });

    };

    /**
     * Reads (.xlsx) files from /data directory
     */

    public static getExcelData<T>(fileName: string, sheetName?: string): T[] {

        //Resolve the absolute file path dynamically
        const filePath = path.resolve(__dirname, '../data', fileName);
        const workbook = XLSX.readFile(filePath);

        // Use specified sheet, or default to the first sheet
        const targetSheetName = sheetName || workbook.SheetNames[0];
        const worksheet = workbook.Sheets[targetSheetName];

        //convert rows to JSON objects
        return XLSX.utils.sheet_to_json<T>(worksheet);

    }

};