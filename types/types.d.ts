declare module '@types' {
    export interface ApiResponse {
        statusCode: number;
        headers: {
          'Content-Type': string;
        };
        body: string;
      }

    export interface JsonData{
        date: string;
        marketValue: number;
        value: number
    }
}