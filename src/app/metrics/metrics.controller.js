export class MetricsController {
  constructor($scope,corporateData,metricsProcessing) {
    'ngInject';
    corporateData.getIssuesCsv('MOCK_ISSUES.csv').then((data)=> {
      let processedDataIssues=metricsProcessing.processMetricsIssues(data.data);
      this.numberIssues=processedDataIssues.numberOpenIssues;
      $scope.labelsIssues=[];
      $scope.seriesIssues = ['Issues'];
      $scope.dataIssues=[];
      angular.forEach(processedDataIssues.reportedIssues, function(period, key) {
        $scope.labelsIssues.unshift(period.period);
        $scope.dataIssues.unshift(period.numberIssues);
      });
      $scope.dataIssues=[$scope.dataIssues];
     console.log($scope.dataIssues);
    });
    corporateData.getSellsCsv('MOCK_SELLS.csv').then((data)=>{
      let processedDataSells=metricsProcessing.processMetricsSells(data.data);
      console.log(processedDataSells);
      $scope.labelsSells=[];
      $scope.seriesSells = ['Number of Sells','Amount of sales'];
      $scope.dataSells=[];
      angular.forEach(processedDataSells, function(period, key) {
        $scope.labelsSells.unshift(period.period);
        $scope.dataSells.unshift(period.numberSells);
      });
      $scope.dataSells=[$scope.dataSells];
      console.log($scope.dataSells);
    });
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

