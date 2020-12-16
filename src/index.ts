export class CustomError extends Error {
  get name() {
    return this.constructor.name
  }
}
