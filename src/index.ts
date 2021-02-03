export type CustomErrorConstructor<T extends CustomError = CustomError> = new (message?: string) => T

export interface SerializableError {
  name: string
  message: string
  stack: string | null
}

export class CustomError extends Error {
  get name() {
    return this.constructor.name
  }
}

export function normalize(err: Error): SerializableError {
  return {
    name: err.name
  , message: err.message
  , stack: err.stack ?? null
  }
}
