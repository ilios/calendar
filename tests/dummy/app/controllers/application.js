import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

const { RSVP, Controller, computed, A} = Ember;
const { PromiseArray } = DS;

export default Controller.extend({
  selectedDate: new Date(),
  selectedView: 'week',
  fromTimeStamp: computed('selectedDate', 'selectedView', function(){
    return moment(this.get('selectedDate')).startOf(this.get('selectedView')).unix();
  }),
  toTimeStamp: computed('selectedDate', 'selectedView', function(){
    return moment(this.get('selectedDate')).endOf(this.get('selectedView')).unix();
  }),
  calendarEventsPromise: computed('fromTimeStamp', 'toTimeStamp', function(){
    let events = new A();
    let today = moment().hour(8);
    let todaysEvent = this.createUserEventObject();
    todaysEvent.name = 'Some new thing';
    todaysEvent.startDate = today.clone();
    todaysEvent.endDate = today.clone().add(1, 'hour');
    
    events.pushObject(todaysEvent);
    let promise = RSVP.resolve(events);
    return PromiseArray.create({
      promise: promise
    });
  }),
  createUserEventObject(){
    return {
      user: 1,
      name: '',
      offering: 1,
      startDate: null,
      endDate: null,
      eventClass: 'peer-teaching',
      location: 'Rm. 160',
      lastModified: new Date(),
      isPublished: true,
      isScheduled: false
    };
  }
});
