import axios from 'axios';
import buildMarcRecord from '../buildMarcRecord.js';

export const acervoHome = (_req, res) => {
  res.send(
    `Envie pelo menos um código de acervo e um endereço do Pergamum (OPAC). <br>
    Opcionalmente, um media type (application/xml, application/marc, text/plain, application/json). <br>
    Exemplo: <a href='http://localhost:8080/acervo/339742?url=https://pergamum.ufsc.br&media_type=application/xml'>http://localhost:8080/acervo/339742?url=https://pergamum.ufsc.br&media_type=application/xml</a>`,
  );
};

export const acervoId = (req, res) => {
  const { id } = req.params;
  const { url } = req.query;
  const mediaType = req.query.media_type;

  // Get the data
  axios
    .get(`${url}/api/acervo/${id}/marc`)
    .then((response) => {
      // handle success
      const record = buildMarcRecord(response.data, id);

      switch (mediaType) {
        case 'application/xml':
          res.type('application/xml');
          res.send(record.as('marcxml'));
          break;
        case 'application/marc':
          res.type('application/marc');
          res.set('Content-Disposition', `attachment; filename="${id}.mrc"`);
          res.send(record.as('iso2709'));
          break;
        case 'text/plain':
          res.type('text/plain');
          res.send(record.as('text'));
          break;
        case 'application/json':
          res.type('application/json');
          res.send(record.as('json'));
          break;
        default:
          res.type('application/json');
          res.send(record.as('mij'));
      }
    })
    .catch((error) => {
      // handle error
      console.log(error);
      if (error.response.status === 404) {
        console.log(error.response.status);
        res.sendStatus(error.response.status);
      }
    });
};
