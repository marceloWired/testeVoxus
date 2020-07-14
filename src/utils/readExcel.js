var XLSX = require('xlsx');

module.exports = function (pathToFile) {
    var workbook = XLSX.readFile(pathToFile, { cellDates: true });

    var sheetNameList = workbook.SheetNames;
    var xlsData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
    var objectData = xlsData[0];

    return objectData;
}
