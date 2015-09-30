import Ember from 'ember';
import layout from '../templates/components/ilios-calendar';

const {Component} = Ember;

export default Component.extend({
  layout,
  classNames: ['ilios-calendar'],
  selectedView: null,
  selectedDate: null,
  calendarEventsPromise: false,
});
