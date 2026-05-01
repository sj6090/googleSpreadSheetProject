declare module 'sheetdb-node' {
  interface SheetDBClient {
    list(options?: { limit?: number; skip?: number }): Promise<any>;
    row(id: number): Promise<any>;
    search(query: Record<string, string>): Promise<any>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<any>;
  }

  interface SheetDBConfig {
    apiKey: string;
  }

  function SheetDB(config: SheetDBConfig): SheetDBClient;
  export default SheetDB;
}