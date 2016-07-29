export class GeospatialController {
  constructor($scope,corporateData,leafletData,$filter) {
    'ngInject';
    let self=this;
    this.corporateData=corporateData;
    this.employeesDataSets=corporateData.getEmployeesKeys();
    this.leafletData=leafletData;
    this.markers = L.markerClusterGroup();
    this.$scope=$scope;
    this.dataSelected="MOCK_EMPLOYEES.csv";
    this.selectedDatasetChanged();
    this.$filter=$filter;
    this.dataCalled=10;
    this.dataStart=0;
    //Make polling system with the mock data
    this.refreshIntervalId =setInterval(function(){ self.selectedDatasetChanged() }, 1000);
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
        self.employeesDataSets=self.corporateData.getEmployeesKeys();
        //Update the scope to show the succes message
        self.$scope.$digest();
      }catch(err) {
        self.uploadError=err;
        //Update the scope to show the error message
        self.$scope.$digest();
      }
    };
    r.readAsBinaryString(file);
  }
  selectedDatasetChanged(){
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
      if(this.dataSelected=='MOCK_EMPLOYEES.csv'){
        let dataTitle=this.$filter('limitTo')(data.split(/\r?\n/), 1, 0);
        //To make the polling, the data is sliced and new data is added with each call
        data=this.$filter('limitTo')(data.split(/\r?\n/), this.dataCalled, this.dataStart);
        data=dataTitle.concat(data);
        data=data.join("\n");
        this.dataStart=this.dataStart+10;
      }else{
        //If real data is selected the polling is interrupted
        clearInterval(this.refreshIntervalId);
        this.markers.clearLayers();
      }
      geoLayer.addData(data);
      this.markers.addLayer(geoLayer);
      this.leafletData.getMap().then((map)=> {
        map.addLayer(this.markers);
        //map.fitBounds(this.markers.getBounds());
      });
    });
  }
}

