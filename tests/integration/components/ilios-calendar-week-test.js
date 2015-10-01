import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ilios-calendar-week', 'Integration | Component | ilios calendar week', {
  integration: true
});

test('it renders', function(assert) {
    assert.expect(2);
    let today = new Date('2015-09-30');
    this.set('today', today);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(hbs`{{ilios-calendar-week date=today}}`);
    assert.equal(this.$().text().trim().search(/^Week of September/), 0);
    assert.equal(this.$('.event').length, 0);
});
