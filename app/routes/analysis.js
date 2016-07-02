import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  slrAnalysis: service('slr-analysis'),
  provider: service('provider'),

  model() {
    let grammar = this.get('provider.grammar');
    let augmented, itemized, canonicItems;

    if (grammar && grammar.get('isValid')) {
      augmented = this.get('slrAnalysis').augmentGrammar(grammar);
      itemized = this.get('slrAnalysis').addItemMarkers(augmented);
      canonicItems = this.get('slrAnalysis').buildCanonicSet(itemized);
    }

    return {grammar, augmented, itemized, canonicItems};
  }
});
