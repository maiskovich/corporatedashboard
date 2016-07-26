export class CorporateDataService {
  constructor ($log, $http,localStorageService,$timeout) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.localStorageService=localStorageService;
    this.$timeout=$timeout;
  }
  //List the keys of all the data in local storage
  getDatasetsKeys(){
    let keys=this.localStorageService.keys();

    return keys;
  }
  removeDataset(dataset){
    return this.localStorageService.remove(dataset);
  }
  //Upload employees csv file and store in local storage
  uploadEmployeesCsv(fileName,data) {
    let self=this;
    let parsedData=(Papa.parse(data));
    parsedData=parsedData.data[0];
    //Check if there is a file with the same name
    if(this.localStorageService.keys().indexOf('employees.'+fileName)!=-1){
      throw "There is already a file with the same name.";
    }else
    //If all of the fields exists
    if(parsedData.indexOf('lat')!=-1 && parsedData.indexOf('lng')!=-1){
      self.localStorageService.set('employees.'+fileName, data);
    }
    //If some of the fields doesnt exist, throw error, giving feedback of which fields are required in the file
    else{
      let missingFields='';
      if(parsedData.indexOf('lat')==-1){
        missingFields+='lat ';
      }
      if(parsedData.indexOf('lng')==-1){
        missingFields+='lng ';
      }
      throw "Missing fields "+missingFields+"in CSV file.";
    }
  }
  getEmployeesCsv(key){
    let self=this;
    if(key=='MOCK_EMPLOYEES.csv'){
      return this.$http.get('/data/MOCK_EMPLOYEES.csv')
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          this.$log.error('XHR Failed for get employees data.\n' + angular.toJson(error.data, true));
        });
    }else{
      return this.$timeout(function(){
        return self.localStorageService.get(key);
      },500);
    }
  }
  getEmployeesKeys(){
    let keys=this.localStorageService.keys();
    keys = keys.filter(function (item) {
      return item.indexOf("employees.") == 0;
    });
    return keys;
  }
  //Upload issues csv file and store in local storage
  uploadIssuesCsv(fileName,data) {
    let self=this;
    let parsedData=(Papa.parse(data));
    parsedData=parsedData.data[0];
    //Check if there is a file with the same name
    if(this.localStorageService.keys().indexOf('issues.'+fileName)!=-1){
      throw "There is already a file with the same name.";
    }else
    //If all of the fields exists
    if(parsedData.indexOf('submissiondate')!=-1 && parsedData.indexOf('customername')!=-1
      && parsedData.indexOf('customeremail')!=-1
      && parsedData.indexOf('description')!=-1
      && parsedData.indexOf('status')!=-1
      && parsedData.indexOf('closeddate')!=-1
      && parsedData.indexOf('employeename')!=-1){
      self.localStorageService.set('issues.'+fileName, data);
    }
    //If some of the fields doesnt exist, throw error, giving feedback of which fields are required in the file
    else{
      let missingFields='';
      if(parsedData.indexOf('submissiondate')==-1){
        missingFields+='submissiondate ';
      }
      if(parsedData.indexOf('customername')==-1){
        missingFields+='customername ';
      }
      if(parsedData.indexOf('customeremail')==-1){
        missingFields+='customeremail ';
      }
      if(parsedData.indexOf('description')==-1){
        missingFields+='description ';
      }
      if(parsedData.indexOf('status')==-1){
        missingFields+='status ';
      }
      if(parsedData.indexOf('closeddate')==-1){
        missingFields+='closeddate ';
      }
      if(parsedData.indexOf('employeename')==-1){
        missingFields+='employeename ';
      }
      throw "Missing fields "+missingFields+"in CSV file.";
    }
  }
  getIssuesCsv(key){
    let self=this;
    if(key=='MOCK_ISSUES.csv'){
      return this.$http.get('/data/MOCK_ISSUES.csv')
        .then((response) => {
          return Papa.parse(response.data,{header: true,skipEmptyLines: true});
        })
        .catch((error) => {
          this.$log.error('XHR Failed for get issues data.\n' + angular.toJson(error.data, true));
        });
    }else{
      return this.$timeout(function(){
        return Papa.parse(self.localStorageService.get(key),{header: true,skipEmptyLines: true});
      },500);
    }
  }
  getIssuesKeys(){
    let keys=this.localStorageService.keys();
    keys = keys.filter(function (item) {
      return item.indexOf("issues.") == 0;
    });
    return keys;
  }
  //Upload sells csv file and store in local storage
  uploadSellsCsv(fileName,data) {
    let self=this;
    let parsedData=(Papa.parse(data));
    parsedData=parsedData.data[0];
    //Check if there is a file with the same name
    if(this.localStorageService.keys().indexOf('sells.'+fileName)!=-1){
      throw "There is already a file with the same name.";
    }else
    //If all of the fields exists
    if(parsedData.indexOf('selldate')!=-1 && parsedData.indexOf('amount')!=-1) {
      self.localStorageService.set('sells.'+fileName, data);
    }
    //If some of the fields doesnt exist, throw error, giving feedback of which fields are required in the file
    else{
      let missingFields='';
      if(parsedData.indexOf('selldate')==-1){
        missingFields+='selldate ';
      }
      if(parsedData.indexOf('sells')==-1){
        missingFields+='sells ';
      }
      throw "Missing fields "+missingFields+"in CSV file.";
    }
  }
  getSellsCsv(key){
    let self=this;
    if(key=='MOCK_SELLS.csv'){
      return this.$http.get('/data/MOCK_SELLS.csv')
        .then((response) => {
          return Papa.parse(response.data,{header: true,skipEmptyLines: true});
        })
        .catch((error) => {
          this.$log.error('XHR Failed for get issues data.\n' + angular.toJson(error.data, true));
        });
    }else{
      return this.$timeout(function(){
        return Papa.parse(self.localStorageService.get(key),{header: true,skipEmptyLines: true});
      },500);
    }
  }
  getSellsKeys(){
    let keys=this.localStorageService.keys();
    keys = keys.filter(function (item) {
      return item.indexOf("sells.") == 0;
    });
    return keys;
  }

}
