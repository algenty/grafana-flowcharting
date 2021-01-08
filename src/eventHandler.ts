import { Flowchart } from 'flowchart_class';
import { FlowchartCtrl } from 'flowchart_ctrl';
import { $GF } from 'globals_class';
import { ObjectMetric, SerieMetric, TableMetric } from 'metric_class';
import { Rule } from 'rule_class';
import { Subject, Subscription } from 'rxjs';
import { State } from 'state_class';

export type TEventObject = Rule | Flowchart | ObjectMetric | State;
export type TEventList = 'rule' | 'flowchart' | 'metric' | 'state';
export type TEventName = 'changed' | 'refeshed' | 'initialized' | 'destroyed';
// export interface TEventObserver extends Observer<TEventObject> {
//   uid?: string;
// }
export class EventHandler {
  ctrl: FlowchartCtrl;
  observables: Map<string, Subject<TEventObject>> = new Map();
  constructor(ctrl: FlowchartCtrl) {
    this.ctrl = ctrl;
  }

  subscribe(object: TEventObject, list: TEventList, eventName: TEventName) {
    try {
      const mapName = `${list}$${eventName}`;
      const subscriptionName = mapName;
      const funcName = `get${list.charAt(0).toUpperCase()}${list.slice(1)}$${eventName}`;
      if (object !== undefined && object[funcName] === undefined) {
        throw new Error(`Object ${funcName} not found in ${object?.constructor.name}`);
      }
      let observable = this.observables.get(mapName);
      if (observable === undefined) {
        observable = new Subject();
        this.observables.set(mapName, observable);
      }
      object[subscriptionName] = observable.subscribe(object[funcName]());
    } catch (error) {
      $GF.log.error(error);
    }
  }

  unsubscribe(object: TEventObject, list: TEventList, eventName: TEventName) {
    try {
      const subscriptionName = `${list}$${eventName}`;
      if (object[subscriptionName] !== undefined) {
        const sub: Subscription = object[subscriptionName];
        sub.unsubscribe();
        object[subscriptionName] = undefined;
      }
    } catch (error) {
      $GF.log.error(error);
    }
  }

  emit(object: TEventObject, eventName: TEventName) {
    try {
      const mapName = this._getObservableName(object, eventName);
      let observable = this.observables.get(mapName);
      if (observable === undefined) {
        observable = new Subject();
      }
      observable.next(object);
    } catch (error) {
      $GF.log.error(error);
    }
  }

  _getObservableName(object: TEventObject, eventName: TEventName) {
    if (object instanceof Rule) {
      return `rule$${eventName}`;
    }
    if (object instanceof Flowchart) {
      return `flowchart$${eventName}`;
    }
    if (object instanceof SerieMetric || object instanceof TableMetric) {
      return `metric$${eventName}`;
    }
    if (object instanceof State) {
      return `state$${eventName}`;
    }
    throw new Error('Unknown object instance');
  }
}
