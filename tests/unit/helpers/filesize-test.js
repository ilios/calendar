import { filesize } from '../../../helpers/filesize';
import { module, test } from 'qunit';

module('Unit | Helper | filesize');

test('it bytes', function(assert) {
  var result = filesize([42]);
  assert.equal(result, '42b');
});

test('it kilobytes', function(assert) {
  var result = filesize([4200]);
  assert.equal(result, '4kb');
});

test('it megabytes', function(assert) {
  var result = filesize([4200000]);
  assert.equal(result, '4mb');
});
