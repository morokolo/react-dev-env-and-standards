#### react-dev-env-and-standards

This project is a base for Unit tests or Intergration tests(we are not going to be technical about the terminology) as the result is to make our code satisfactory to business requirements by catching bugs incase we make a breaking change to our pre-existing code.

(https://www.youtube.com/watch?v=7uKVFD_VMT8)

#### Initialising a project

```bash
 npx create-next-app .
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#### Tools

Setup Testing Env: Jest, React Testing Library, eslint, GitHub Actions -React.js Testing

### Setup Steps

#### Step 1: Install ts-jest and dependencies

[`ts-jest`](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation) Documentation

```bash
npm install --save-dev jest typescript ts-jest @types/jest
```

Once the dependencies are installed, create a basic jest configuration file. This file will inform jest about how to handle .ts files correctly

```bash
npx ts-jest config:init
```

You should see a jest.config.js file in your root directory.

#### Step 2: Running the sample test in sum.spec

Update the package.json with this additional line

```bash
"test": "jest"
```

Now, Run the test script

```bash
npm run test
```

We should have our tests running successfully

#### Confirm if JEST and TS-JEST are working

Go to the sum.spec file and add the following,

```bash
    const a : string = 5;
    expect(a).toBe(5)
```

Run your tests again and this should fail!!!!
If this fails, we can confirm that our configuration was successful.

#### Step 2: Install React Testing Library

[`React Testing Library`](https://testing-library.com/docs/react-testing-library/intro/) Documentation

Install the react testing library with user event, dom and jest-dom with the below command:

```bash
npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/dom @testing-library/jest-dom
```

#### Step 2: Extend the jest config

After adding .tsx component, your tests will fail, at this point this is caused by the below rule:

```bash
 "jsx": "preserve",
```

create a new file called tsconfig.jest.json in your root directory, to extend the original tsconfig

in the tsconfig.jest.json, we are going to override the jsx:preserve rule

{
"extends": "./tsconfig.json",
"compilerOptions": {
"jsx": "react-jsx"
}
}

Go to the jest.config.js file in your root and override the jest globals rule option: (https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig)

```
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
  },
```

Change the testEnvironment variable in the above file:

```
 testEnvironment: "jsdom",
```

This library somehow does not get installed:

```
npm install --save-dev jest-environment-jsdom
```

##### Setup Jest environment

Add this in your jest.config.json file after the globals

```
 setupFilesAfterEnv: ["./src/jest.setup.ts"],
```

create a file in your src directory, src/jest.setup.ts and add the following:

```
import "@testing-library/jest-dom";
```

run npm test, your tests should pass and confirm that React-testing-Library is setup correctly

#### Step 3: Eslint setup

```
npx eslint --init
```

update your eslint.js with the last 2 configs

```
 "extends": [
        ...
         "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "next",
    "next/core-web-vitals",
    ],
```

remove the env and plugin objects

update the parserOptions by adding the below:

```
  parserOptions: {
    project: './tsconfig.json',
    ...
  },
```

If you get the missing return type, turn it off it in the rules

In order for your lint to look into the src directory change the below in your package.json

```
"lint": "next lint --dir src",
```

run linting command and it should not fail

test by adding

```
let c = 5;
```

it should fail and suggest using const and not let for declarations

Next,

#### Step 3: Eslint jest

This will help us use the proper matchers i.e toBeNull over toBe(null)

```
npm i --save-dev eslint-plugin-jest
```

go to your .eslintrc and add this

```
    "plugin:jest/recommended",
    "plugin:jest/style",
```

How to make it fail, it will tell you not to have focused test
change it() to fit()

#### More eslint benefits with react-testing-library eslint plugin

add to the existing

```
  extends: [
   ...
    "plugin:testing-library/react",
   ...
  ],
```

npm install

```
npm install --save-dev eslint-plugin-testing-library
```

to test this , add a debug in the code and it will complain about debug statements

```
screen.debug();
```

#### Adding commit hooks

Everytime we commit , it will run lint fixes and prettier for us

```
npx mrm@2 lint-staged
```

then

```
 npm install lint-staged prettier --save-dev
```

in your .husky directory you will find a pre-commit file, update it as follows

change this

```
npx lint-staged
```

to

```
npm run lint-staged
```

Add the lint staged script to the package.json

```
 "lint-staged": "lint-staged"
```

at the bottom of the package json, update the lint-staged object

```
  "lint-staged": {
    "*.(tsx|ts)": "eslint --cache --fix",
    "*": "prettier --write --ignore-unknown"
  }
```

At this point when you commit your code, lint and prettier will run

## Github Hooks

Push your code

Go to github

go to Actions and create a Nodejs workflow

rename yourworkflow: github.yml

set all branches to run this

```
    pull_request:
    branches: [ "*" ]
```

change runs-on: ubuntu-latest to

```
 runs-on: ${{matrix.os}}
```

define the os matrix just below the node-version matrix as below

```
os: [ubuntu-lates, windows-latest, macos-latest]
```

update the commands that we will be running to this, add the build stage if necessary

```
    - run: npm ci
    - run: npm run lint
    - run: npm run test:ci
```

## Add Jest code coverage threshold

in your jest.config.js, add the following

```
coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

```

NB: do a gitpull so you can get your github actions

add the test:ci script

## Bootsrapping

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
