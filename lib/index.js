var eslint = require('metalsmith-eslint');

module.exports = function (sub) {
	return eslint({
		eslintConfig: {
			useEslintrc: false,
			baseConfig: {extends: 'xo' + ((sub === 'esnext' || sub === 'browser') ? '/' + sub : '')}
		}
	});
};
