/* eslint-env node */
'use strict';

module.exports = {
  isDevelopingAddon: function() {
    return false;
  },
  //needed for scss to get pushed up to parent app
  included: function(app) {
    this._super.included(app);
  },
  name: 'ilios-calendar'
};
