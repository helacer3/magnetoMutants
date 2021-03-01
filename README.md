# Magneto Mutants

Desarrollo realizado con el lenguaje de programación **NodeJS**
- Para la creación del API, se hizo uso de las librerías express y body-parser
- Para interactuar con la base de datos mongo (alojada en el servicio mongo Atlas) se hizo uso de la librería mongoose.
- Para la creación de los test unitarios se hizo uso de mocha, complementado con supertest.


## URL Base de Acceso

La URL base de acceso, al servicio en cloud computing es: 


## Instalación en local

- clonar Repositorio
- npm install
- nodemon api/index.js


## funcionamiento API

<img src="/api/components/magneto/assets/images/analisis.JPG" alt="Análisis solución Magneto Mutants"/>

Desde la url publicada, o postman, o cualquier cliente de servicios rest (independiente del lenguage), se puede acceder a los siguientes servicios de la API:

**- MUTANT**
* method: POST
* url: http://localhost:3000/api/mutant
* sample Request:  
```json
	{ "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }
```
* sample Response:  
```json
	{"error":false,"status":200,"body":{"isMutant":true,"result":"Si es Mutante"}}
```

**- STATS**
* method: GET
* url: http://localhost:3000/api/stats
* sample Response: 
```json
	{"error":false,"status":200,"body":{"count_mutant_dna":1,"count_human_dna":1, "ratio": 0.5 }}
```

### ejecutar pruebas unitarias

Nos ubicamos por consola, en la raiz del proyecto y ejecutamos el comando: **mocha**

<img src="/api/components/magneto/assets/images/pruebasunitarias.JPG" alt="Resultado Pruebas Unitarias Mocha"/>