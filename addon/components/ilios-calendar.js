import Ember from 'ember';
import DS from 'ember-data';
import layout from '../templates/components/ilios-calendar';
import moment from 'moment';

const { Component, computed, RSVP, copy } = Ember;
const { PromiseArray } = DS;

export default Component.extend({
  layout,
  classNames: ['ilios-calendar'],
  selectedView: null,
  selectedDate: null,
  calendarEventsPromise: false,
  icsFeedUrl: null,
  day: 'Day',
  week: 'Week',
  month: 'Month',
  today: 'Today',
  loadingMessage: 'Loading Events...',
  dueThisDay: 'Due this day',
  icsInstructions: 'To add your Ilios calendar to another application or service, use this URL.  This URL is like a password. Anyone who knows it can view your calendar! If you wish to invalidate this URL and generate a new one, press the refresh button.',
  showIcsFeed: false,
  compiledCalendarEvents: computed('calendarEvents', 'selectedView', function(){
    let defer = RSVP.defer();
    this.get('calendarEventsPromise').then(events => {
      if(this.get('selectedView') === 'day'){
        defer.resolve(Ember.A(events));
      } else {
        let hashedEvents = {};
        
        events.forEach(event => {
          let hash = moment(event.startDate).format() +
                     moment(event.endDate).format() +
                     event.name;
          if(!(hash in hashedEvents)){
            hashedEvents[hash] = Ember.A();
          }
          //clone our event so we don't trample on the original when we change location
          hashedEvents[hash].pushObject(copy(event));
        });
        let compiledEvents = Ember.A();
        for(let hash in hashedEvents){
          let arr = hashedEvents[hash];
          let event = arr[0];
          if(arr.length > 1){
            event.location = 'mult.';
          }
          compiledEvents.pushObject(event);
          
        }
        
        defer.resolve(compiledEvents);
      }
    });
    
    return PromiseArray.create({
      promise: defer.promise
    });
  }),
  actions: {
    changeView(newView){
      this.sendAction('changeView', newView);
    },
    changeDate(newDate){
      this.sendAction('changeDate', newDate);
    },
    goForward(){
      let newDate = moment(this.get('selectedDate')).add(1, this.get('selectedView')).toDate();
      this.sendAction('changeDate', newDate);
    },
    goBack(){
      let newDate = moment(this.get('selectedDate')).subtract(1, this.get('selectedView')).toDate();
      this.sendAction('changeDate', newDate);
    },
    gotoToday(){
      let newDate = moment().toDate();
      this.sendAction('changeDate', newDate);
    },
    selectEvent(event){
      this.sendAction('selectEvent', event);
    },
    toggleIcsFeed(){
      this.set('showIcsFeed', !this.get('showIcsFeed'));
    },
    refreshIcsFeed(){
      this.set('icsFeedUrl', null);
      this.sendAction('refreshIcsFeed');
    }
  }
});
