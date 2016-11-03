import Ember from 'ember';
import { default as CalendarEvent } from 'el-calendar/components/calendar-event';
import layout from '../templates/components/ilios-calendar-event-month';
import moment from 'moment';
import TooltipContent from '../mixins/tooltip-content';

const { computed, Handlebars } = Ember;
const { SafeString } = Handlebars;
const { notEmpty, or } = computed;

export default CalendarEvent.extend(TooltipContent, {
  layout,
  event: null,
  timeFormat: 'h:mma',
  multiplePhrase: 'Multiple',
  classNameBindings: [':event', ':event-pos', ':ilios-calendar-event', 'event.eventClass', ':month-event', 'clickable:clickable'],
  style: computed(function() {
    return new SafeString('');
  }),
  isIlm: notEmpty('event.ilmSession'),
  isOffering: notEmpty('event.offering'),
  clickable: or('isIlm', 'isOffering'),

  daysToShowAlert: null,

  recentlyUpdated: computed('event.lastModified', {
    get() {
      const lastModifiedDate = moment(this.get('event.lastModified'));
      const today = moment();
      const daysSinceLastUpdate = today.diff(lastModifiedDate, 'days');

      return daysSinceLastUpdate < 6 ? true : false;
    }
  }).readOnly(),

  click(){
    if(this.get('clickable')){
      this.get('selectEvent')();
    }
  }
});
