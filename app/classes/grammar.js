import Ember from 'ember';

const { A, Copyable, copy, computed } = Ember;

const Grammar = Ember.Object.extend(Copyable, {
  nonTerminalSymbols: A(),
  terminalSymbols: A(),
  startSymbol: null,
  productions: A(),

  isValid: computed('nonTerminalSymbolsErrors', 'terminalSymbolsErrors', 'startSymbolErrors', 'productions.@each.errors', function() {
    let valid = true;
    valid = valid && this.get('nonTerminalSymbolsErrors').length === 0;
    valid = valid && this.get('terminalSymbolsErrors').length === 0;
    valid = valid && this.get('startSymbolErrors').length === 0;
    valid = valid && this.get('productions').length > 0;

    this.get('productions').forEach((production) => {
      valid = valid && production.get('errors').length === 0;
    });

    return valid;
  }),

  nonTerminalSymbolsErrors: computed('nonTerminalSymbols.[]', 'terminalSymbols.[]', function() {
    let errors = A();
    let symbols = {};
    let terminalSymbols = this.get('terminalSymbols').mapBy('name');

    this.get('nonTerminalSymbols').forEach((symbol) => {
      let name = symbol.get('name');
      if (name in symbols) {
        errors.push(`Símbolo ${name} está duplicado entre os símbolos não-terminais`);
      }
      symbols[name] = true;
      if (terminalSymbols.indexOf(name) !== -1) {
        errors.push(`Símbolo ${name} também está configurado como terminal`);
      }
    });

    if (this.get('nonTerminalSymbols').length === 0) {
      errors.push('Símbolos não-terminais não deve ficar em branco');
    }

    return errors;
  }),

  terminalSymbolsErrors: computed('nonTerminalSymbols.[]', 'terminalSymbols.[]', function() {
    let errors = A();
    let symbols = {};
    let nonTerminalSymbols = this.get('nonTerminalSymbols').mapBy('name');

    this.get('terminalSymbols').forEach((symbol) => {
      let name = symbol.get('name');
      if (name in symbols) {
        errors.push(`Símbolo ${name} está duplicado entre os símbolos terminais`);
      }
      symbols[name] = true;
      if (nonTerminalSymbols.indexOf(name) !== -1) {
        errors.push(`Símbolo ${name} também está configurado como não-terminal`);
      }
    });

    if (this.get('terminalSymbols').length === 0) {
      errors.push('Símbolos terminais não deve ficar em branco');
    }

    return errors;
  }),

  startSymbolErrors: computed('startSymbol', 'nonTerminalSymbols.[]', function() {
    let errors = A();
    let name = this.get('startSymbol.name');

    if (!this.get('nonTerminalSymbols').findBy('name', name)) {
      errors.push(`Símbolo de início da produção não é um símbolo não-terminal`);
    }

    return errors;
  }),

  getProductionsFor(symbol) {
    return this.get('productions').filterBy('leftSide.name', symbol.get('name'));
  },

  copy(deep) {
    let data = this.getProperties('nonTerminalSymbols', 'terminalSymbols', 'startSymbol', 'productions');
    let { nonTerminalSymbols, terminalSymbols, startSymbol, productions } = data;

    if (deep) {
      nonTerminalSymbols = copy(nonTerminalSymbols);
      terminalSymbols = copy(terminalSymbols);
      startSymbol = copy(startSymbol);
      productions = copy(productions);
    }

    return Grammar.create({
      nonTerminalSymbols,
      terminalSymbols,
      startSymbol,
      productions
    });
  }
});

export default Grammar;
