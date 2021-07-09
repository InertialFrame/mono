import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnyAngularLibraryModuleToken } from './tokens';
import { FirstComponent } from './first/first.component';

@NgModule({
	imports: [CommonModule],
	providers: [
		{ provide: AnyAngularLibraryModuleToken, useExisting: AnyAngularModule },
	],
	declarations: [FirstComponent],
	exports: [FirstComponent],
})
export class AnyAngularModule {}
