'use strict';

var BasePlugin = require('ember-cli-deploy-plugin')
var exec = require('child-process-promise').exec
var path = require('path')
var fs = require('fs')

module.exports = {
  name: require('./package').name,
  defaultConfig: { project: 'dist' },
  requiredConfig: ['domain'],
  createDeployPlugin: function(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,
      runAfter: 'build',
      defaultConfig: {
        environment: 'production',
        project: 'tmp/deploy-dist/'
      },
      requiredConfig: ['domain'],
      willUpload: function() {
        let self = this
        let oldFile = path.join(self.readConfig('project'), 'index.html')
        let newFile = path.join(self.readConfig('project'), '200.html')
        let rename = new Promise((resolve, reject) => {
          fs.rename(
            oldFile,
            newFile,
            function (err) {
              if (err != null) {
                self.log(err, { color: 'red' })
                reject(err)
              }
              resolve(newFile)
            })  
        })

        return rename;
      },
      upload: function() {
        var self = this
        var project = this.readConfig('project')
        var domain = this.readConfig('domain')

        return exec(`surge ${project} ${domain}`)
          .then(function (result) {
            self.log('surge upload exec then, `domain`: ' + domain + '`project`: ' + project) // this logs, but no others
            var stdout = result.stdout
            var stderr = result.stderr;
            if (stderr) {
              self.log(stderr, {color: 'red'})
            }
            if (stdout) {
              self.log(stdout)
            }
          })
          .catch(function (err) {
            throw new Error (err.stack)
          })
      }
    });

    return new DeployPlugin()
  }
};
