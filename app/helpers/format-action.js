import Ember from 'ember';
import { ActionType } from 'analisador-slr/classes/action';

export function formatAction([action]) {
  if (!action) {
    return '';
  }

  switch (action.get('type')) {
    case ActionType.SHIFT:
      return `Empilhar símbolo e ir para o estado ${action.get('toState')}`;
    case ActionType.REDUCE:
      return `Reduzir com a produção ${action.get('useProduction')}`;
    case ActionType.ACCEPT:
      return 'Aceitar a sentença';
    case ActionType.DEVIATE:
      return `Desviar para estado ${action.get('toState')}`;
  }
}

export default Ember.Helper.helper(formatAction);
