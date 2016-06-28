import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('analysis');
  this.route('recognizer');
  this.route('error', { path: '/*path' });
});

export default Router;
