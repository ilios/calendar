import Ember from 'ember';
import { default as CalendarEvent } from 'el-calendar/components/calendar-event';
import layout from '../templates/components/ilios-calendar-event';
import moment from 'moment';
import TooltipContent from '../mixins/tooltip-content';

const { computed, Handlebars, isArray } = Ember;
const { SafeString } = Handlebars;
const { notEmpty, or } = computed;

export default CalendarEvent.extend(TooltipContent, {
  layout,
  event: null,
  timeFormat: 'h:mma',
  isDay: false,
  classNameBindings: [
    ':event',
    ':event-pos',
    ':ilios-calendar-event',
    'isDay:day',
    'event.eventClass',
    'clickable:clickable',
    'isIlm'
  ],
  taughtByPhrase: 'Taught by',
  courseTitlePhrase: 'Course',
  multiplePhrase: 'Multiple',
  etAlPhrase: 'et al.',
  ilmDuePhrase: 'ILM - Due',

  isIlm: notEmpty('event.ilmSession'),
  isOffering: notEmpty('event.offering'),
  clickable: or('isIlm', 'isOffering'),

  formattedInstructors: computed(function() {
    let instructors = this.get('event.instructors');
    if (! isArray(instructors) || ! instructors.length) {
      return '';
    }
    if (3 > instructors.length) {
      return instructors.join(', ');
    } else {
      return instructors.slice(0, 2).join(', ') + ' ' + this.get('etAlPhrase');
    }
  }),

  style: computed(function() {
    if (this.get('event') == null) {
      return new SafeString('');
    }

    let escape = Handlebars.Utils.escapeExpression;

    return new SafeString(
      `top: ${escape(this.calculateTop())}%;
       height: ${escape(this.calculateHeight())}%;
       left: ${escape(this.calculateLeft())}%;
       width: ${escape(this.calculateWidth())}%;`
    );
  }),

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
      this.sendAction('action', this.get('event'));
    }
  }
});
