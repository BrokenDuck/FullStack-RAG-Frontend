# FullStack RAG Frontend

This is a basic frontend for the RAG application. The main functionalities are:
- A chat with the uploaded documents with fully implemented api streaming using [Event Sources](https://developer.mozilla.org/en-US/docs/Web/API/EventSource).
- Displaying document extracts to ground the answer
- Selecting between fast answers and accuracte answers with the `think deeper` button
- An interface to upload multiple pdfs to the backend that will be parsed and chunked

## What is inside?

This project uses many tools like:

- [Vite](https://vitejs.dev)
- [ReactJS](https://reactjs.org)
- [ReactRouter](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [Tailwindcss](https://tailwindcss.com)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)

## Getting Started

### Requirements

You will need to have `nodejs>=20` (LTS) installed.

### Running the website locally

Start by enabling corepack and installing the packages:
```bash
corepack enable
yarn
```

(Optional) If you are using VSCode, the editor might start complaining it cannot find any of the modules, then
1. Make sure you have the `ZipFS` extension installed
2. Run `yarn dlx @yarnpkg/sdks vscode`
3. Change your typescript version to the 'Workspace version'

To view the website locally:
```bash
yarn build
yarn serve
```

### Developping the website

To run the development server run:
```bash
yarn dev
```

To run the tests:
```bash
yarn test
```
