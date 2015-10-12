import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-single-event-learningmaterial-list';

const {computed} = Ember;

export default Ember.Component.extend({
  layout: layout,
  learningMaterials: [],
  proxiedLearningMaterials: computed('learningMaterials.[]', function(){
    return this.get('learningMaterials').map(lm => {
      let icon;
      if(lm.type === 'link' || lm.type === 'citation'){
        icon = 'fa-link';
      } else {
        icon = 'fa-file';
        if(lm.mimetype.search(/pdf/) !== -1){
          icon = 'fa-file-pdf-o';
        }
        if(lm.mimetype.search(/ppt/) !== -1){
          icon = 'fa-file-powerpoint-o';
        }
      }
      
      return {
        title: lm.title,
        url: lm.url,
        icon
      };
    });
  })
});
