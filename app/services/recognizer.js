import Ember from 'ember';
import { RecognitionStep, SentenceEndSymbol, Symbol } from 'analisador-slr/classes';
import { ActionType } from 'analisador-slr/classes/action';
import { SymbolType } from 'analisador-slr/classes/symbol';

const { A, computed, copy, inject: { service } } = Ember;

export default Ember.Service.extend({
  provider: service('provider'),
  grammar: computed.reads('provider.grammar'),
  parsingTable: computed.reads('provider.parsingTable'),

  recognizeSentence(sentence) {
    let steps = A([]);
    let parsingTable = this.get('parsingTable');
    let nextStep = RecognitionStep.create({
      stack: A([0]),
      input: sentence.split(' ')
    });

    nextStep.get('input').pushObject('$');

    do {
      if (!nextStep.get('action')) {
        let currentState = nextStep.get('stack')[nextStep.get('stack.length') - 1];
        let currentSymbol = Symbol.create({ name: nextStep.get('input')[0], type: SymbolType.TERMINAL });
        nextStep.set('action', parsingTable.getAction(currentState, currentSymbol));
      }

      steps.pushObject(nextStep);
      nextStep = this._applyAction(nextStep);
    } while (nextStep);

    return steps;
  },

  _applyAction(step) {
    let { action, stack, input } = step.getProperties('action', 'stack', 'input');
    let nextStep = RecognitionStep.create();

    if (!action) {
      return null;
    }

    stack = copy(stack, true);
    input = copy(input, true);

    switch (action.get('type')) {
      case ActionType.SHIFT:
        let symbol = input.shiftObject();
        stack.pushObject(symbol);
        stack.pushObject(action.get('toState'));
        nextStep.setProperties({ stack, input });
        break;
      case ActionType.REDUCE:
        let productionIndex = action.get('useProduction');
        let production = this.get('grammar.productions')[productionIndex - 1];
        for (let i = production.get('rightSide.symbols.length') * 2; i > 0; --i) {
          stack.popObject();
        }
        let currentState = stack[stack.get('length') - 1];
        stack.pushObject(production.get('leftSide.name'));
        nextStep.setProperties({ stack, input });
        nextStep.set('action', this.get('parsingTable').getAction(currentState, production.get('leftSide')));
        break;
      case ActionType.DEVIATE:
        stack.pushObject(action.get('toState'));
        nextStep.setProperties({ stack, input });
        break;
      case ActionType.ACCEPT:
        nextStep = null;
    }

    return nextStep;
  }
});
