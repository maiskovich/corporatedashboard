export class UploadfilesController {
  constructor($scope,corporateData) {
    'ngInject';
    this.corporateData=corporateData;
  }
  add(){
    let self=this;
    let file = document.getElementById('file').files[0],
      r = new FileReader();
    console.log(file.name);
    r.onloadend = function(e){
      let data = e.target.result;
      self.corporateData.uploadEmployeesCsv(file.name,data);
    }
    r.readAsBinaryString(file);
  }
}

