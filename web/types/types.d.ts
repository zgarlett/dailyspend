declare module '@types' {
    export interface JsonData {
        date: string;
        marketValue: number;
        value: number;
    }

    export interface TopLevelData {
        name: string;
        color: string;
        items: JsonData[];
    }
}