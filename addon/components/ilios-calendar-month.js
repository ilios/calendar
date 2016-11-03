import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-month';

export default Ember.Component.extend({
  classNames: ['ilios-calendar-month'],
  layout: layout,
  date: null,
  calendarEvents: [],
  showMore: null,
  actions: {
    changeToDayView(date){
      this.get('changeDate')(date);
      this.get('changeView')('day');
    },
  }
});
