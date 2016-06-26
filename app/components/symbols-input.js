import Ember from 'ember';

const { A, Component, computed } = Ember;

export default Component.extend({
  tagName: '',
  symbols: A(),

  inputValue: computed('symbols.[]', {
    set(key, value) {
      this.set('symbols', A(value.match(/([^\s]+)/g)));
    },
    get() {
      return this.getWithDefault('symbols', A()).join(' ');
    }
  })
});
