# dojo-tests-orders-cases

## Step 1 Basic Build

1. Hacerle Fork a este repo https://github.com/jufegare000/dojo-tests-orders-cases
2. Hacerle pull a ese repositorio de manera local `git pull https://github.com/{username}/dojo-tests-orders-cases.git`
3. Crear una nueva rama que contenga tu deploy `git checkout -b feat/{nombre}-basic`
4. Hacer un push a github de esta rama `git push origin feat/{nombre}-basic` si tiene doble autenticación use el token en github. 
5. Crear un nuevo archivo .yml en la ruta `.github/workflows/` y pegar el código
```
name: Clean cloud cicd

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x]
    steps:
      - name: Hello world from clean cloud
        run: echo "hello world"
```
6. Crear un pull request desde la nueva rama hacia máster. 

## Step 2: Test Build

1. Crear una nueva rama llamada `git checkout -b feat/{nombre}-test` desde master
2. Pegar este código en un el archivo .yml dentro de la ruta `.github/workflows/`
```
name: Clean cloud cicd

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x]
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```
3. Hacer push de la nueva rama con `git push origin feat/{nombre}-test`
4. Crear pull request hacia master

## Step 3: Test + Basic build

1. Crear una nueva rama que se llame `git checkout -b feat/{nombre}-test_build`
2. Pegar este código en un el archivo .yml dentro de la ruta `.github/workflows/`
```
  name: Clean cloud cicd

  on:
    push:
      branches: [ master ]
    pull_request:
      branches: [ master ]

  jobs:
    test:
      runs-on: ubuntu-latest
      strategy:
        matrix:
          node-version: [14.x]
      steps:
        - uses: actions/checkout@v3
        - name: Use Node.js ${{ matrix.node-version }}
          uses: actions/setup-node@v3
          with:
            node-version: ${{ matrix.node-version }}
        - run: npm ci
        - run: npm test
    build:
      runs-on: ubuntu-latest
      steps:
        - name: A future implementation of a build stage
          run: echo "run build"
```
3. Hacer push de la nueva rama con `git push origin feat/{nombre}-test_build`
4. Crear pull request hacia master
