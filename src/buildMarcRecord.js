// Build MARC ISO 2709 record using 'marcjs'

import { Record } from "marcjs";
import sanatizeResponse from "./sanatizeResponse.js";
import { subfieldsMap, aggregateSubfields } from "./aggregateSubfields.js";

export default function buildMarcRecord(data, id) {
  // Check if value is an array or an object (atendimento Pergamum #162129)
  let responseArr = [];
  if (!Array.isArray(data)) {
    for (const obj of Object.values(data)) {
      responseArr.push(obj);
    }
  } else {
    responseArr = data;
  }
  responseArr = data;

  // Sanatize response and aggregate subfields data
  const sanatizedResponse = sanatizeResponse(responseArr);
  sanatizedResponse.forEach(aggregateSubfields);

  // Build the MARC record
  const record = new Record();
  record.leader = "     nam a22      a 4500";
  subfieldsMap.forEach((obj) => {
    if (parseInt(obj.paragrafo, 10) > 1 && parseInt(obj.paragrafo, 10) < 10) {
      record.append([
        obj.paragrafo.padStart(3, "0"),
        obj.subfieldData.replaceAll("#", " "),
      ]);
    } else {
      const arr = obj.subfieldData.split(/\$/g);
      arr.shift();
      const newArr = [];
      arr.forEach((subfield) => {
        newArr.push(subfield[0]);
        newArr.push(subfield.substring(1));
      });
      record.append([
        obj.paragrafo.padStart(3, "0"),
        obj.indicadores,
        ...newArr,
      ]);
    }
  });
  subfieldsMap.clear();

  // Ensure the record have the right control number (Pergamum does not always
  // respect that)
  record.delete(/001/);
  record.append(["001", id]);

  // record.as('text' or 'marcxml') for debugging purposes;
  return record;
}
