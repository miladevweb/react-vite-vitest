# React + Vite + Vitest

- First of all, we have to install Vitest as development dependecy:

```bash
npm install -D vitest @types/node
```

<br>

- Second, let's intall React Testing Library:

```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

<br>

- Next, we need to install jsdom and ts-jest **instead of babel for JavaScript projects**:

```bash
npm install -D jsdom ts-jest
```

<br>

- Now, add this in your **vite.config.ts** file:

```typescript
// vite.config.ts
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  /* Testing */
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },

  /* Aliases */
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
```

    This setup will add an alias and a setup file for our project environment.

<br>

- Then, create a **vitest.setup.ts** file in the root of your project and add the following code, this will make sure that the jsdom environment is set up correctly:

```typescript
// vitest.setup.ts
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})
```

<br>

- Vite create 3 tsconfig files, I prefer to have 1 tsconfig, but this is optional, you only need to add 2 lines of code to your **tsconfig.app.json** and **tsconfig.json** or delete them if you wanna have only one tsconfig file:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "esModuleInterop": true, // add this line

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Aliases */
    "baseUrl": "./src",
    "paths": { "@/*": ["./*"] },

    /* Types for Vitest */
    "types": ["vitest/globals", "@testing-library/jest-dom/vitest"] // add this line
  },

  "include": ["src", "vite.config.ts", "vitest.setup.ts"] // add this line
}
```

<br>

- As you can see, in our tsconfig.json file we've added the esModuleInterop option, types for Vitest and Aliases to have a better experience.

<br>

- Then, we need to add a linter to our project

```bash
npm install -D eslint-plugin-jest-dom eslint-plugin-testing-library
```

- Add this to your **eslint.config.js**:

```javascript
{
  // ....
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // Add these lines
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended'
  ],
  // ....
}
```

<br>

- Finally, we need to add a script to our **package.json** file:

```json
  "scripts": {
    // ....
    "test": "vitest",
  },
```

- Run your tests with `npm run test`

<br>

## Optional

- For SVG as React Components and CSS Modules, you should add these libraries:

```bash
npm install -D vite-plugin-svgr identity-obj-proxy
```

- Then, modify your **vite.config.ts**:

```typescript
// vite.config.ts
/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()], // add this line

  /* Testing */
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',

    // add this property
    alias: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
  },

  /* Aliases */
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
```
