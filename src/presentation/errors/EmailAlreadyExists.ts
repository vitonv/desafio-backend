class EmailAlreadyExists extends Error {
  constructor() {
    super(`This e-mail is already in use!`);
    this.name = 'EmailAlreadyExists';
  }
}

export { EmailAlreadyExists };
