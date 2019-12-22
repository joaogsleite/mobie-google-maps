
document.getElementsByTagName('button')[0].onclick = function () {
  generateCSV(document.getElementsByTagName('textarea')[0].value)
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function getCategory(point){
  operator = point.operator.toLowerCase()
  if (operator.includes('piloto')) {
    return 'Rede Piloto'
  } else if (operator.includes('galp')) {
    return 'Galp'
  } else if (operator.includes('prio')) {
    return 'PRIO'
  } else if (operator.includes('edp')) {
    return 'EDP'
  } else {
    return 'Others'
  }
}

function generateCSV(jsonstring) {
  const json = JSON.parse(jsonstring);
  const points = []
  json.data.forEach((point) => {
    const pointToAdd = {
      Latitude: point.location.latitude,
      Longitude: point.location.longitude,
      Name: point.name, 
      Type: point.chargeType,
      Operator: point.operator,
      Category: getCategory(point),
    }
    const existing = points.find((p) => {
      return p.Latitude === pointToAdd.Latitude && 
        p.Longitude === pointToAdd.Longitude
    })
    if (!existing) {
      points.push(pointToAdd)
    }
  })
  const data = 
    Object.keys(points[0]).map((key)=>key).join(',') 
    + '\n' +
    points.map((point) =>
      Object.keys(point).map((key) => 
        point[key]
      ).join(',')
    ).join('\n')

  download('map.csv', data)
}
