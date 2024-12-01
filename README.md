# Petstore

Install project:

```bash
npm install
```

## Run project

```bash
npm start
```

After running you'll find project under address: `http://localhost:4200/`.

## Running unit tests

To run unit tests:

```bash
npm run test
```

## Running end-to-end tests

Playwright was used for testing e2e - all tests are located in folder `tests`.
To run tests end-to-end (e2e):

```bash
npm run e2e
```

## Technologies used:

- Project structure was parted for small pieces with proper names of functionalities inside folders;
- Reactive Forms were used to create search on list & adding/editing form pet;
- Loader was created with interceptor (running while calling requests);
- Error interceptor handle all errors for which there is no error message;
- All views were created with Angular Material;
- To pass data before loading edit/details view resolver was used;
