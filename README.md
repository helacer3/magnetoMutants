# Magneto Mutants

Desarrollo realizado con el lenguaje de progración **NodeJS**
- Para la creación del API se hizo uso de las librerías express y body-parser
- Para interactuar con la base de datos mongo (alojada en el servicio mongo Atlas) se hizo uso de la librería mongoose.
- Para la creación de los test unitarios se hizo uso de mocha, complementado con supertest.


## Instalación

- clonar Repositorio
- npm install
- nodemon api/index.js


## funcionamiento API

Desde postman o un cliente de servicios rest (independiente del lenguage), se puede acceder a los siguientes servicios de la API:

**- MUTANT**
* method: POST
* url: http://localhost:3000/api/mutant
* sample Request:  ```json
	{ "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }
```
* sample Response:  ```json
	{"error":false,"status":200,"body":{"isMutant":true,"result":"Si es Mutante"}}
```

**- STATS**
* method: GET
* url: http://localhost:3000/api/stats
* sample Response: ```json
	{"error":false,"status":200,"body":{"count_mutant_dna":1,"count_human_dna":1, "ratio": 0.5 }}
```

### ejecutar pruebas unitarias

Nos ubicamos en la raiz del proyecto y ejecutamos el comando: **mocha**