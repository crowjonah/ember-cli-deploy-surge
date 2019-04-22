const chai  = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const assert = chai.assert;

var stubProject = {
  name: function(){
    return 'my-project';
  },
  project: 'dummy/app',
  domain: 'test-domain.test-site.com'
};

describe('my new plugin', function() {
  var subject, plugin;

  beforeEach(function() {
    subject = require('../../index');
    plugin = subject.createDeployPlugin({name:'my plugin' });
    // plugin = {
    //   readConfig: function(propName) {
    //     return stubProject[propName];
    //   }
    // };
  });

  it('has a name', function() {
    var result = subject.createDeployPlugin({
      name: 'test-plugin'
    });

    assert.equal(result.name, 'test-plugin');
  });

  describe('hook',function() {
    var plugin;
    var context;

    it('calls the hook', function() {
      
      context = {
        project: stubProject,
        config: { "my-plugin": {
            pluginClient: function(context) {
              return {
                upload: function(context) {
                  return Promise.resolve();
                }
              };
            }
          }
        }
      };
      return assert.isFulfilled(plugin.upload(context))
    });
  });
});