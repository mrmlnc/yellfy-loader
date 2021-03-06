'use strict';

import * as path from 'path';
import * as fs from 'fs';

export interface ITask {
	name: string;
	task: any;
	description: string;
}

export interface IOptions {
	gulp?: any;
	reporter?: (valid: ITask[], invalid: string[]) => void;
	rename?: any;
}

export class Loader {

	protected valid: ITask[] = [];
	protected invalid: string[] = [];

	private gulp: any;

	constructor(private taskDir: string, private options?: IOptions) {
		if (!this.options) {
			this.options = {};
		}
		if (!this.options.gulp) {
			try {
				this.options.gulp = module.parent.require('gulp');
			} catch (err) {
				throw new Error('Gulp not found.');
			}
		}
		if (!this.options.reporter) {
			this.options.reporter = this.reporter;
		}

		this.gulp = this.options.gulp;
		this.load = this.load.bind(this);
	}

	public load(): void {
		const tasks = this.getTasks();

		for (let index = 0; index < tasks.length; index++) {
			const isFile = path.extname(tasks[index]) === '.js';
			if (!isFile) {
				continue;
			}

			const name = path.basename(tasks[index], '.js');
			const taskpath = path.join(process.cwd(), this.taskDir, name);
			try {
				const task: ITask = require(taskpath);

				if (this.validate(task)) {
					this.valid.push({
						name,
						task: task.task,
						description: task.description
					});
				} else {
					this.invalid.push(name);
				}
			} catch (err) {
				throw new Error(`Task are not loaded. ${err.message}`);
			}
		}

		if (this.invalid.length) {
			return this.options.reporter(this.valid, this.invalid);
		}

		this.valid.forEach((task) => this.register(task));
	}

	private reporter(valid: ITask[], invalid: string[]) {
		console.error('The following tasks have errors: %s', invalid.join(', '));
	}

	private getTasks() {
		try {
			return fs.readdirSync(this.taskDir);
		} catch (err) {
			throw new Error(`Tasks are not loaded. ${err.message}`);
		}
	}

	private validate(task: ITask) {
		let status = typeof task.task === 'function';
		if (status && task.description) {
			status = typeof task.description === 'string';
		}

		return status;
	}

	private register(task: ITask) {
		let name = task.name;
		if (this.options.rename && this.options.rename[task.name]) {
			name = this.options.rename[task.name];
		}

		task.task.description = task.description;

		this.gulp.task(name, task.task);
	}

}

export function setup(taskDir: string, options?: IOptions) {
	new Loader(taskDir, options).load();
}
