import { $GF } from 'globals_class';

interface CallableSignalChild extends Object {
  uid: string;
}
type Uid = String;
type ConnectedChild = Map<Uid, CallableFunction>;

export class flowchartingEvents<Signals> {
  private _DeclaredSignals: Signals[] = [];
  private _ConnectedChilds: Map<Signals, ConnectedChild> = new Map();
  constructor() {
    // Nothing to do
  }

  addSignal(signalName: Signals) {
    if (!this._haveDeclaredSignal(signalName)) {
      this._DeclaredSignals.push(signalName);
      return;
    }
    $GF.log.warn(`Signal ${signalName} already declared`);
  }

  clear() {
    this._ConnectedChilds.clear();
  }

  connect(signalName: Signals, objRef: CallableSignalChild, eventFunctionNoBinded: CallableFunction): boolean {
    if (!('uid' in objRef)) {
      $GF.log.error(`${objRef.toString()} have no uid property`);
      return false;
    }
    if (!this._haveDeclaredSignal(signalName)) {
      $GF.log.error(`${this.toString()} have no declared signal ${signalName}`);
      return false;
    }
    const uid = objRef.uid;
    const fn = eventFunctionNoBinded.bind(objRef);
    let childs = this._ConnectedChilds.get(signalName);
    if (!childs) {
      childs = new Map();
      this._ConnectedChilds.set(signalName, childs);
    }
    childs.set(uid, fn);
    return true;
  }

  disconnect(signalName: Signals, objRef: CallableSignalChild) {
    if (!this._haveDeclaredSignal(signalName)) {
      $GF.log.error(`${this.toString()} have no declared signal ${signalName}`);
    }
    if (!('uid' in objRef)) {
      $GF.log.error(`${objRef.toString()} have no uid property`);
    }
    const uid = objRef.uid;
    const childs = this._ConnectedChilds.get(signalName);
    if (childs) {
      childs.delete(uid);
    }
  }

  emit(signalName: Signals, objToEmit: unknown) {
    const _childFn = this._getCallableFunc(signalName);
    return Promise.all(
      _childFn.map(async (fn) => {
        const result = fn(objToEmit);
        return result;
      })
    );
  }

  private _haveDeclaredSignal(signalName: Signals): boolean {
    return this._DeclaredSignals.includes(signalName);
  }

  private _getCallableFunc(signalName: Signals): CallableFunction[] {
    if (!this._haveDeclaredSignal(signalName)) {
      $GF.log.error(`${this.toString()} have no declared signal ${signalName}`);
      return [];
    }
    const childs = this._ConnectedChilds.get(signalName);
    if (childs) {
      return Array.from(childs.values());
    }
    return [];
  }
}
