export default class kbn {
    interval_to_ms(interval) {
      if (interval.substring(interval.length-1) === 's') {
        return interval.substring(0, interval.length-1) * 1000;
      }
  
      if (interval.substring(interval.length-1) === 'm') {
        return interval.substring(0, interval.length-1) * 1000 * 60;
      }
  
      if (interval.substring(interval.length-1) === 'd') {
        return interval.substring(0, interval.length-1) * 1000 * 60 * 24;
      }
  
      return undefined;
    }
  }