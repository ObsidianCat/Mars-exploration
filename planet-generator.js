exports.planetGenerator = line => {
  //We start from 0 to the number including. So number 5 means that there will be 6 columns
  line = line.trim().split(" ");
  const xColumns = Number(line[0]);
  const yRows = Number(line[1]);

  const map = [];
  for (let rowCount = 0; rowCount <= yRows; rowCount++) {
    const curRow = [];
    for (let colCount = 0; colCount <= xColumns; colCount++) {
      curRow.push(0);
    }
    map.push(curRow);
  }

  return map;
};
