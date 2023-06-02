# dojo-tests-orders-cases

Para todos los pasos de este dojo usted debe de contar con cuenta en GitHub y además realizar los siguientes pasos básicos

1. Hacerle Fork a este repo https://github.com/jufegare000/dojo-tests-orders-cases
2. Hacerle pull a ese repositorio de manera local `git pull https://github.com/{username}/dojo-tests-orders-cases.git`

Recuerde que si usted cuenta con doble autenticación, en los pasos de realizar push; debe de utilizar en su password un Token obtenido desde los developer settings en github.

## Step 1 Basic Build

En este step se hará un build básico en dónde el único step es un echo "hello world" el cual se va a poder revisar desde GitHub Actions.

1. Crear una nueva rama desde master `git checkout -b feat/{nombre}-basic`
2. Crear un nuevo archivo .yml en la ruta `.github/workflows/` y pegar el código
```
name: Clean cloud CI/CD Basic Build

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
3. Hacer push de la nueva rama con `git push origin feat/{nombre}-build`
4. Crear un pull request desde la nueva rama hacia máster. 

## Step 2: Test Build


1. Crear una nueva rama llamada `git checkout -b feat/{nombre}-test` desde master
2. Pegar este código en un el archivo .yml dentro de la ruta `.github/workflows/`
```
name: Clean cloud CI/CD Test

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
  name: Clean cloud CI/CD Step 3 Build and Test

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

## Step 4: Deploy en AWS

En este paso, se harán los test y el build mencionados en los pasos anteriores, pero se le va a agregar el deploy en AWS de una lambda que contiene una función de js llamada `handler`. 

1. Crear una nueva rama que se llame `git checkout -b feat/{nombre}-aws_deploy`
2. crear un archivo que se llame `app.js` en la ruta `src/`
3. Pegar el siguiente código en el archivo 
```
export const handler = async(event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(event),
    };
    return response;
};
```
4. Posteriormente crear el archivo .yml que se llame `serverless.yml`
5. Pegar el siguente código y tener en cuenta que donde dice `{nombre}` se debe de remplazar por su nombre o algo que permita que usted identifique su lambda
```
service: clean-cloud-cicd-{nombre}
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs14.x

functions:
  {nombre}-function-cicd:
    handler: src/app.handler
```
6. Posteriormente cree el archivo de worfklow en las rutas especificadas anteriormente `.github/workflows`
7. Pegue en él el siguiente código
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
      needs: [test]
      runs-on: ubuntu-latest
      steps:
        - name: A future implementation of a build stage
          run: echo "run build"
    deploy:
      needs: [build]
      runs-on: ubuntu-latest
      strategy:
        matrix:
          node-version: [14.x]
      steps:
        - uses: actions/checkout@v3
        - name: Deploy to AWS
          run: echo "Installing serverless framework"
        - name: Install Serverless Framework
          run: npm install -g serverless
        - name: Deploy to AWS Lambda
          run: serverless deploy
          env:
            AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
            AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```
8. Fue compartido un arhcivo csv llamado `lambda-deployer_accessKeys.csv` el cual contiene tokens de acceso de un usuario de IAM creado específicamente para este dojo, abra este archivo.
9. Dirigase a <i> settings > Secrets and variables > Actions </i>
10. Añadirá dos secretos donde dice `New Repository secret` en los cuales pondrá como nombre `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY` en dos secretos aparte, y en secreto pondrá el valor que aparece en el archivo `.csv`
11. Hacer push de la nueva rama con `git push origin feat/{nombre}-aws-deploy`
12. Realizar pull request con master