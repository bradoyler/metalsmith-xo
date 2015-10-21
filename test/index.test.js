var test = require('ava');
var sinon = require('sinon');
var xo = require('..');
var Metalsmith = require('metalsmith');

var sandbox;

test.before(function (t) {
	sandbox = sinon.sandbox.create();
	sandbox.stub(console, 'log');
	t.end();
});

test.after(function (t) {
	sandbox.restore();
	t.end();
});

test('xo', function (t) {
	/* eslint-disable */
	Metalsmith('./test/fixtures/xo')
	/* eslint-enable */
		.source('./')
		.use(xo())
		.build(function (err) {
			t.ok(err, 'linting failed');
			t.is(err.message, 'Linting failed with 3 errors!');
			sinon.assert.calledWithExactly(console.log, '\n\u001b[4merror.js\u001b[24m\n  \u001b[90m1:5\u001b[39m   \u001b[31merror\u001b[39m  \"bad\" is defined but never used            \u001b[90mno-unused-vars\u001b[39m\n  \u001b[90m1:19\u001b[39m  \u001b[31merror\u001b[39m  Missing space before function parentheses  \u001b[90mspace-before-function-paren\u001b[39m\n  \u001b[90m2:18\u001b[39m  \u001b[31merror\u001b[39m  Missing semicolon                          \u001b[90msemi\u001b[39m\n\n\u001b[4mwarn.js\u001b[24m\n  \u001b[90m2:2\u001b[39m  \u001b[33mwarning\u001b[39m  Unexpected require()  \u001b[90mglobal-require\u001b[39m\n\n\u001b[31m\u001b[1m✖ 4 problems (3 errors, 1 warning)\n\u001b[22m\u001b[39m');
			t.end();
		});
});

test('xo/esnext', function (t) {
	/* eslint-disable */
	Metalsmith('./test/fixtures/esnext')
	/* eslint-enable */
		.source('./')
		.use(xo('esnext'))
		.build(function (err) {
			t.ok(err, 'linting failed');
			t.is(err.message, 'Linting failed with 1 errors!');
			sinon.assert.calledWithExactly(console.log, '\n\u001b[4merror.js\u001b[24m\n  \u001b[90m1:1\u001b[39m  \u001b[31merror\u001b[39m  Unexpected var, use let or const instead  \u001b[90mno-var\u001b[39m\n\n\u001b[31m\u001b[1m✖ 1 problem (1 error, 0 warnings)\n\u001b[22m\u001b[39m');
			t.end();
		});
});

test('xo/browser', function (t) {
	/* eslint-disable */
	Metalsmith('./test/fixtures/browser')
	/* eslint-enable */
		.source('./')
		.use(xo('browser'))
		.build(function (err) {
			t.ok(err, 'linting failed');
			t.is(err.message, 'Linting failed with 1 errors!');
			sinon.assert.calledWithExactly(console.log, '\n\u001b[4merror.js\u001b[24m\n  \u001b[90m1:16\u001b[39m  \u001b[31merror\u001b[39m  "require" is not defined  \u001b[90mno-undef\u001b[39m\n\n\u001b[31m\u001b[1m✖ 1 problem (1 error, 0 warnings)\n\u001b[22m\u001b[39m');
			t.end();
		});
});

test('xo/browser with good src config', function (t) {
	/* eslint-disable */
	Metalsmith('./test/fixtures/browser')
	/* eslint-enable */
		.source('./')
		.use(xo('browser', {
			src: ['ok.js', '!error.js']
		}))
		.build(function (err) {
			t.is(err, null);
			t.end();
		});
});

test('xo/browser with bad src config', function (t) {
	/* eslint-disable */
	Metalsmith('./test/fixtures/browser')
	/* eslint-enable */
		.source('./')
		.use(xo('browser', {
			src: ['*.js']
		}))
		.build(function (err) {
			t.ok(err, 'linting failed');
			t.is(err.message, 'Linting failed with 1 errors!');
			sinon.assert.calledWithExactly(console.log, '\n\u001b[4merror.js\u001b[24m\n  \u001b[90m1:16\u001b[39m  \u001b[31merror\u001b[39m  "require" is not defined  \u001b[90mno-undef\u001b[39m\n\n\u001b[31m\u001b[1m✖ 1 problem (1 error, 0 warnings)\n\u001b[22m\u001b[39m');
			t.end();
		});
});

test('xo/browser with empty config', function (t) {
	/* eslint-disable */
	Metalsmith('./test/fixtures/browser')
	/* eslint-enable */
		.source('./')
		.use(xo('browser', {}))
		.build(function (err) {
			t.ok(err, 'linting failed');
			t.is(err.message, 'Linting failed with 1 errors!');
			sinon.assert.calledWithExactly(console.log, '\n\u001b[4merror.js\u001b[24m\n  \u001b[90m1:16\u001b[39m  \u001b[31merror\u001b[39m  "require" is not defined  \u001b[90mno-undef\u001b[39m\n\n\u001b[31m\u001b[1m✖ 1 problem (1 error, 0 warnings)\n\u001b[22m\u001b[39m');
			t.end();
		});
});
