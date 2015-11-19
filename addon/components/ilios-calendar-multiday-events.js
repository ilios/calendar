import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-multiday-events';

export default Ember.Component.extend({
  layout,
  events: [],
  multidayEvents: null,
  actions: {
    selectEvent(event){
      this.sendAction('selectEvent', event);
    },
  }
});
