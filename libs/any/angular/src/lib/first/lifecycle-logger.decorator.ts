/* eslint-disable @typescript-eslint/ban-types */

import {
	Component,
	inject,
	Inject,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { LifecycleLogsComponentNameToken } from '../tokens';

type Result = { name: string } & OnInit & OnDestroy & OnChanges;

export function withLifecycleLogs<T extends { new (...args: any[]): Result }>(
	constructor: T
) {
	const className = constructor.name;

	return class extends constructor implements OnInit, OnDestroy, OnChanges {
		constructor(...args: any[]) {
			super(...args);
			super.name = className;
			this.logMethod('constructor');
		}

		ngOnInit(): void {
			super.ngOnInit();
			this.logMethod('ngOnInit');
		}

		ngOnChanges(changes: SimpleChanges): void {
			super.ngOnChanges(changes);
			this.logMethod('ngOnChanges', changes);
		}

		ngOnDestroy(): void {
			super.ngOnDestroy();
			this.logMethod('ngOnDestroy');
		}

		logMethod(method: string, ...args: unknown[]) {
			console.log(className + '.' + method, ...args, '@withLifecycleLogs');
		}
	};
}

@Component({
	template: '',
	providers: [
		{
			provide: LifecycleLogsComponentNameToken,
			useFactory: () =>
				inject(LifecycleLogsComponentNameToken) ?? 'UnknownComponent',
		},
	],
})
export abstract class LifecycleLogsComponent
	implements OnInit, OnChanges, OnDestroy
{
	protected constructor(
		@Inject(LifecycleLogsComponentNameToken)
		private readonly _name?: string
	) {}

	ngOnInit(): void {
		this.logMethod('ngOnInit');
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.logMethod('ngOnChanges', changes);
	}

	ngOnDestroy(): void {
		this.logMethod('ngOnDestroy');
	}

	logMethod(method: string, ...args: unknown[]) {
		console.log(this._name + '.' + method, ...args);
	}
}
