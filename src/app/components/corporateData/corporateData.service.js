export class CorporateDataService {
  constructor ($log, $http,localStorageService) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.localStorageService=localStorageService;
  }
  //Upload data from csv file, store in local storage, and return it as json
  uploadEmployeesCsv(fileName,data) {
    let self=this;
    Papa.parse(data,{header: true,skipEmptyLines: true,complete: function(results) {
        console.log(results);
      self.localStorageService.set(fileName, results);
      return localStorageService.get(fileName);
      }
    });

  }

}
