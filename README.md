# getPergamumMarcRecords

A tool to get [MARC (Machine-Readable Cataloging)](https://en.wikipedia.org/wiki/MARC_standards) bibliographic records from Pergamum API in many formats (MARC ISO 2709, MARCXML, JSON).

If you want to use a Python version that uses Pergamum Web Service, see https://github.com/vitorsilverio/libraryapi.

## Running

### Using Docker

- Get the source code: `git clone https://github.com/jaideraf/getPergamumMarcRecords && cd getPergamumMarcRecords`
- `docker build . -t jaideraf/getpergamummarcrecords`
- `docker run -p 8080:8080 -d jaideraf/getpergamummarcrecords`

or

- `docker-compose up -d`

### Locally

- Make sure you have [Node.js](https://nodejs.org/) 18.16.0+ installed.
- Get the source code: `git clone https://github.com/jaideraf/getPergamumMarcRecords && cd getPergamumMarcRecords`
- Install dependencies: `npm install`
- Start the application: `npm start`

Check it out: http://localhost:8080/acervo/339742?url=https://pergamum.ufsc.br&media_type=application/xml

## Demo

### Examples

- A MARC ISO 2709 record from Pergamum:

<http://localhost:8080/acervo/339742?url=https://pergamum.ufsc.br&media_type=application/marc>

- A MARCXML record from Pergamum:

<http://localhost:8080/acervo/339742?url=https://pergamum.ufsc.br&media_type=application/xml>

- A MARC text record (YAZ style) from Pergamum:

<http://localhost:8080/acervo/339742?url=https://pergamum.ufsc.br&media_type=text/plain>

- A JSON MARC record from Pergamum (default, if no "media_type" is specified or if it is "application/json"):

<http://localhost:8080/acervo/339742?url=https://pergamum.ufsc.br&media_type=application/json>

- A JSON MARC record ([MIJ style](https://github.com/marc4j/marc4j/wiki/MARC-in-JSON-Description)) from Pergamum (default, if no "media_type" is specified):

<http://localhost:8080/acervo/339742?url=https://pergamum.ufsc.br>
