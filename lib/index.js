var eslint    = require('metalsmith-eslint');
var _defaults = require('lodash.defaults');
var _isObject = require('lodash.isobject');

module.exports = function (sub, config) {
	if(_isObject(sub)) {
		config = sub.config;
		if(typeof sub.sub !== 'undefined') {
			sub = sub.sub;
		}
	}
	config = config || {};
	config = _defaults(config, getDefaults(sub));
	return eslint(config);
};

function getDefaults(sub) {
	return {
		eslintConfig: {
			useEslintrc: false,
			baseConfig: {
				extends: 'xo' + ((sub === 'esnext' || sub === 'browser') ? '/' + sub : '')
			}
		}
	};
}
