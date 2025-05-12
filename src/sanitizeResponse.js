/* eslint-disable prefer-template */
// Sanitize the returned response from the api/acervo/${codAcervo}/marc

export default function sanitizeResponse(responseArr) {
  responseArr.forEach((obj) => {
    let apiVersion = '10.8.1';
    const newObj = obj;
    // Pergamum >= 10.8.2
    if (newObj.descricao_legivel) {
      apiVersion = '10.8.2';
      newObj.descricao_legivel = newObj.descricao_legivel.replace(/(\$.)\s/g, '$1');
      newObj.descricao_legivel = newObj.descricao_legivel.replace(/\u003Cbr \/\u003E/g, '');
      newObj.descricao_legivel.trim();
    }
    if (!newObj.descricao) newObj.descricao = newObj.texto_descricao;
    newObj.descricao = newObj.descricao?.trim();
    if (newObj.pontuacao === null) newObj.pontuacao = '';
    if (newObj.pontuacao) newObj.pontuacao = newObj.pontuacao.trimEnd();
    if (newObj.indicador1 === null || newObj.indicador1 === '  ') {
      newObj.indicador1 = ' ';
    } else {
      newObj.indicador1 = newObj.indicador1?.trim();
    }
    if (newObj.indicador2 === null || newObj.indicador2 === '  ') {
      newObj.indicador2 = ' ';
    } else {
      newObj.indicador2 = newObj.indicador2?.trim();
    }
    if (newObj.indicador1 !== undefined && newObj.indicador2 !== undefined) {
      newObj.indicadores = newObj.indicador1 + newObj.indicador2;
    }
    if (newObj.seq_secao === null) newObj.seq_secao = '0';
    if (newObj.secao === null) newObj.secao = '0';

    if (apiVersion === '10.8.1') {
    // Pergamum <= 10.8.1
      newObj.subfieldData = `${newObj.secao === '0' ? '' : '$' + newObj.secao}${newObj.descricao
      }${newObj.pontuacao}`;
    } else {
    // Pergamum >= 10.8.2
      newObj.subfieldData = `${newObj.descricao_legivel}`;
    }
    newObj.paragrafo = newObj.paragrafo.padStart(3, '0');
    delete newObj.campo_fixo;
    delete newObj.texto_descricao;
    delete newObj.indicador1;
    delete newObj.indicador2;
    delete newObj.descricao;
    delete newObj.pontuacao;
  });
  return responseArr;
}
