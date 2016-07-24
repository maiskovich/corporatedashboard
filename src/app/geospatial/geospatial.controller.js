export class GeospatialController {
  constructor($scope,corporateData,leafletData) {
    'ngInject';
      var geoLayer = L.geoCsv(null, {firstLineTitles: true,
        fieldSeparator: ',',
        lineSeparator: '\n',
        onEachFeature: function (feature, layer) {
          var popup = '';
          for (var clave in feature.properties) {
            var title = geoLayer.getPropertyTitle(clave);
            popup += '<b>'+title+'</b><br />'+feature.properties[clave]+'<br /><br />';
          }
          layer.bindPopup(popup);
        }});
    corporateData.getEmployeesCsv('MOCK_EMPLOYEES.csv').then((data)=> {
      console.log(data);
      var markers = L.markerClusterGroup();
      geoLayer.addData(data);
      markers.addLayer(geoLayer);
      leafletData.getMap().then((map)=> {
        map.addLayer(markers);
        map.fitBounds(markers.getBounds());
      });
    });

  }
}

