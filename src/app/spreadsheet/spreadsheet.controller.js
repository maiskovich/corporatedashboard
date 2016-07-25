export class SpreadsheetController {
  constructor($scope,NgTableParams,corporateData) {
    'ngInject';
    this.corporateData=corporateData;
    this.NgTableParams=NgTableParams;
    this.$scope=$scope;
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
        self.uploadError=err;
        //Update the scope to show the error message
        self.$scope.$digest();
      }
    };
    r.readAsBinaryString(file);
  };
  selectedIssuesDatasetChanged(){
    this.corporateData.getIssuesCsv(this.dataIssuesSelected).then((data)=> {
      let self=this;
      self.tableParams = new this.NgTableParams();
      self.tableParams.settings({
        dataset: data.data
      });
      this.cols = [
        { field: "submissiondate", title: "Submission", filter: { submissiondate: "number" }, show: true },
        { field: "customername", title: "Customer Name", filter: { customername: "text" }, show: true },
        { field: "customeremail", title: "Customer Email", filter: { customeremail: "text" }, show: true },
        { field: "description", title: "Description", filter: { description: "text" }, show: true },
        { field: "status", title: "Status", filter: { status: "select" },filterData:[{ id: 'open', title: "Open"}, { id: 'close', title: "Close"}], show: true },
        { field: "closeddate", title: "Closed Date", filter: { closeddate: "number" }, show: true },
        { field: "employeename", title: "Employeename", filter: { employeename: "text" }, show: true }
      ];
    });
  }
}

