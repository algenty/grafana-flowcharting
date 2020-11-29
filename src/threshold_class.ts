import { $GF } from './globals_class';
import { default as dayjs } from 'dayjs';
export type ObjectTH = NumberTH | StringTH | DateTH;
export type ObjectTHData = gf.TTHNumberData | gf.TTHStringData | gf.TTHDateData;

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

  isValidComp(comp: string): boolean {
    return this.validComp.indexOf(comp) !== -1;
  }

  isValidValue(): boolean {
    return true;
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

/**
 * Threshold type number
 *
 * @export
 * @class NumberTH
 * @extends {GFTH}
 */
export class NumberTH extends GFTH {
  data: gf.TTHNumberData;
  type = 'number';
  validComp: gf.TTHNumberComparator[] = ['ge', 'gt'];
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

  isValidValue(): boolean {
    if (typeof this.data.value === 'number') {
      return true;
    }
    return false;
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

/**
 * Threshold types string
 *
 * @export
 * @class StringTH
 * @extends {GFTH}
 */
export class StringTH extends GFTH {
  data: gf.TTHStringData;
  type = 'string';
  validComp: gf.TTHDateComparator[] = ['eq', 'ne', 'ge', 'gt'];
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

  isValidValue(): boolean {
    try {
      new RegExp(this.data.value);
    } catch (e) {
      return false;
    }
    return true;
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
/**
 * Threshold type date
 *
 * @export
 * @class DateTH
 * @extends {GFTH}
 */
export class DateTH extends GFTH {
  data: gf.TTHDateData;
  pattern: RegExp = /^(?<signe>\+|\-)?(?<number>\d+\.?\d*)(?<precision>d|w|M|Q|y|h|m|s|ms)$/;
  matchs: RegExpMatchArray | null = [];
  testedValue: string | undefined;
  date: any;
  isValidated = false;
  isDate = false;
  isPattern = false;
  type = 'date';
  validComp: gf.TTHDateComparator[] = ['eq', 'ne', 'ge', 'gt'];
  constructor(color: string, value: string, comparator: gf.TTHDateComparator, data: gf.TTHDateData) {
    super(color, value, comparator, data);
    this.data = data;
    this.data.color = color;
    this.data.value = value;
    this.data.comparator = comparator;
  }

  static getDefaultData(): gf.TTHDateData {
    return {
      color: 'rgba(245, 54, 54, 0.9)',
      comparator: 'ge',
      value: '-1d',
      level: 0,
    };
  }

  isValidValue(): boolean {
    if (this.testedValue === this.data.value && this.isValidated) {
      return this.isValidated;
    }

    this.testedValue = this.data.value;
    this.isValidated = false;
    this.isPattern = false;
    this.isDate = false;
    if (this.testedValue === undefined || this.testedValue === null || this.testedValue.length === 0) {
      return this.isValidated;
    }

    if (dayjs(this.testedValue).isValid()) {
      this.date = dayjs(this.testedValue);
      this.isDate = true;
      this.isValidated = true;
      return this.isValidated;
    } else {
      if (this.pattern.test(this.testedValue) === true) {
        this.matchs = this.pattern.exec(this.testedValue);
        this.isValidated = true;
        this.isPattern = true;
        if (this.matchs !== null && this.matchs.groups !== undefined) {
          if (this.matchs.groups.signe === undefined) {
            this.matchs.groups.signe = '+';
          }
        }
        return this.isValidated;
      }
    }
    return this.isValidated;
  }

  match(value: any): boolean {
    if (this.data.value === undefined) {
      return true;
    }
    if (value === undefined) {
      return false;
    }
    if (!this.isValidated) {
      const test = this.isValidValue();
      if (!test) {
        return false;
      }
    }

    if (this.isDate) {
      return this._matchDate(value);
    }
    if (this.isPattern) {
      return this._matchPattern(value);
    }
    return false;
  }

  _matchDate(value: string): boolean {
    return DateTH.compareDates(this.date, value, this.data.comparator, 'd');
  }

  _matchPattern(value: string): boolean {
    if (this.isValidated && this.matchs !== null && this.matchs.groups !== undefined) {
      let now = dayjs();
      const signe = this.matchs.groups.signe;
      const number = parseFloat(`${this.matchs.groups.number}`);
      const precision: any = this.matchs.groups.precision !== undefined ? this.matchs.groups.precision : 'd';
      if (signe === '-') {
        now = dayjs(now).subtract(number, precision);
      } else {
        now = dayjs(now).add(number, precision);
      }
      return DateTH.compareDates(now, value, this.data.comparator, precision);
    }
    return false;
  }

  static compareDates(beginDate, endDate, comparator, precision?: gf.THDatePrecision) {
    switch (comparator) {
      case 'eq':
        return dayjs(endDate).isSame(beginDate, precision);
        break;
      case 'ne':
        return !dayjs(endDate).isSame(beginDate, precision);
        break;
      case 'ge':
        return dayjs(endDate).isSame(beginDate, precision) || dayjs(endDate).isAfter(beginDate, precision);
        break;
      case 'gt':
        return dayjs(endDate).isAfter(beginDate, precision);
        break;
      default:
        return false;
        break;
    }
  }
}
