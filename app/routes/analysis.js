import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  slrAnalysis: service('slr-analysis'),
  provider: service('provider'),

  model() {
    let grammar = this.get('provider.grammar');
    let augmented, itemized;

    if (grammar && grammar.get('isValid')) {
      augmented = this.get('slrAnalysis').augmentGrammar(grammar);
      itemized = this.get('slrAnalysis').addItemMarkers(augmented);
    }

    return {grammar, augmented, itemized};
  }
});
