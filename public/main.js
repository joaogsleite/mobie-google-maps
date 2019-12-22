const inputarea = document.getElementsByTagName('textarea')[0];
const button = document.getElementsByTagName('button')[0];
const outputarea = document.getElementsByTagName('textarea')[1]

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

button.onclick = function () {
  const jsonstring = inputarea.value
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
  const csv = 
    Object.keys(points[0]).map((key)=>key).join(',') 
    + '\n' +
    points.map((point) =>
      Object.keys(point).map((key) => 
        point[key]
      ).join(',')
    ).join('\n')
  outputarea.innerHTML = csv
}
