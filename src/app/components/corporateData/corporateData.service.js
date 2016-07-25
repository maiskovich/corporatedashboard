export class CorporateDataService {
  constructor ($log, $http,localStorageService,$timeout) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.localStorageService=localStorageService;
    this.$timeout=$timeout;
  }
  //Upload data from csv file, store in local storage, and return it as json
  uploadEmployeesCsv(fileName,data) {
    let self=this;
      self.localStorageService.set(fileName, data);

  };
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
      },1000);
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
        return self.localStorageService.get(key);
      },1000);
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
        return self.localStorageService.get(key);
      },1000);
    }

  }

}
