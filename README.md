## **1\. Folder Structure**

\-vscode

\--settings.json -> IDE level settings

\-public -> boilerplate public folder that comes with create-react-app

\-src

\--components

\---home

\----Home.tsx -> Home component of the react app

\----Home.test.tsx -> Test file for Home.tsx

\--config

\---supabaseClient.ts -> supabase client configuration

\--types

\---enum.ts -> enum declaration

\---types.ts -> type declaration

\--utils

\---supabase.utils.ts -> supabse helper functions

\--App.css -> Styles

\--App.test.tsx -> Test file for App.tsx

\--index.css -> Test file for index.css

\--index.tsx -> Entry point of react app

\--react-app--env.d.ts -> boilerplate from create-react-app

\--reportWebVitals.ts -> boilerplate from create-react-app

\--setupTests.ts -> boilerplate from create-react-app

\-env -> environment file

\-.eslintrc.js -> eslint configuration

\-.prettierrc.json -> prettier configuration

\-README.md -> readme file

\-package-lock.json -> package.json lockfile

\-package.json -> package file

\-tailwind.config.js -> tailwind configuration file

\-tsconfig.json -> ts config file

## **2\. Supabase Services Used**

(a) Bucket -> for storing files

(b) Database (PostgreSQL) -> for storing user data

## 3\. React Libraries used

"@adimis/react-formix": "^0.0.9", -> for dynamic form handling

"@emotion/react": "^11.11.4", -> Material UI dependency

"@emotion/styled": "^11.11.5" -> Material UI dependency

"@mui/lab": "^5.0.0-alpha.170", -> Material UI dependency

"@mui/material": "^5.15.18", -> Material UI dependency

"@mui/styled-engine-sc": "^6.0.0-alpha.18", -> Material UI dependency

"@mui/x-date-pickers": "^7.5.0", -> Material UI dependency

"@supabase/supabase-js": "^2.43.2", -> Supabase library

"@testing-library/jest-dom": "^5.17.0", -> Jest testing library

"@testing-library/user-event": "^13.5.0", -> user event for testing

"@types/jest": "^27.5.2", -> Jest testing library

"@types/node": "^16.18.97", -> types file

"@types/react": "^18.3.2", -> types file

"@types/react-dom": "^18.3.0", -> react-dom

"dayjs": "^1.11.11", -> for handling dates

"react": "^18.3.1", -> React library

"react-dom": "^18.3.1", -> React DOM library

"react-hook-form": "^7.51.4", -> React hook form library

"react-router-dom": "^6.23.1", -> React router dom

"react-scripts": "5.0.1", -> React scripts library

"styled-components": "^6.1.11", -> styling in JS

"tailwindcss-animate": "^1.0.7", -> tailwind library

"typescript": "^4.9.5", -> typescript

"web-vitals": "^2.1.4", -> web vitals library

"zod": "^3.23.8" -> for schema validation

## **3\. Code linting and Quality**

(a) EsLint -> For code linting and quality

(b) Prettier -> For code styling

## **4\. Technical Features**

(a) Integration with Supabase

(b) Insertion into PostgreSQL with Supabase

(c) Bucket service from Supabase

(d) Update into PostgreSQL with Supabase

(e) Form Display with validations as per requirement
