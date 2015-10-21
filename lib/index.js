var eslint    = require('metalsmith-eslint');
var _defaults = require('lodash.defaults');

module.exports = function (sub, config) {
	config = config || {};
	config = _defaults(config, getDefaults(sub));
	return eslint(config);
};

function getDefaults(sub) {
	return {
		src: ['**/*.js', '!**/vendor/**/*.js', '!**/node_modules/**/*.js', '!**/bower_components/**/*.js'],
		eslintConfig: {
			useEslintrc: false,
			baseConfig: {
				extends: 'xo' + ((sub === 'esnext' || sub === 'browser') ? '/' + sub : '')
			}
		}
	};
}
