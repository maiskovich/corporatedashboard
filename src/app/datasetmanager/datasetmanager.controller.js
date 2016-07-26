export class DatasetmanagerController {
  constructor($scope,corporateData) {
    'ngInject';
    this.corporateData=corporateData;
    this.datasets=corporateData.getDatasetsKeys();
  }
  deleteDataset(dataset){
    this.corporateData.removeDataset(dataset);
    this.datasets=this.corporateData.getDatasetsKeys();
  }
}

