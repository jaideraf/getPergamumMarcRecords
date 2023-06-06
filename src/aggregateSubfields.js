const subfieldsMap = new Map();

const aggregateSubfields = function(obj) {
    const key = obj.paragrafo + obj.seq_paragrafo;
    if (!subfieldsMap.has(key)) {
        subfieldsMap.set(key, { ...obj });
    }
    else {
        const newSubfieldData = subfieldsMap.get(key).subfieldData + obj.subfieldData;
        subfieldsMap.set(key, { ...subfieldsMap.get(key), subfieldData: newSubfieldData });
    }
}

export { subfieldsMap, aggregateSubfields };
