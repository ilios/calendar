import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-single-event-objective-list';

const { computed, isEmpty } = Ember;

export default Ember.Component.extend({
  layout,
  objectives: [],
  domains: computed('objectives.@each.[title,domain]', function(){
    let objectives = this.get('objectives');
    if(isEmpty(objectives)){
      return [];
    }
    let domainTitles = objectives.map(obj => {
      return obj.domain.toString();
    });
    domainTitles = Ember.A(domainTitles).uniq();
    let domains = domainTitles.map(title => {
      let domain = {
        title,
        objectives: []
      };
      domain.objectives = this.get('objectives').filter(obj => {
        return obj.domain.toString() === title;
      }).map(obj => {
        return obj.title;
      });
      
      return domain;
    });
    
    //make it an ennumerable so it can be observed
    return Ember.A(domains);
  }),
});
