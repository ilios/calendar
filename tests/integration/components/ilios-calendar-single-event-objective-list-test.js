import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ilios-calendar-single-event-objective-list', 'Integration | Component | ilios calendar single event objective list', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);

  const objectives = [
    {domain: 'great things', title: 'cheese'},
    {domain: 'great things', title: 'ice cream'},
    {domain: 'annoying things', title: 'buying gas'},
    {domain: 'annoying things', title: 'traffic'},
  ];

  this.set('objectives', objectives);
  this.render(hbs`{{ilios-calendar-single-event-objective-list objectives=objectives}}`);

  assert.equal(this.$('ul:eq(0)>li:eq(0)').text().trim().search(/^annoying things/), 0);
  assert.equal(this.$('ul:eq(0)>li:eq(0)>ul>li:eq(1)').text().trim().search(/^traffic/), 0);
  assert.equal(this.$('ul:eq(0)>li:eq(1)').text().trim().search(/^great things/), 0);
  assert.equal(this.$('ul:eq(0)>li:eq(1)>ul>li:eq(0)').text().trim().search(/^cheese/), 0);
});

test('displays `None` when provided no content', function(assert) {
  assert.expect(1);

  this.set('objectives', []);
  this.render(hbs`{{ilios-calendar-single-event-objective-list
    objectives=objectives
    noContentPhrase='None'
  }}`);

  assert.equal(this.$('.no-content').text(), 'None');
});
