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

describe('surge', function() {
  var subject, plugin;

  beforeEach(function() {
    surge = require('../../index');
    plugin = surge.createDeployPlugin({name:'surge-test' });
    // plugin = {
    //   readConfig: function(propName) {
    //     return stubProject[propName];
    //   }
    // };
  });

  it('has a name', function() {
    var result = surge.createDeployPlugin({
      name: 'surge-test'
    });

    assert.equal(result.name, 'surge-test');
  });

});