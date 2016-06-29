import Ember from 'ember';

export default Ember.Component.extend({
  collapsed: true,

  actions: {
    toggle() {
      this.toggleProperty('collapsed');
    }
  }
});
