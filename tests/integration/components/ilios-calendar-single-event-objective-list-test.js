import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ilios-calendar-single-event-objective-list', 'Integration | Component | ilios calendar single event objective list', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);
  this.set('objectives', [
    {domain: 'great things', title: 'cheese'},
    {domain: 'great things', title: 'ice cream'},
    {domain: 'annoying things', title: 'buying gas'},
    {domain: 'annoying things', title: 'traffic'},
  ]);
  this.render(hbs`{{ilios-calendar-single-event-objective-list objectives=objectives}}`);
  
  assert.equal(this.$('ul:eq(0)>li:eq(0)').text().trim().search(/^annoying things/), 0);    
  assert.equal(this.$('ul:eq(0)>li:eq(0)>ul>li:eq(1)').text().trim().search(/^traffic/), 0);
  assert.equal(this.$('ul:eq(0)>li:eq(1)').text().trim().search(/^great things/), 0);    
  assert.equal(this.$('ul:eq(0)>li:eq(1)>ul>li:eq(0)').text().trim().search(/^cheese/), 0);
});
