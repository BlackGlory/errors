export type CustomErrorConstructor<T extends CustomError> = new (message?: string) => T

export class CustomError extends Error {
  get name() {
    return this.constructor.name
  }
}
