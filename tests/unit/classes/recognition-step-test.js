import { module, test } from 'qunit';
import RecognitionStep from 'analisador-slr/classes/recognition-step';

module('Unit | Class | recognition step');

test('can create a recognition step', function(assert) {
  assert.expect(1);
  assert.ok(RecognitionStep.create());
});
