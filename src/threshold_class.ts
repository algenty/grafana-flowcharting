import { $GF } from './globals_class';
import { default as dayjs } from 'dayjs';
import { GFEvents } from 'flowcharting_base';
export type ObjectTH = NumberTH | StringTH | DateTH;
export type ObjectTHData = gf.TTHNumberData | gf.TTHStringData | gf.TTHDateData;

// Debug
// const DEBUG = false;
// const _log = (...args: any) => {
//   DEBUG && console.log(...args);
// };

// Signal definition
const THSignalsArray = ['threshold_initalized', 'threshold_changed', 'threshold_freed'] as const;
type THSignals = typeof THSignalsArray[number];

abstract class GFTH<TData extends gf.TTHData> {
  data: TData;
  private _hidden = false;
  validComp: string[] = [];
  uid: string;
  type = 'unknown';
  reduce = true;
  events: GFEvents<THSignals> = GFEvents.create(THSignalsArray);
  constructor(color: string, comparator: string, value: TData['value'], newData: TData, oldData?: any) {
    this.uid = $GF.genUid(this.constructor.name);
    this.data = newData;
    this.data.value = value;
    this.data.color = color;
    this.data.comparator = comparator;
    if (oldData) {
      this.import(oldData);
    }
    this._setType();
    this.init();
  }

  protected abstract _setType(): void;
  //############################################################################
  //### INIT/UPDATE/CHANGE/FREE
  //############################################################################
  init() {
    this._eventsConnect();
    this.events.emit('threshold_initalized', this);
  }

  change() {
    this.events.emit('threshold_changed', this);
  }

  clear() {
    this.validComp = [];
  }

  async free() {
    this.clear();
    this._eventsDisconnect();
    await this.events.emit('threshold_freed', this);
  }
  //############################################################################
  //### ACCESSORS
  //############################################################################
  //VALUE
  set value(v: TData['value']) {
    if (typeof v === 'string') {
      if (!v || v.length === 0) {
        return;
      }
    }
    if (this.data.value === v) {
      return;
    }
    this.data.value = v;
    this.change();
  }
  get value(): TData['value'] {
    return this.data.value;
  }

  //COLOR
  set color(v: string) {
    if (!v || v.length === 0 || this.data.color === v) {
      return;
    }
    this.data.color = v;
    this.change();
  }
  get color() {
    return this.data.color;
  }

  //COMPARATOR
  set comparator(v: string) {
    if (!v || v.length === 0 || this.data.comparator === v) {
      return;
    }
    this.data.comparator = v;
    this.change();
  }
  get comparator() {
    return this.data.comparator;
  }

  // HIDDEN
  set hidden(v: boolean) {
    if(v !== this._hidden) {
      this._hidden = v;
      this.change();
    }
  }
  get hidden() {
    return this._hidden;
  }

  //############################################################################
  //### LOGIC
  //############################################################################
  _eventsConnect() {}

  _eventsDisconnect() {}

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

  abstract match(value: any): boolean;

  isValidComp(comp: string): boolean {
    return this.validComp.indexOf(comp) !== -1;
  }

  isValidValue(): boolean {
    return true;
  }

  getData(): any {
    return this.data;
  }
}

/**
 * Threshold type number
 *
 * @export
 * @class NumberTH
 * @extends {GFTH}
 */
export class NumberTH extends GFTH<gf.TTHNumberData> {
  validComp: gf.TTHNumberComparator[] = ['ge', 'gt'];
  // constructor(color: string, value: number, comparator: gf.TTHNumberComparator, data: gf.TTHNumberData) {
  //   super(color, value, comparator, data);
  //   this.data = data;
  //   this.data.color = color;
  //   this.data.value = value;
  //   this.data.comparator = comparator;
  // }

  protected _setType(): void {
    this.type = 'number';
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
    if (this.value === undefined) {
      return true;
    }
    if (value === undefined) {
      return false;
    }
    switch (this.comparator) {
      case 'ge':
        return value >= this.data.value;
        break;
      case 'gt':
        return value > this.value;
        break;
      default:
        throw new Error('Unknown comparator: ' + this.comparator);
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
export class StringTH extends GFTH<gf.TTHStringData> {
  type = 'string';
  validComp: gf.TTHDateComparator[] = ['eq', 'ne'];
  // constructor(color: string, value: string, comparator: gf.TTHStringComparator, data: gf.TTHStringData) {
  //   super(color, value, comparator, data);
  //   this.data = data;
  //   this.data.color = color;
  //   this.data.value = value;
  //   this.data.comparator = comparator;
  // }

  protected _setType(): void {
    this.type = 'string';
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
      new RegExp(this.value);
    } catch (e) {
      return false;
    }
    return true;
  }

  match(value: string | undefined): boolean {
    if (this.value === undefined) {
      return true;
    }
    if (value === undefined) {
      return false;
    }
    const m = $GF.matchString(value, this.value);
    switch (this.comparator) {
      case 'eq':
        return m;
        break;
      case 'ne':
        return !m;
        break;
      default:
        throw new Error('Unknown comparator: ' + this.comparator);
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
export class DateTH extends GFTH<gf.TTHDateData> {
  pattern = /^(?<signe>\+|\-)?(?<number>\d+\.?\d*)(?<precision>d|w|M|Q|y|h|m|s|ms)$/;
  matchs: RegExpMatchArray | null = [];
  testedValue: string | number | undefined;
  date: any;
  isValidated = false;
  isDate = false;
  isPattern = false;
  type = 'date';
  validComp: gf.TTHDateComparator[] = ['eq', 'ne', 'ge', 'gt'];
  // constructor(color: string, value: string, comparator: gf.TTHDateComparator, data: gf.TTHDateData) {
  //   super(color, value, comparator, data);
  //   this.data = data;
  //   this.data.color = color;
  //   this.data.value = value;
  //   this.data.comparator = comparator;
  // }

  protected _setType(): void {
    this.type = 'date';
  }

  static getDefaultData(): gf.TTHDateData {
    return {
      color: 'rgba(245, 54, 54, 0.9)',
      comparator: 'ge',
      value: '-1d',
      level: 0,
    };
  }

  static isValidDate(date: any): boolean {
    try {
      const d = dayjs(date);
      const result = dayjs(date).isValid();
      if (result) {
        if (d.year() <= 1980) {
          return false;
        }
      }
      return result;
    } catch (error) {
      return false;
    }
  }

  isValidValue(): boolean {
    if (this.testedValue === this.value && this.isValidated) {
      return this.isValidated;
    }

    this.testedValue = this.value;
    this.isValidated = false;
    this.isPattern = false;
    this.isDate = false;
    if (this.testedValue === undefined || this.testedValue === null || this.testedValue.toString().length === 0) {
      return this.isValidated;
    }

    if (dayjs(this.testedValue).isValid()) {
      this.date = dayjs(this.testedValue);
      this.isDate = true;
      this.isValidated = true;
      return this.isValidated;
    } else {
      if (this.pattern.test(this.testedValue.toString()) === true) {
        this.matchs = this.pattern.exec(this.testedValue.toString());
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
    if (this.value === undefined) {
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

  static compareDates(
    beginDate: dayjs.Dayjs,
    endDate: string,
    comparator: gf.TTHDateComparator,
    precision?: gf.THDatePrecision
  ) {
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
