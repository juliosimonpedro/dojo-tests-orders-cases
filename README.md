# dojo-tests-orders-cases

Steps Github actions basic build

1. Hacerle Fork a este repo https://github.com/jufegare000/dojo-tests-orders-cases
2. Hacerle pull a ese repositorio de manera local `git pull https://github.com/{username}/dojo-tests-orders-cases.git`
3. Crear una nueva rama que contenga tu deploy `git checkout -b feat/{nombre}-deploy`
4. Hacer un push a github de esta rama `git push origin feat/{nombre}-deploy` si tiene doble autenticación use el token en github. 
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