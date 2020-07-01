import { HeaderData } from './HeaderData';
import { ColumnOrder } from './ColumnOrder';

export interface FileData{
    wellInformation: HeaderData;
    curve: HeaderData;
    parameterInformation: HeaderData;
    otherInformation: string[];
    columnOrder: ColumnOrder;
    logs: number[][];
}