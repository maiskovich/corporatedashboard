export class SpreadsheetController {
  constructor($scope,NgTableParams,corporateData) {
    'ngInject';
    corporateData.getIssuesCsv('MOCK_ISSUES.csv').then((data)=> {
     let self=this;
      self.tableParams = new NgTableParams();
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

