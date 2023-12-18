# Apollo Client + TypeScript + Vite ✨💫

In this app, it demonstrates GitHub repositories based on a specific name entered by the user in the search bar. Upon receiving the input, the app immediately queries the GitHub GraphQL server to retrieve the corresponding repositories. Users can also perform infinite scrolling in the repository list to access more related repositories. By default, the app displays all repositories related to React.

## GITHUB TOKEN Protection
Due to personal data protection, GitHub prohibits the inclusion of tokens in source code. Please utilize the token I have provided to complete the .env file, which will enable successful API requests.
```
VITE_GITHUB_TOKEN=TOKEN
```


## Stacks & Tools
- React
- Yarn
- Typescript
- Apollo client
- Graphql-codegen
- TailwindCSS
- Vite
- Vitest
- Testing-library
- Dockerfile
- TSLint
- ESLint
- Prettier
- Node.js v20.4.0

## Setup and Running

### Installing Dependencies

```bash
yarn install
```

### Running the Development Server

```bash
yarn dev
```

### Running Tests

```bash
yarn test
```

### Generating Test Coverage

```bash
yarn coverage
```

### Dockerization

To build and run the app using Docker:

```bash
docker build -t react-search .
docker run -p 4173:4173 react-search
```