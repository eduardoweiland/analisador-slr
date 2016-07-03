import Ember from 'ember';
import { Table } from 'ember-light-table';
import { ActionType } from 'analisador-slr/classes/action';

const { computed, isNone } = Ember;

function formatCellValue(value) {
  if (!value) {
    return '';
  }

  switch (value.get('type')) {
    case ActionType.SHIFT:
      return `s${value.get('toState')}`;
    case ActionType.REDUCE:
      return `r${value.get('useProduction')}`;
    case ActionType.ACCEPT:
      return 'Aceita';
    case ActionType.DEVIATE:
      return value.get('toState');
  }
}

function getColumnOptions(label) {
  return {
    label: label,
    sortable: false,
    align: 'center',
    valuePath: `action_${label}`,
    format: formatCellValue
  };
}

/**
 * @class ParsingTable
 * @extends Ember.Object
 * @module classes
 */
export default Ember.Object.extend({
  /**
   * @property grammar
   * @type Grammar
   * @public
   */
  grammar: null,

  /**
   * @property canonicItems
   * @type CanonicItem[]
   * @public
   */
  canonicItems: null,

  /**
   * @property actionColumns
   * @type Object[]
   * @protected
   */
  actionColumns: computed('grammar.terminalSymbols.[]', function() {
    let columns = this.get('grammar.terminalSymbols').mapBy('name').map(getColumnOptions);
    columns.push(getColumnOptions('$'));
    return columns;
  }),

  /**
   * @property deviateColumns
   * @type Object[]
   * @protected
   */
  deviateColumns: computed('grammar.nonTerminalSymbols.[]', function() {
    return this.get('grammar.nonTerminalSymbols').mapBy('name').map(getColumnOptions);
  }),

  /**
   * @property columns
   * @type Object[]
   * @protected
   */
  columns: computed('actionColumns', function() {
    return [
      {
        label: '',
        sortable: false,
        subColumns: [
          {
            label: 'Estado',
            sortable: false,
            align: 'right',
            valuePath: 'state'
          }
        ]
      },
      {
        label: 'Ação',
        sortable: false,
        align: 'center',
        subColumns: this.get('actionColumns')
      },
      {
        label: 'Desvio',
        sortable: false,
        align: 'center',
        subColumns: this.get('deviateColumns')
      }
    ];
  }),

  /**
   * @property rows
   * @type Object[]
   * @protected
   */
  rows: computed('canonicItems.[]', function() {
    let rows = [];
    this.get('canonicItems').forEach((item) => {
      let state = item.get('endState');
      if (!isNone(state)) {
        rows.push({ state });
      }
    });
    return rows;
  }),

  /**
   * Ember Light Table's table object.
   *
   * @property table
   * @type Table
   * @public
   */
  table: computed('columns', 'rows', function() {
    return new Table(this.get('columns'), this.get('rows'));
  }),

  /**
   * Add an action to the table.
   *
   * @method addAction
   * @param {Number} state State number.
   * @param {Symbol} symbol Input symbol.
   * @param {Action} action The action to be added.
   */
  addAction(state, symbol, action) {
    this.get('table.rows').filterBy('state', state).setEach(`action_${symbol.get('name')}`, action);
  },

  /**
   * Get an action from the table.
   *
   * @method getAction
   * @param {Number} state State number.
   * @param {Symbol} symbol Input symbol.
   * @return {Action} Returns the action for the specified state and symbol,
   * or `null` if none exists.
   */
  getAction(state, symbol) {
    let row = this.get('table.rows').filterBy('state', state)[0];
    if (row) {
      return row.get(`action_${symbol.get('name')}`);
    }
    return null;
  }
});
