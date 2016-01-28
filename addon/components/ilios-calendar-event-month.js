import Ember from 'ember';
import { default as CalendarEvent } from 'el-calendar/components/calendar-event';
import layout from '../templates/components/ilios-calendar-event-month';
import moment from 'moment';

const { computed, Handlebars, isBlank } = Ember;
const { SafeString } = Handlebars;
const { notEmpty, any } = computed;

export default CalendarEvent.extend({
  layout,
  event: null,
  timeFormat: 'h:mma',
  multiplePhrase: 'Multiple',
  classNameBindings: [':event', ':event-pos', ':ilios-calendar-event', 'event.eventClass', ':month-event', 'clickable:clickable'],
  tooltipContent: computed('event', function() {

    let addLocationToContents = function(contents, location) {
      if (! isBlank(location)) {
        contents = contents + `${location}<br />`;
      }
      return contents;
    };

    const location = this.get('event.location');
    const name = this.get('event.name');
    const isMulti = this.get('event.isMulti');
    const startTime = moment(this.get('event.startDate')).format(this.get('timeFormat'));
    const endTime = moment(this.get('event.endDate')).format(this.get('timeFormat'));
    const multiplePhrase = this.get('multiplePhrase');
    const dueThisDay = this.get('dueThisDay');
    let contents = '';

    if (this.get('isIlm')) {
      if (! isMulti) {
        contents = addLocationToContents(contents, location);
      }
      contents = contents + `${dueThisDay}<br />${name}`;
      if (isMulti) {
        contents = contents + `<br />, ${multiplePhrase}`;
      }
    } else if (this.get('isOffering')) {
      if (! isMulti) {
        contents = addLocationToContents(contents, location);
      }
      contents = contents + `${startTime} - ${endTime}<br />${name}`;
      if (isMulti) {
        contents = contents + `<br />, ${multiplePhrase}`;
      }
    } else {
      contents = `TBD<br />${startTime} - ${endTime}<br />${name}`;
    }
    return contents;
  }),
  style: computed(function() {
    return new SafeString('');
  }),
  isIlm: notEmpty('event.ilmSession'),
  isOffering: notEmpty('event.offering'),
  clickable: any('isIlm', 'isOffering'),
  click(){
    if(this.get('clickable')){
      this.sendAction('action', this.get('event'));
    }
  }
});
