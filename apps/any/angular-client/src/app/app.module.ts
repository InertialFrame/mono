import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AnyAngularModule } from '@inertial-frame/any/angular';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
		AnyAngularModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
