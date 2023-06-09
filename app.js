#!/usr/bin/env node
/* Description: Build MARC bibliographic records from Pergamum APIs.
  This tool builds MARC bibliographic records from Pergamum APIs.

  Dependencies:
  * axios (https://axios-http.com)
  * marcjs (https://www.npmjs.com/package/marcjs)

  Author: jaideraf
*/

import express from 'express';
import routes from './routes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(8080, () => {
  console.log('Servidor executando na porta 8080');
  console.log('Acesse http://localhost:8080');
});
