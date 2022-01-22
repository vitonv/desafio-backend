export interface DeleteTool {
  delete(id: string): Promise<boolean>;
}
