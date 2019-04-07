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
        obj.forEach(rule => {
            let data = {}
            let newRule = new Rule('', data);
            this.rules.push(newRule);
            this.data.push(data);
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
        // this.rules = _.without(this.rules, rule);
        this.rules.splice(index, 1);
        this.data.splice(index, 1);
    }

    cloneRule(rule) {
        let data = rule.getData();
        let newData = angular.copy(data);
        let newRule = new Rule(rule.data.pattern,newData);
        const rules = this.rules;
        const rulesCount = rules.length;
        let indexToInsert = rulesCount;
        // check if last is a catch all rule, then add it before that one
        if (rulesCount > 0) {
            const last = rules[rulesCount - 1];
            if (last.pattern === "/.*/") {
                indexToInsert = rulesCount - 1;
            }
        }
        rules.splice(indexToInsert, 0, newRule);
        this.activeRuleIndex = indexToInsert;
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