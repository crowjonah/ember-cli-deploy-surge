'use strict';

let { spawn } = require('child_process');
let RSVP = require('rsvp');
let BasePlugin = require('ember-cli-deploy-plugin');
let path = require('path');
let surge = path.resolve(path.dirname(require.resolve('surge')), '../../.bin/surge');

module.exports = {
  name: "ember-cli-deploy-surge",

  createDeployPlugin: function(options) {
    let DeployPlugin = BasePlugin.extend({
      name: options.name,
      runAfter: 'build',
      defaultConfig: {
        project: 'dist/'
      },
      requiredConfig: ['domain'],
      upload: function(context) {
        let self = this;
        let project = this.readConfig('project');
        let domain = this.readConfig('domain');

        var done = this.async();

        if (process.platform === 'win32') {
          surge += '.cmd';
        }

        this.log('preparing to upload `' + project + '` to surge project `' + domain + '`');

        const surgeSpawn = spawn('surge', [project, domain]);

        surgeSpawn.stdout.on('data', (data) => {
          self.log(code);
        });
        surgeSpawn.stderr.on('data', (data) => {
          self._errorMessage.bind(self)
        });
        surgeSpawn.on('close', (code) => {
          self.log(code);
          done();
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
