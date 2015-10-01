import Ember from 'ember';
import layout from '../templates/components/ilios-calendar';

const {Component} = Ember;

export default Component.extend({
  layout,
  classNames: ['ilios-calendar'],
  selectedView: null,
  selectedDate: null,
  calendarEventsPromise: false,
  day: 'Day',
  week: 'Week',
  month: 'Month',
  today: 'Today',
  actions: {
    changeDate(newDate){
      this.sendAction('changeDate', newDate);
    },
    changeView(newView){
      this.sendAction('changeView', newView);
    },
  }
});
