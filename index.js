/* eslint-env node */
'use strict';
var BasePlugin = require('ember-cli-deploy-plugin');
var RSVP = require('rsvp');
var exec = require('child-process-promise');
var path = require('path');

module.exports = {
  name: "ember-cli-deploy-surge",

  createDeployPlugin: function(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,

      defaultConfig: {
        project: 'dist/'
      },
      requiredConfig: ['domain'],
      setup: function () {
        this.log('setting `domain` and `project` in deployment context', { verbose: true });

        return {
          domain: this.readConfig('domain'),
          prodject: this.readConfig('project')
        }
      }
      configure: function (context) {
        this.log('ember-cli-deploy-surge configure hook');
      },
      willDeploy: function (context) {
        this.log('ember-cli-deploy-surge willDeploy hook');
      },
      upload: function(context) {
        var self = this;
        var project = this.readConfig('project');
        var domain = this.readConfig('domain');

        var done = this.async();

        this.log('preparing to upload `' + project + '` to surge project `' + domain + '`');

        return exec(`surge ${project} ${domain}`)
          .then(function (result) {
            var stdout = result.stdout
            var stderr = result.stderr;
            if (stderr) {
              self.log(stderr, {color: 'red'});
            }
            if (stdout) {
              self.log(stdout);
            }
          })
          .catch(function (err) {
            throw new Error (err.stack);
          });
      },
      _errorMessage: function(error) {
        this.log(error, { color: 'red' });
        if (error) {
          this.log(error.stack, { color: 'red' });
        }
        return RSVP.reject(error);
      }
    });

    return new DeployPlugin();
  }
};
