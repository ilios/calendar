import Ember from 'ember';
import moment from 'moment';
import layout from '../templates/components/ilios-calendar-week';

const {computed} = Ember;

export default Ember.Component.extend({
  layout: layout,
  date: null,
  calendarEvents: [],
  weekOf: computed('selectedDate', function(){
    return moment(this.get('selectedDate')).startOf('week').format('MMMM Do YYYY');
  }),
});
