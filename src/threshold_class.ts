import { $GF } from 'globals_class';

class GFTH {
  data: gf.TTHData;
  hidden = false;
  id = $GF.utils.uniqueID();
  constructor(color: string | undefined, comparator: any, value: any, data: gf.TTHData) {
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
        this.data.color = undefined;
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

  getColor() {
    return this.data.value;
  }

  setColor(color: string | undefined):this {
    this.data.color = color;
    return this;
  }

  getValue() {
    return this.data.value;
  }

  setValue(value: string | undefined):this {
    this.data.value = value;
    return this;
  }

  getLevel(): number {
    return this.data.level;
  }

  setLevel(level: number):this {
    this.data.level = level;
    return this;
  }

  hide():this {
    this.hidden = true;
    return this;
  }

  show():this {
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
  constructor(
    color: string | undefined,
    value: number | undefined,
    comparator: gf.TTHNumberComparator,
    data: gf.TTHNumberData
  ) {
    super(color, value, comparator, data);
    this.data = data;
    this.data.value = value;
    this.data.comparator = comparator;
  }

  static getDefaultData(): gf.TTHData {
    return {
      color: 'rgba(245, 54, 54, 0.9)',
      comparator: 'eq',
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
        $GF.log.error('Comparator unknown : ' + this.data.comparator);
        throw new Error('Comparator unknown : ' + this.data.comparator)
        return false;
        break;
    }
  }
}

export class StringTH extends GFTH {
  data: gf.TTHStringData;
  constructor(
    color: string | undefined,
    value: string | undefined,
    comparator: gf.TTHStringComparator,
    data: gf.TTHStringData
  ) {
    super(color, value, comparator, data);
    this.data = data;
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
        $GF.log.error('Comparator unknown : ' + this.data.comparator);
        return false;
        break;
    }
  }
}
