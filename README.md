ember-cli-deploy-surge
==============================================================================
[![Build Status](https://travis-ci.com/crowjonah/ember-cli-deploy-surge.svg?branch=master)](https://travis-ci.com/crowjonah/ember-cli-deploy-surge) [![Ember Observer Score](https://emberobserver.com/badges/ember-cli-deploy-surge.svg)](https://emberobserver.com/addons/ember-cli-deploy-surge) [![Coverage Status](https://coveralls.io/repos/github/crowjonah/ember-cli-deploy-surge/badge.svg?branch=master)](https://coveralls.io/github/crowjonah/ember-cli-deploy-surge?branch=master)

This is a unintelligent wrapper that spawns a child process that executes the `surge` command line in an ember-cli-deploy pipeline.


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-deploy-surge
```


Usage
------------------------------------------------------------------------------

In your Ember app's `config/deploy.js` file, you must define `domain` and can optionally set `project`
```
ENV['surge'] = {
  domain: 'https://example-domain.surge.sh',
  project: 'tmp/deploy-dist/' // this is the default, matching ember-cli-deploy-build
}
```


Contributing
------------------------------------------------------------------------------

This doesn't have any tests or error handling to speak of, so please do!
See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
