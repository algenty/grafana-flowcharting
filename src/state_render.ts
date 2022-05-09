import { State } from 'state_class'

export class RenderInspectState {
    readonly state: State;
    private readonly options = {
      expand : {
        width : '30px',
      },
      label : {
        width : '100px',
      },
      id : {
        width : '100px',
      },
      shape : {
        width : '100px',
      },
      level : {
        width : '100px',
      },
      value : {
        width : '100px',
      },
      colors : {
        width : '80px',
      },
      tags : {
        width : '100px',
      },

    }
    constructor(state: State) {
      this.state = state;
    }
  
    static getRender(state: State): CallableFunction {
      const obj = new RenderInspectState(state);
      return obj.render.bind(obj);
    }
  
    render(): string {
      return  `
        <div class="gf-table-row_line" ng-mouseleave="editor.unselectCell(state)"
            ng-mouseover="editor.selectCell(state)">
            <!-- EXPAND -->
            ${this._expand()}
            <!-- ID -->
            ${this._id()}
            <!-- LABEL -->
            ${this._label()}
            <!-- SHAPE -->
            ${this._shape()}
            <!-- LEVEL -->
            ${this._level()}
            <!-- HIGTEST FORMATED VALUE -->
            ${this._value()}
            <!-- COLOR -->
            ${this._colors()}
            <!-- TAGS -->
            <div role="cell" class="gf-table-cells gf-table-cells-resizable" id="actions"
                ng-style="{'width' : editor.statesTable.getWidth('tags')}">
                <div class="gf-table-content gf-unselectable">
                    <div style="display:inline-block" ng-show="state.shapeState.isChanged()"
                        bs-tooltip="'Mapping on Color'"><i class="fa fa-paint-brush"></i></div>
                    <div style="display:inline-block" ng-show="state.textState.isChanged()"
                        bs-tooltip="'Mapping on text'"><i class="fa fa-paragraph"></i></div>
                    <div style="display:inline-block" ng-show="state.linkState.isChanged()"
                        bs-tooltip="'Mapping on Link'"><i class="fa fa-chain"></i></div>
                    <div style="display:inline-block" ng-show="state.eventState.isChanged()"
                        bs-tooltip="'Mapping on Animation'"><i class="fa fa-film"></i></div>
                    <div style="display:inline-block" ng-show="state.changed"
                        bs-tooltip="'Mapped and Changed'"><i class="fa fa-check-circle"></i></div>
                    <div style="display:inline-block" ng-show="state.getStatus('tooltip') === true"
                        bs-tooltip="'Tooltips available'"><i class="fa fa-info"></i></div>
                </div>
            </div>
        </div>
      `;
    }
    
    private _label(): string {
      const width=  this.options.label.width;
      return `
        <!-- LABEL -->
        <div role="cell" class="gf-table-cells gf-table-cells-resizable" id="label-${this.state.uid}"
            ng-style="{'width' : ${width}">
            <div class="gf-table-content">
                ${this.state.xcell.getDefaultLabel()}
            </div>
        </div>
      `;
    }
  
    private _shape(): string {
      const width=  this.options.shape.width;
      const key = `shape-${this.state.uid}`;
      return `
        <div role="cell" class="gf-table-cells gf-table-cells-resizable" id="${key}"
            ng-style="{'width' : ${width}">
            <div class="gf-table-content" title="${this.state.getShapeStyles()}">
                ${this.state.getShapeName()}
            </div>
        </div>
      `;
    }
  
    private _level(): string {
      const width=  this.options.level.width;
      const key = `level-${this.state.uid}`;
      return `
        <div role="cell" class="gf-table-cells gf-table-cells-resizable" id="${key}"
        style="text-align: center;" ng-style="{'width' : ${width}">
          <div class="gf-table-content">
            ${this.state.getTextLevel()}
          </div>
        </div>
      `;
    }
  
    private _value(): string {
      const key = `value-${this.state.uid}`;
      const width=  this.options.value.width;
      return `
        <div role="cell" class="gf-table-cells gf-table-cells-resizable" id="${key}"
          ng-attr-title="${this.state.highestValue}"
          ng-style="{'width' : ${width}">
          <div class="gf-table-content">
            ${this.state.highestFormattedValue}
          </div>
        </div>
      `;
    }
  
