import Ember from 'ember';
import { default as CalendarEvent } from 'el-calendar/components/calendar-event';
import layout from '../templates/components/ilios-calendar-event-month';
import moment from 'moment';
import TooltipContent from '../mixins/tooltip-content';
import colorChange from '../utils/color-change';

const { computed, Handlebars } = Ember;
const { SafeString } = Handlebars;
const { notEmpty, or } = computed;

export default CalendarEvent.extend(TooltipContent, {
  layout,
  event: null,
  timeFormat: 'h:mma',
  taughtByPhrase: 'Taught by',
  courseTitlePhrase: 'Course',
  multiplePhrase: 'Multiple',
  etAlPhrase: 'et al.',
  ilmDuePhrase: 'ILM - Due',
  classNameBindings: [':event', ':event-pos', ':ilios-calendar-event', ':month-event', 'clickable:clickable'],
  style: computed(function() {
    const event = this.get('event');
    if (event == null) {
      return new SafeString('');
    }
    const escape = Handlebars.Utils.escapeExpression;
    const darkcolor = colorChange(event.color, -0.15);

    return new SafeString(
      `background-color: ${escape(event.color)};
       border-left: 4px solid ${escape(darkcolor)};`
    );
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
