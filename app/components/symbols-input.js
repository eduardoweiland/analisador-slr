import Ember from 'ember';

const { A, Component, computed } = Ember;

export default Component.extend({
  symbols: A(),

  inputValue: computed('symbols.[]', {
    set(key, value) {
      this.set('symbols', value.match(/([^\s]+)/g));
    },
    get() {
      return this.get('symbols').join(' ');
    }
  })
});
