// import { GFLog } from "globals_class";

interface CallableSignalChild extends Object {
  uid: string;
}
type Uid = String;
type ConnectedChild = Map<Uid, CallableFunction>;

export class GFEvents<Signals> {
  private _declaredSignals: Signals[] = [];
  private _connectedChilds: Map<Signals, ConnectedChild> = new Map();
  constructor() {
    // Nothing to do
  }

  static create<Signals>(signalName?: Readonly<Signals> | Readonly<Signals[]>): GFEvents<Signals> {
    const event: GFEvents<Signals>= new GFEvents();
    if(signalName) {
      event.declare(signalName);
    }
    return event;
  }

  declare(signalName: Readonly<Signals> | Readonly<Signals[]>): GFEvents<Signals> {
    // Array
    if (Array.isArray(signalName)) {
      signalName.forEach((s) => {
        this.declare(s);
      });
      return this;
    }
    // String
    if(typeof signalName === "string") {
      if (!this._haveDeclaredSignal(signalName)) {
        this._declaredSignals.push(signalName);
        return this;
      }
    }
    return this;
  }

  countSignal() {
    return this._declaredSignals.length;
  }

  clear() {
    this._connectedChilds.clear();
    this._declaredSignals = [];
  }

  connect(signalName: Signals, objRef: CallableSignalChild, callfn: CallableFunction): boolean {
    if (!('uid' in objRef)) {
      throw new Error(`${objRef.toString()} have no uid property`);
    }
    if (!this._haveDeclaredSignal(signalName)) {
      throw new Error(`${this.toString()} have no declared signal ${signalName}`);
      return false;
    }
    const uid = objRef.uid;
    const fn = callfn;
    let childs = this._connectedChilds.get(signalName);
    if (!childs) {
      childs = new Map();
      this._connectedChilds.set(signalName, childs);
    }
    childs.set(uid, fn);
    return true;
  }

  isConnected(signalName: Signals, objRef: CallableSignalChild): boolean {
    let childs = this._connectedChilds.get(signalName);
    if (!childs) {
      return false;
    }
    return childs.has(objRef.uid);
  }

  disconnect(signalName: Signals, objRef: CallableSignalChild) {
    if (!this._haveDeclaredSignal(signalName)) {
      return
    }
    if (!('uid' in objRef)) {
      return;
    }
    const uid = objRef.uid;
    const childs = this._connectedChilds.get(signalName);
    if (childs) {
      childs.delete(uid);
    }
  }

  emit(signalName: Signals, objToEmit: unknown) {
    console.log(`Emit signal ${signalName}`);
    const _childFn = this._getCallableFunc(signalName);
    return Promise.all(
      _childFn.map(async (fn) => {
        const result = fn(objToEmit);
        return result;
      })
    );
  }

  private _haveDeclaredSignal(signalName: Readonly<Signals>): boolean {
    return this._declaredSignals.includes(signalName);
  }

  private _getCallableFunc(signalName: Readonly<Signals>): CallableFunction[] {
    if (!this._haveDeclaredSignal(signalName)) {
      // GFLog.error(`${this.toString()} have no declared signal ${signalName}`);
      return [];
    }
    const childs = this._connectedChilds.get(signalName);
    if (childs) {
      return Array.from(childs.values());
    }
    return [];
  }
}
