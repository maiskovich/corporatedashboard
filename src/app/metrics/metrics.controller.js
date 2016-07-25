export class MetricsController {
  constructor($scope,corporateData,metricsProcessing) {
    'ngInject';
    this.corporateData=corporateData;
    this.metricsProcessing=metricsProcessing;
    this.$scope=$scope;
    this.issuesDataSets=corporateData.getIssuesKeys();
    this.sellsDataSets=corporateData.getSellsKeys();
  }
  addIssues(){
    let self=this;
    let file = document.getElementById('fileIssues').files[0],
      r = new FileReader();
    r.onloadend = function(e){
      let data = e.target.result;
      try {
        self.corporateData.uploadIssuesCsv(file.name, data);
      }catch(err) {
        self.uploadErrorIssues=err;
        //Update the scope to show the error message
        self.$scope.$digest();
      }
    };
    r.readAsBinaryString(file);
  }
  selectedIssuesDatasetChanged(){
    let self=this;
    this.corporateData.getIssuesCsv(this.dataIssuesSelected).then((data)=> {
      this.metricsProcessing.processMetricsIssues(data.data).then((processedDataIssues)=>{
        this.numberIssues=processedDataIssues.numberOpenIssues;
        this.$scope.labelsIssues=[];
        this.$scope.seriesIssues = ['Issues'];
        this.$scope.dataIssues=[];
        angular.forEach(processedDataIssues.reportedIssues, function(period, key) {
          self.$scope.labelsIssues.unshift(period.period);
          self.$scope.dataIssues.unshift(period.numberIssues);
        });
        this.$scope.dataIssues=[this.$scope.dataIssues];
      });
    });
    this.issuesDataSets=this.corporateData.getIssuesKeys();
  }
  addSells(){
    let self=this;
    let file = document.getElementById('fileSells').files[0],
      r = new FileReader();
    r.onloadend = function(e){
      let data = e.target.result;
      try {
        self.corporateData.uploadIssuesCsv(file.name, data);
      }catch(err) {
        self.uploadErrorSells=err;
        //Update the scope to show the error message
        self.$scope.$digest();
      }
    };
    r.readAsBinaryString(file);
  }
  selectedSellsDatasetChanged(){
    let self=this;
    this.corporateData.getSellsCsv(this.dataSellsSelected).then((data)=>{
     this.$scope.labelsSells=[];
      this.$scope.seriesSells = ['Number of Sells','Amount of sales'];
      this.$scope.dataSells=[];
      this.metricsProcessing.processMetricsSells(data.data).then((processedDataSells)=>{
        angular.forEach(processedDataSells, function(period, key) {
          self.$scope.labelsSells.unshift(period.period);
          self.$scope.dataSells.unshift(period.numberSells);
        });
        this.$scope.dataSells=[this.$scope.dataSells];
      });
    });
    this.sellsDataSets=this.corporateData.getSellsKeys();
  }
}

