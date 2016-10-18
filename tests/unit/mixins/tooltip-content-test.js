import Ember from 'ember';
import TooltipContentMixin from 'ilios-calendar/mixins/tooltip-content';
import { module, test } from 'qunit';

module('Unit | Mixin | tooltip content');

// Replace this with your real tests.
test('it works', function(assert) {
  let TooltipContentObject = Ember.Object.extend(TooltipContentMixin);
  let subject = TooltipContentObject.create();
  assert.ok(subject);
});
