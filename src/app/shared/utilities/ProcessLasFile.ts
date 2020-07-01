import { HeaderData } from '../models/HeaderData';
import { FileData } from '../models/FileData';
import { Observable, observable } from 'rxjs';

export class ProcessLasFile{
    private static Global_Section_Positions_That_We_Want: number[] = [];
    private static Global_Section_Positions: number[] = [];
    private static Glopal_Section_Start_End: number[][] = [];
    private static type = [];
    private static data = [];
    private static unit = [];
    private static comment = [];
    private static OtherInformation = [];
    private static numOfColumns: number;

    private static wellInformation: HeaderData;
    private static parameterInformation: HeaderData;
    private static curveInformation: HeaderData;
    private static Header: FileData;

    public static  process(file: File){
        const fileDataObservable = new Observable<FileData>(observer => {
            let reader = new FileReader();
            reader.onload = function (progressEvent) {
                ProcessLasFile.GetStartSectionIndex(progressEvent.target.result.toString().split('\n'))
                observer.next(ProcessLasFile.Header);
            };
        
            reader.onerror = (event) => {
                return false;
            };
        
            reader.readAsText(file);
        });
        return fileDataObservable;
    }


    private static GetStartSectionIndex(LinesOfMyFile) {
        let x = 0;
    
        for (let line = 0; line < LinesOfMyFile.length; line++) {
            if (LinesOfMyFile[line].startsWith("~W") === true) {
                ProcessLasFile.Global_Section_Positions_That_We_Want[0] = line;
            }
            else if (LinesOfMyFile[line].startsWith("~P") === true) {
                ProcessLasFile.Global_Section_Positions_That_We_Want[1] = line;
            }
            else if (LinesOfMyFile[line].startsWith("~C") === true) {
                ProcessLasFile.Global_Section_Positions_That_We_Want[2] = line;
            }
            else if (LinesOfMyFile[line].startsWith("~A") === true) {
                ProcessLasFile.Global_Section_Positions_That_We_Want[3] = line;
            }
            else if (LinesOfMyFile[line].startsWith("~O") === true) {
                ProcessLasFile.Global_Section_Positions_That_We_Want[4] = line;
            }
    
            if (LinesOfMyFile[line].startsWith("~") === true) {
                ProcessLasFile.Global_Section_Positions[x++] = line;
            }
        }
    
        for (let i = 0; i < ProcessLasFile.Global_Section_Positions_That_We_Want.length; i++) {
            let EndIndex = ProcessLasFile.Global_Section_Positions.indexOf(ProcessLasFile.Global_Section_Positions_That_We_Want[i]) + 1;
            ProcessLasFile.Glopal_Section_Start_End[i] = [];
            ProcessLasFile.Glopal_Section_Start_End[i][0] = ProcessLasFile.Global_Section_Positions_That_We_Want[i];
            ProcessLasFile.Glopal_Section_Start_End[i][1] = ProcessLasFile.Global_Section_Positions[EndIndex];
        }

        ProcessLasFile.separate(LinesOfMyFile, ProcessLasFile.Glopal_Section_Start_End[0][0] + 1, ProcessLasFile.Glopal_Section_Start_End[0][1]);
        ProcessLasFile.wellInformation = {
            comment: ProcessLasFile.comment,
            type: ProcessLasFile.type,
            data: ProcessLasFile.data,
            unit: ProcessLasFile.unit 
        }

        ProcessLasFile.separate(LinesOfMyFile, ProcessLasFile.Glopal_Section_Start_End[1][0] + 1, ProcessLasFile.Glopal_Section_Start_End[1][1]);
        ProcessLasFile.parameterInformation = {
            comment: ProcessLasFile.comment,
            type: ProcessLasFile.type,
            data: ProcessLasFile.data,
            unit: ProcessLasFile.unit 
        }

        ProcessLasFile.separate(LinesOfMyFile, ProcessLasFile.Glopal_Section_Start_End[2][0] + 1, ProcessLasFile.Glopal_Section_Start_End[2][1]);
        ProcessLasFile.curveInformation = {
            comment: ProcessLasFile.comment,
            type: ProcessLasFile.type,
            data: ProcessLasFile.data,
            unit: ProcessLasFile.unit 
        }

        ProcessLasFile.GetOtherInformation(LinesOfMyFile, ProcessLasFile.Glopal_Section_Start_End[4][0] + 1, ProcessLasFile.Glopal_Section_Start_End[4][1]);

        ProcessLasFile.NumberOfColumns(LinesOfMyFile, ProcessLasFile.Glopal_Section_Start_End[3][0]);
        let Logs = ProcessLasFile.Create2DArray(ProcessLasFile.numOfColumns);
        ProcessLasFile.GetData(LinesOfMyFile, ProcessLasFile.Glopal_Section_Start_End[3][0] + 1, Logs);

        ProcessLasFile.Header ={curve: ProcessLasFile.curveInformation, otherInformation: ProcessLasFile.OtherInformation, wellInformation: ProcessLasFile.wellInformation, parameterInformation: ProcessLasFile.parameterInformation, logs: Logs}

    }

    private static separate(lines, start, end) {
        ProcessLasFile.type = []; ProcessLasFile.data = []; ProcessLasFile.unit = []; ProcessLasFile.comment = [];
        let count = 0;
        for (let i = start; i < end; i++) {
            if (lines[i].startsWith("#")) {
                continue;
            } else {
                //remove line breaks from str
                let str = lines[i].replace(/\s{2,}/g, ' ');
                str = str.replace(/\t/g, ' ');
                str = str.toString().trim().replace(/(\r\n|\n|\r)/g, "");
                let line = str.trim();
    
                ProcessLasFile.type[count] = line.substr(0, line.indexOf('.')).trim();
                let x = line.substr(line.indexOf('.') + 1, line.indexOf(':') - (line.indexOf('.')));
                ProcessLasFile.data[count] = x.substr(x.indexOf(" "), x.indexOf(":") - x.indexOf(" ")).trim();
                ProcessLasFile.unit[count] = x.substr(0, x.indexOf(' ')).trim();
                ProcessLasFile.comment[count] = line.substr(line.indexOf(":") + 1, 40).trim();
                count++;
            }
        }
    }

    private static GetOtherInformation(lines, start, end) {
        let count = 0;
        for (let i = start; i < end; i++) {
            if (lines[i].startsWith("#")) {
                continue;
            } else {
                //remove line breaks from str
                ProcessLasFile.OtherInformation[count++] = lines[i];
            }
        }
    }

    private static NumberOfColumns(lines, start) {
        for (let i = start; i < (start + 20); i++) {
            if (lines[i].startsWith("#")) {
                continue;
            } else {
                let split = lines[i].replace(/\s{2,}/g, ' ').trim();
                let split1 = split.split(' ');
                ProcessLasFile.numOfColumns = split1.length;
            }
        }
    }

    private static Create2DArray(rows) {
        let arr = [];
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
        }
        return arr;
    }

    private static GetData(lines, start, Logs) {
        var count = 0;
        for (let i = start; i < lines.length; i++) {
            if (lines[i].startsWith("#")) {
                continue;
            } else {
                let split = lines[i].replace(/\s{2,}/g, ' ').trim();
                let split1 = split.split(' ');
                for (let j = 0; j < split1.length; j++) {
                    Logs[j][count] = split1[j];
                }
                count++;
            }
        }
        return Logs;
    }

}