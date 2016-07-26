export class GeospatialController {
  constructor($scope,corporateData,leafletData) {
    'ngInject';
    this.corporateData=corporateData;
    this.employeesDataSets=corporateData.getEmployeesKeys();
    this.leafletData=leafletData;
    this.markers = L.markerClusterGroup();
    this.$scope=$scope;
  }
  add(){
    this.uploadError=false;
    this.uploadSuccess=false;
    let self=this;
    let file = document.getElementById('file').files[0],
      r = new FileReader();
    r.onloadend = function(e){
      let data = e.target.result;
      try{
        self.corporateData.uploadEmployeesCsv(file.name,data);
        self.uploadSuccess='The file '+file.name+' was uploaded successfully.';
        //Update the scope to show the succes message
        self.$scope.$digest();
        self.employeesDataSets=self.corporateData.getEmployeesKeys();
      }catch(err) {
        self.uploadError=err;
        //Update the scope to show the error message
        self.$scope.$digest();
      }
    };
    r.readAsBinaryString(file);
  }
  selectedDatasetChanged(){
    this.markers.clearLayers();
    L.Icon.Default.imagePath = '/assets/images';
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

