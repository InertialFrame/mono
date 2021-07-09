import {
	Component,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { LifecycleLogsComponent } from './lifecycle-logger.decorator';
import { LifecycleLogsComponentNameToken } from '../tokens';

@Component({
	selector: 'inertial-frame-first',
	templateUrl: './first.component.html',
	styleUrls: ['./first.component.scss'],
	providers: [
		{ provide: LifecycleLogsComponentNameToken, useValue: 'UnknownComponent' },
	],
})
export class FirstComponent
	extends LifecycleLogsComponent
	implements OnInit, OnChanges, OnDestroy
{
	name = FirstComponent.name + '-original';
	constructor() {
		// super(FirstComponent.name);
		super();
	}

	ngOnInit(): void {
		// Can we avoid having to call these explicitly?
		super.ngOnInit();
		console.log(this.name + '.ngOnInit');
	}

	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		console.log(this.name + '.ngOnChanges', changes);
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
		console.log(this.name + '.ngOnDestroy');
	}
}