    private _colors(): string {
      const key = `color-${this.state.uid}`;
      const width=  this.options.colors.width;
      return `
        <div role="cell" class="gf-table-cells gf-table-cells-resizable" id="${key}"
        ng-style="{'width' : ${width}">
        <div class="gf-table-content" style="text-align: center;">
            <!-- TEXT COLOR -->
            ${this._color_prop('fontColor')}
            <!-- FILL COLOR -->
            ${this._color_prop('fillColor')}
            <!-- STROKE COLOR -->
            ${this._color_prop('strokeColor')}
        </div>
    </div>
  
      `;
    }
  
    private _color_prop(prop: gf.TStyleKeys) {
      if (this.state.haveStatus(prop) && this.state.getStatus(prop).length > 0 && this.state.getStatus(prop) !== 'none') {
        return `
          <div style="display:table-cell;vertical-align:middle;">
            <div bs-tooltip="'Text : ' + ${this.state.getStatus(prop)}"
              class="gf-inspect-color-picker"
              style="background-color: ${this.state.getStatus(prop)}">
              <span>T</span>
            </div>
          </div>
        `;
      }
      return '';
    }
  
    private _expand() {
      const width=  this.options.expand.width;
      const key = `expand-${this.state.uid}`;
      return `
        <div role="cell" class="gf-table-cells gf-table-cells-resizable" id="${key}"
          ng-click="state.reduce=!state.reduce"
          ng-init="state.displayEdit[${key}] = false;state.inEdit['${key}'] = false;"
          style="{'width' : ${width}">
          <div class="gf-table-content gf-unselectable" style="text-align: center; cursor: pointer;">
            <span>
                <i class="fa fa-chevron-right" title="Expand/Collapse for detail"
                    ng-class="{'gf-chevron-init': state.reduce, 'gf-chevron-rotate': state.reduce === false}">
                </i>
            </span>
          </div>
        </div>
      `;
  
    }
  
    private _id(): string {
      const key = `id-${this.state.uid}`;
      const width= this.options.id.width;
  
      return `
      <!-- ID -->
      <div role="cell" class="gf-table-cells gf-table-cells-resizable"
          ng-init="state.displayEdit['${key}'] = false;state.inEdit['${key}'] = false;"
          ng-mouseleave="state.displayEdit['${key}'] = false;"
          ng-mouseover="state.displayEdit['${key}'] = true;"
          ng-style="{'width' : ${width}"
          ng-attr-title="${this.state.uid}">
          <div class="gf-table-content" ng-show="state.inEdit['${key}'] !== true"
              ng-dblclick="state.inEdit['${key}'] = true;$GF.setFocus('${key}')">
              <span ng-style="editor.isEdited(state) && {'color':'blue'};">
                  ${this.state.xcell.uid}
              </span>
          </div>
          <div ng-show="state.displayEdit['${key}'] === true && state.inEdit['${key}'] !== true && editor.isEdited(state)"
              ng-click="editor.undo(state)" title="undo"
              class="gf-icon-action gf-icon-undo gf-icon-oncontent gf-icon-withcontent">
          </div>
          <div ng-show="state.displayEdit['${key}'] === true && state.inEdit['${key}'] !== true"
              ng-click="state.inEdit['${key}'] = true;$GF.setFocus('${key}')"
              title="Edit pattern"
              class="gf-icon-action gf-icon-edit gf-icon-oncontent gf-icon-withcontent">
          </div>
          <input type="text" style="margin-right: 2px;width : 100%"
              ng-attr-id="${key}" ng-show="state.inEdit['${key}'] === true"
              class="gf-form-input" ng-model="{{state.xcell.uid}}"
              ng-change="editor.onRulesChange()" ng-model-onblur
              ng-blur="editor.onRulesChange();state.inEdit['${key}'] = false;" data-min-length="0"
              data-items="100" data-placement="right" />
      </div>
      `;
    }
  }
