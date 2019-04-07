import Rule from "./rule_class";

export default class RulesHandler {
    /** @ngInject */
    constructor($scope,data) {
        u.log(1,"RulesHandler.constructor()");
        this.$scope = $scope || null;
        this.rules = [];
        this.data = data;
        // if (version != this.panel.version) this.migrate(this.rules)
        // else this.import(this.rules);
        if( this.data != undefined && this.data != null && this.data.length >0 ) {
            this.import(this.data);
        }
    }

    import(obj) {
        let i = 0;
        obj.forEach(map => {
            let rule = new Rule(map.pattern, map);
            this.rules.push(rule);
            this.data[i++] = map;
        });
    }

    getRules() {
        return this.rules;
    }

    getRule(index) {
        return this.rules[index];
    }

    addRule(pattern) {
        let data = {}
        const newRule = new Rule(pattern,data);
        this.rules.push(newRule);
        this.data.push(data);
    }

    countRules() {
        if (this.rules != undefined && Array.isArray(this.rules))return this.rules.length;
        else return 0;
    }

    removeRule(index) {
        this.rules.splice(index, 1);
        this.data.splice(index, 1);
    }

    cloneRule(index) {
        let rule = this.getRule(index);
        let data = rule.getData();
        let newData = JSON.parse(JSON.stringify(data));
        let newRule = new Rule(newData.pattern,newData);
        this.rules.splice(index, 0, newRule);
        this.data.splice(index, 0, newData);
        this.activeRuleIndex = index;
    }

    moveRuleToUp(index) {
        const first = 0;
        const rules = this.rules;
        const last = rules.length - 1;
        if (index != first && last != first) {
            let curr = rules[index];
            let before = rules[index - 1];
            rules[index - 1] = curr;
            rules[index] = before;
        }
    }

    moveRuleToDown(index) {
        const first = 0;
        const rules = this.rules
        const last = rules.length - 1;
        if (index != last && last != first) {
            let curr = rules[index];
            let after = rules[index + 1];
            rules[index + 1] = curr;
            rules[index] = after;
        }
    }
}