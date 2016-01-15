import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

const { RSVP, Controller, computed, A} = Ember;
const { PromiseArray } = DS;

export default Controller.extend({
  selectedDate: new Date(),
  selectedView: 'week',
  fakeSingleEvent: false,
  icsFeedUrl: 'http://example.com/icsfeedurlsareusuallyprettylong',
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
    todaysEvent.instructors = ['Tweedledee', 'Tweedledum'];
    todaysEvent.courseTitle = 'Lorem Ipsum';
    events.pushObject(todaysEvent);
    
    let todaysDoubleEvent = this.createUserEventObject();
    todaysDoubleEvent.name = 'Some new thing again';
    todaysDoubleEvent.startDate = today.clone();
    todaysDoubleEvent.endDate = today.clone().add(1, 'hour');
    
    events.pushObject(todaysDoubleEvent);

    let anotherEvent = this.createUserEventObject();
    anotherEvent.name = 'Sweet Lecture';
    anotherEvent.startDate = today.clone().add(2, 'hour');
    anotherEvent.endDate = today.clone().add(3, 'hour');
    events.pushObject(anotherEvent);
    
    let multiDayEvent = this.createUserEventObject();
    multiDayEvent.name = 'Multiday Event';
    multiDayEvent.startDate = today.clone();
    multiDayEvent.endDate = today.clone().add(3, 'day');
    events.pushObject(multiDayEvent);
    
    let tomorrow = moment().add(1, 'day').hour(8);
    let tomorrowsEvents = this.createUserEventObject();
    tomorrowsEvents.name = 'Tomorrows Lecture';
    tomorrowsEvents.startDate = tomorrow.clone();
    tomorrowsEvents.endDate = tomorrow.clone().add(2, 'hour');
    
    events.pushObject(tomorrowsEvents);
    
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
  },
  actions: {
    changeDate(newDate){
      this.set('selectedDate', newDate);
    },
    changeView(newView){
      this.set('selectedView', newView);
    },
    selectEvent(event){
      let fakeEvent = {
        courseTitle: 'Fake Event',
        sessionTitle: 'Fake Event',
        offeredAtPhrase: 'On ' + moment(event.startDate).format('dddd, MMMM Do YYYY, h:mm a'),
        taughtByPhrase: 'Taught By Barry Bods, Neil deGrasse Tyson',
        sessionIs: 'Session is "lecture"',
        courseObjectives: [
          {domain: 'Medical (With People)', title: 'Help People'},
          {domain: 'Medical (With Machines)', title: 'Use Computers'},
        ],
        courseLearningMaterials: [
          {title: 'syllabus', url: 'http://#', type: 'citation'},
        ],
        sessionObjectives: [
          {domain: 'Medical (With People)', title: 'Help People'},
          {domain: 'Medical (With Machines)', title: 'Use Computers'},
          {domain: 'Medical (With Machines)', title: 'Help People'},
        ],
        sessionLearningMaterials: [
          {title: 'slides', url: 'http://#', type: 'citation'},
        ]
      };
      
      this.set('fakeSingleEvent', fakeEvent);
    },
    refreshIcsFeed(){
      this.set('icsFeedUrl', 'http://example.com/a_new_ics_feed_value');
    }
  }
});
