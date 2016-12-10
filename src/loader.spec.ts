'use strict';

import * as assert from 'assert';
import { ITask, Loader } from './loader';

const gulp = require('gulp');

describe('Loader', function() {

	it('Should fail if directory of the tasks does not exist.', () => {
		try {
			new Loader('./notFound').load();
		} catch (err) {
			assert.ok(err.message.indexOf('Tasks are not loaded.') !== -1);
		}
	});

	it('Should fail when loading the task that contains the error.', () => {
		try {
			new Loader('./test/error').load();
		} catch (err) {
			assert.ok(err.message.indexOf('Task are not loaded.') !== -1);
		}
	});

});

describe('Success', function() {

	it('Should load all tasks.', () => {
		new Loader('./test/success').load();
		const tasks = gulp.tree();
		assert.equal(tasks.nodes.length, 1);
	});

	it('Should rename tasks.', () => {
		new Loader('./test/success', {
			rename: { task: 'pikachu' }
		}).load();
		const tasks = gulp.tree();
		assert.ok(tasks.nodes.indexOf('pikachu') !== -1);
	});

});

describe('Fail', function() {

	it('Should be validate all tasks.', () => {
		new Loader('./test/fail', {
			reporter: (valid: ITask[], invalid: string[]) => {
				assert.equal(invalid.length, 1);
			}
		}).load();
	});

});
