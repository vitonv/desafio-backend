class ToolDoesNotExists extends Error {
  constructor() {
    super(`This tool does not exists in our database!`);
    this.name = 'ToolDoesNotExists';
  }
}

export { ToolDoesNotExists };
