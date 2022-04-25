import { $GF } from 'globals_class';

interface FlowchartingInterface {
  uid: String;
  data: any;
  getUid(): String;
}

export class FlowchartingClass implements FlowchartingInterface {
  uid = $GF.utils.uniqueID();
  data;
  constructor() {
    //NOTHING TODO
  }
  getUid(): String {
    return this.uid;
  }
}
