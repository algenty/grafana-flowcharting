import { $GF } from './globals_class';

export type ObjectTH = NumberTH | StringTH;
export type ObjectTHData = gf.TTHNumberData | gf.TTHStringData;

class GFTH {
  data: gf.TTHData;
  hidden = false;
  validComp: string[] = [];
  id = $GF.utils.uniqueID();
  type = 'unknown';
  reduce = true;
  constructor(color: string, comparator: any, value: any, data: gf.TTHData) {
    this.data = data;
    this.data.value = value;
    this.data.comparator = comparator;
  }

  import(obj: any, thresholds?: number, color?: string): this {
    if (thresholds && color) {
      // <= 0.9.0
      this.data.color = color;
    } else {
      if (!!obj.color) {
        this.data.color = obj.color;
      } else {
        this.data.color = '';
      }

      if (!!obj.comparator) {
        this.data.comparator = obj.comparator;
      }

      if (!!obj.value) {
        this.data.value = obj.value;
      } else {
        this.data.value = undefined;
      }

      if (!!obj.level) {
        this.data.comparator = obj.level;
      }
    }
    return this;
  }

  match(value: any): boolean {
    return true;
  }

  isValidComp(comp : string):boolean {
    return this.validComp.indexOf(comp) !== -1;
  }

  getId() {
    return this.id;
  }

  getData(): any {
    return this.data;
  }

  getColor() {
    return this.data.color;
  }

  setColor(color: string): this {
    this.data.color = color;
    return this;
  }

  getComparator() {
    return this.data.comparator;
  }

  setComparator(comparator: string): this {
    this.data.comparator = comparator;
    return this;
  }

  getValue(): any {
    return this.data.value;
  }

  setValue(value: any): this {
    this.data.value = value;
    return this;
  }

  // getLevel(): number {
  //   return this.data.level;
  // }

  // setLevel(level: number):this {
  //   this.data.level = level;
  //   return this;
  // }

  hide(): this {
    this.hidden = true;
    return this;
  }

  show(): this {
    this.hidden = false;
    return this;
  }

  isHidden(): boolean {
    return this.hidden;
  }

  // static getDefaultData() : gf.TTHData {
  //     return {
  //         color : "rgba(245, 54, 54, 0.9)",
  //         comparator :  'eq',
  //         value : 0,
  //         level : 0,
  //     }
  // }
}

export class NumberTH extends GFTH {
  data: gf.TTHNumberData;
  type = 'number';
  validComp : gf.TTHNumberComparator[] = ['ge', 'gt'];
  constructor(color: string, value: number, comparator: gf.TTHNumberComparator, data: gf.TTHNumberData) {
    super(color, value, comparator, data);
    this.data = data;
    this.data.color = color;
    this.data.value = value;
    this.data.comparator = comparator;
  }

  static getDefaultData(): gf.TTHNumberData {
    return {
      color: 'rgba(245, 54, 54, 0.9)',
      comparator: 'ge',
      value: 50,
      level: 0,
    };
  }

  match(value: number | undefined): boolean {
    if (this.data.value === undefined) {
      return true;
    }
    if (value === undefined) {
      return false;
    }
    switch (this.data.comparator) {
      case 'ge':
        return value >= this.data.value;
        break;
      case 'gt':
        return value > this.data.value;
        break;
      default:
        // $GF.log.error('Comparator unknown : ' + this.data.comparator);
        throw new Error('Unknown comparator: ' + this.data.comparator);
        return false;
        break;
    }
  }

}

export class StringTH extends GFTH {
  data: gf.TTHStringData;
  type = 'string';
  validComp : gf.TTHStringComparator[] = ['eq', 'ne'];
  constructor(color: string, value: string, comparator: gf.TTHStringComparator, data: gf.TTHStringData) {
    super(color, value, comparator, data);
    this.data = data;
    this.data.color = color;
    this.data.value = value;
    this.data.comparator = comparator;
  }

  static getDefaultData(): gf.TTHStringData {
    return {
      color: 'rgba(245, 54, 54, 0.9)',
      comparator: 'eq',
      value: '/.*/',
      level: 0,
    };
  }

  match(value: string | undefined): boolean {
    if (this.data.value === undefined) {
      return true;
    }
    if (value === undefined) {
      return false;
    }
    const m = $GF.utils.matchString(value, this.data.value);
    switch (this.data.comparator) {
      case 'eq':
        return m;
        break;
      case 'ne':
        return !m;
        break;
      default:
        throw new Error('Unknown comparator: ' + this.data.comparator);
        return false;
        break;
    }
  }
}
