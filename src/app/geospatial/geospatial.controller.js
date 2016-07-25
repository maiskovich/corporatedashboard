export class GeospatialController {
  constructor($scope,corporateData,leafletData) {
    'ngInject';
    this.corporateData=corporateData;
    this.employeesDataSets=corporateData.getEmployeesKeys();
    this.leafletData=leafletData;
    this.markers = L.markerClusterGroup();
  }
  add(){
    let self=this;
    let file = document.getElementById('file').files[0],
      r = new FileReader();
    r.onloadend = function(e){
      let data = e.target.result;
      try{
        self.corporateData.uploadEmployeesCsv(file.name,data);
      }catch(err) {
        self.uploadError=err;
        //Update the scope to show the error message
        self.$scope.$digest();
      }
    };
    r.readAsBinaryString(file);
    this.employeesDataSets=self.corporateData.getEmployeesKeys();
  }
  selectedDatasetChanged(){
    this.markers.clearLayers();
    let geoLayer = L.geoCsv(null, {firstLineTitles: true,
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
    this.corporateData.getEmployeesCsv(this.dataSelected).then((data)=> {
      geoLayer.addData(data);
      this.markers.addLayer(geoLayer);
      this.leafletData.getMap().then((map)=> {
        map.addLayer(this.markers);
        map.fitBounds(this.markers.getBounds());
      });
    });
  }
}

