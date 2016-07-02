import Ember from 'ember';

const { Route, RSVP: { Promise }, inject: { service } } = Ember;

export default Route.extend({
  slrAnalysis: service('slr-analysis'),
  provider: service('provider'),

  model() {
    return new Promise((resolve) => {
      let grammar = this.get('provider.grammar');
      let augmented, itemized, canonicItems, parsingTable;

      if (grammar && grammar.get('isValid')) {
        augmented = this.get('slrAnalysis').augmentGrammar(grammar);
        itemized = this.get('slrAnalysis').addItemMarkers(augmented);
        canonicItems = this.get('slrAnalysis').buildCanonicSet(itemized);
        parsingTable = this.get('slrAnalysis').buildParsingTable(grammar, canonicItems);

        this.set('provider.parsingTable', parsingTable);
      }

      resolve({ grammar, augmented, itemized, canonicItems, parsingTable });
    });
  }
});
