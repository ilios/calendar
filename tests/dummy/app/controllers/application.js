import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

const { RSVP, Controller, computed, A} = Ember;
const { PromiseArray } = DS;

export default Controller.extend({
  selectedDate: new Date(),
  selectedView: 'week',
  fakeSingleEvent: false,
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
        title: 'Fake Event',
        offeredAtPhrase: 'On ' + moment(event.startDate).format('dddd, MMMM Do YYYY, h:mm a'),
        taughtByPhrase: 'Taught By Barry Bods, Neil deGrasse Tyson',
        offeringIsAPhrase: 'This offering is a(n) Lecture',
        courseObjectives: [
          {domain: 'Medical (With People)', title: 'Help People'},
          {domain: 'Medical (With Machines)', title: 'Use Computers'},
        ],
        courseLearningMaterials: [
          {title: 'syllabus', url: 'http://#'},
        ],
        sessionObjectives: [
          {domain: 'Medical (With People)', title: 'Help People'},
          {domain: 'Medical (With Machines)', title: 'Use Computers'},
          {domain: 'Medical (With Machines)', title: 'Help People'},
        ],
        sessionLearningMaterials: [
          {title: 'slides', url: 'http://#'},
        ]
      };
      
      this.set('fakeSingleEvent', fakeEvent);
    }
  }
});

// <h2>{{title}}</h2>
// <fieldset>
//   <caption>{{coursePhrase}}</caption>
//   <div class='ilios-calendar-single-event-offered-at'>{{offeredAtPhrase}}</div>
//   <div class='ilios-calendar-single-event-instructors'>{{taughtByPhrase}} {{listOfInstructors}}</div>
//   <div class='ilios-calendar-single-event-offered-at'>{{offeringIsAPhrase}}</div>
//   <div class='ilios-calendar-single-event-objective-list'>
//     <h4>{{courseObjectivesPhrase}}</h4>
//     {{ilios-calendar-single-event-objective-list objectives=courseObjectives}}
//   </div>
//   <div class='ilios-calendar-single-event-learningmaterial-list'>
//     <h4>{{courseLearningMaterialsPhrase}}</h4>
//     {{ilios-calendar-single-event-learningmaterial-list learningMaterials=courseLearningMaterials}}
//   </div>
// </fieldset>
// 
// <fieldset>
//   <caption>{{sessionPhrase}}</caption>
//   <div class='ilios-calendar-single-event-objective-list'>
//     <h4>{{sessionObjectivesPhrase}}</h4>
//     {{ilios-calendar-single-event-objective-list objectives=sessionObjectives}}
//   </div>
//   <div class='ilios-calendar-single-event-learningmaterial-list'>
//     <h4>{{sessionLearningMaterialsPhrase}}</h4>
//     {{ilios-calendar-single-event-learningmaterial-list learningMaterials=sessionLearningMaterials}}
//   </div>
// </fieldset>
