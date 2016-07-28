export class MetricsController {
  constructor($scope,corporateData,metricsProcessing) {
    'ngInject';
    this.corporateData=corporateData;
    this.metricsProcessing=metricsProcessing;
    this.$scope=$scope;
    this.issuesDataSets=corporateData.getIssuesKeys();
    this.sellsDataSets=corporateData.getSellsKeys();
    this.dataIssuesSelected="MOCK_ISSUES.csv";
    this.selectedIssuesDatasetChanged();
    this.dataSellsSelected="MOCK_SELLS.csv";
    this.selectedSellsDatasetChanged();
  }
  addIssues(){
    this.uploadErrorIssues=false;
    this.uploadSuccessIssues=false;
    let self=this;
    let file = document.getElementById('fileIssues').files[0],
      r = new FileReader();
    r.onloadend = function(e){
      let data = e.target.result;
      try {
        self.corporateData.uploadIssuesCsv(file.name, data);
        self.uploadSuccessIssues='The file '+file.name+' was uploaded successfully.';
        self.issuesDataSets=self.corporateData.getIssuesKeys();
        //Update the scope to show the succes message
        self.$scope.$digest();
      }catch(err) {
        alert(err);
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
        angular.forEach(processedDataIssues.reportedIssues, function(period) {
          self.$scope.labelsIssues.unshift(period.period);
          self.$scope.dataIssues.unshift(period.numberIssues);
        });
        this.$scope.dataIssues=[this.$scope.dataIssues];
      });
    });
  }
  addSells(){
    this.uploadErrorSells=false;
    this.uploadSuccessSells=false;
    let self=this;
    let file = document.getElementById('fileSells').files[0],
      r = new FileReader();
    r.onloadend = function(e){
      let data = e.target.result;
      try {
        self.corporateData.uploadSellsCsv(file.name, data);
        self.uploadSuccessSells='The file '+file.name+' was uploaded successfully.';
        self.sellsDataSets=self.corporateData.getSellsKeys();
        //Update the scope to show the succes message
        self.$scope.$digest();
      }catch(err) {
        alert(err);
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
        angular.forEach(processedDataSells, function(period) {
          self.$scope.labelsSells.unshift(period.period);
          self.$scope.dataSells.unshift(period.numberSells);
        });
        this.$scope.dataSells=[this.$scope.dataSells];
      });
    });
  }
}

