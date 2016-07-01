import Ember from 'ember';
import { Sentence, Symbol } from 'analisador-slr/classes';

const { Helper: { helper }, assert } = Ember;

export function formatSentence([sentence]) {
  assert(
    `Parameter to format-sentence helper must be an instance of Sentence, received ${sentence}`,
    sentence instanceof Sentence
  );

  return sentence.get('symbols').map((symbol) => {
    if (symbol instanceof Symbol) {
      return symbol.get('name');
    }
    else {
      return symbol;
    }
  }).join(' ');
}

export default helper(formatSentence);
