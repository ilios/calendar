import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-month';

export default Ember.Component.extend({
  classNames: ['ilios-calendar-month'],
  layout: layout,
  date: null,
  calendarEvents: [],
  showMore: null,
  actions: {
    selectEvent(event){
      this.sendAction('selectEvent', event);
    },
    changeToDayView(date){
      this.sendAction('changeDate', date);
      this.sendAction('changeView', 'day');
    },
    changeToEventsDayView(event){
      this.sendAction('changeDate', event.startDate);
      this.sendAction('changeView', 'day');
    },
  }
});
