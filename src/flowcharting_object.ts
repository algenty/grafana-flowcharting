import { $GF } from 'globals_class';

export class FlowchartingClass {
  uid: string = $GF.utils.uniqueID();
  data: any;
  constructor() {
    //NOTHING TODO
  }
  getUid(): String {
    return this.uid;
  }
}
