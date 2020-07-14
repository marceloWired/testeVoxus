function parseData(date) {
    let dateAux = date.split('/');
    let dateFormated = new Date(dateAux[2], dateAux[1], dateAux[0]);

    return dateFormated;
}

module.exports = parseData;