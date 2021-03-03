# Magneto Mutants

Desarrollo realizado con el lenguaje de programación **NodeJS**
- Para la creación del API, se hizo uso de las librerías express y body-parser
- Para interactuar con la base de datos mongo (alojada en el servicio mongo Atlas) se hizo uso de la librería mongoose.
- Para la creación de los test unitarios se hizo uso de mocha, complementado con supertest.

## Instalación en local

- clonar Repositorio
- npm install
- node api/index.js


## API desplegada en Google Cloud Engine

La APi fue desplegada en Google Cloud Engine: 

#La url de acceso al servicio post, para realizar la validación de las secuencias:

https://magnetoml.uc.r.appspot.com/api/mutant

<img src="/api/components/magneto/assets/images/validateMutant.JPG" alt="Servicio POST Google Cloud Engine"/>

#La url para acceder al servicio get, que permite consultar las estádisticas del servicio es:

https://magnetoml.uc.r.appspot.com/api/stats

<img src="/api/components/magneto/assets/images/LogCloudEngine.JPG" alt="Servicio GET Google Cloud Engine"/>


## Análisis problema

<img src="/api/components/magneto/assets/images/analisis.JPG" alt="Análisis solución Magneto Mutants"/>

Se buscó una forma de llegar a identificar si el usuario era o no mutante, basado en las condiciones y/o especificaciones del requerimiento. Inicialmente se pensó, en realizar recorridos verticales, horizontales, y diagonales de izquierda a derecha y de derecha a Izquierda, pero este proceso exigía bastantes líneas de código, se corria el riesgo de que se quedaran casos sin resolver y adicional a lo anterior, en la mayoría de los casos se tendrían que realizar muchas iteraciones.

Revisando otras posibles soluciones, se identificó que cada celda de la matriz puede hacer parte de un segmento válido "4 letras iguales", en máximo 8 direcciones posibles (como se ve en la imagen), lo que implica que es viable que analizando únicamente la celda inicial, o las primeras celdas de la matriz, podríamos llegar a identificar los 2 segmentos solicitados dismunuyendo así, la cantidad de procesos a realizar en cada solicitud.
 

## funcionamiento API

Desde la url publicada, postman o cualquier cliente de servicios rest (independiente del lenguage), se puede acceder a los siguientes servicios de la API:

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