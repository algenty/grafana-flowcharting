// import { getValueFormat } from '@grafana/data';
import kbn from 'grafana/app/core/utils/kbn';


var grafana = {
  // formatValue(value, unit, decimals) {
  //   const fmt = getValueFormat(unit);
  //   const result = fmt(value, decimals).toString();
  //   return result.toString();
  // }
  formatValue(value, unit, decimals) {
    return kbn.valueFormats[unit](value, decimals, null).toString();
  },
  
  getUnitFormats() {
    return kbn.getUnitFormats();
  }
};

export default grafana;