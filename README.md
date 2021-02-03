# errors

Common errors.

## Install

```sh
npm install --save @blackglory/errors
# or
yarn add @blackglory/errors
```

## API

### Interfaces

```ts
type CustomErrorConstructor<T extends CustomError = CustomError> = new (message?: string) => T

interface SerializableError {
  name: string
  message: string
  stack: string | null
}
```

### CustomError

```ts

class CustomError extends Error {}
```

### normalize

```ts
function normalize(err: Error): SerializableError
```
