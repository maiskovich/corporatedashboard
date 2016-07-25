export class MetricsController {
  constructor($scope,corporateData,metricsProcessing) {
    'ngInject';
    corporateData.getIssuesCsv('MOCK_ISSUES.csv').then((data)=> {
      metricsProcessing.processMetricsIssues(data.data).then((processedDataIssues)=>{
      this.numberIssues=processedDataIssues.numberOpenIssues;
      $scope.labelsIssues=[];
      $scope.seriesIssues = ['Issues'];
      $scope.dataIssues=[];
      angular.forEach(processedDataIssues.reportedIssues, function(period, key) {
        $scope.labelsIssues.unshift(period.period);
        $scope.dataIssues.unshift(period.numberIssues);
      });
      $scope.dataIssues=[$scope.dataIssues];
      });
    });
    corporateData.getSellsCsv('MOCK_SELLS.csv').then((data)=>{
      metricsProcessing.processMetricsSells(data.data).then((processedDataSells)=>{
      $scope.labelsSells=[];
      $scope.seriesSells = ['Number of Sells','Amount of sales'];
      $scope.dataSells=[];
      angular.forEach(processedDataSells, function(period, key) {
        $scope.labelsSells.unshift(period.period);
        $scope.dataSells.unshift(period.numberSells);
      });
      $scope.dataSells=[$scope.dataSells];
      });
    });
  }
  add(){
    let self=this;
    let file = document.getElementById('file').files[0],
      r = new FileReader();
    r.onloadend = function(e){
      let data = e.target.result;
      self.corporateData.uploadEmployeesCsv(file.name,data);
    }
    r.readAsBinaryString(file);
  }
}

