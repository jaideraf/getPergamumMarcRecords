// Sanitize the returned response from the api/acervo/${codAcervo}/marc

export default function sanatizeResponse(responseArr) {
    responseArr.forEach((obj) => {
        const newObj = obj;
        if (!newObj.descricao)
            newObj.descricao = newObj.texto_descricao;
        newObj.descricao = newObj.descricao?.trim();
        if (newObj.pontuacao === null)
            newObj.pontuacao = '';
        if (newObj.pontuacao)
            newObj.pontuacao = newObj.pontuacao.trimEnd();
        if (newObj.indicador1 === null || newObj.indicador1 === '  ') {
            newObj.indicador1 = ' ';
        }
        else {
            newObj.indicador1 = newObj.indicador1?.trim();
        }
        if (newObj.indicador2 === null || newObj.indicador2 === '  ') {
            newObj.indicador2 = ' ';
        }
        else {
            newObj.indicador2 = newObj.indicador2?.trim();
        }
        if (newObj.indicador1 !== undefined && newObj.indicador2 !== undefined) {
            newObj.indicadores = newObj.indicador1 + newObj.indicador2;
        }
        if (newObj.seq_secao === null)
            newObj.seq_secao = '0';
        if (newObj.secao === null)
            newObj.secao = '0';
        newObj.subfieldData = `${(newObj.secao === '0') ? '' : '$' + newObj.secao}${newObj.descricao}${newObj.pontuacao}`;
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
