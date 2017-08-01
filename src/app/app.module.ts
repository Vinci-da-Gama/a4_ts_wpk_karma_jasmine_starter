import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared-module/shared-module.module';
import { AppRoutingModule } from './app-routing.module';
import { MaskPipe } from './components/MaskPipeComponent/mask.pipe';
import { LettersSelectionComponent } from './components/letter-buttons/letter-buttons.component';
import { AppGeneralComponent } from './components/app.component';

@NgModule({
	declarations: [
		MaskPipe, LettersSelectionComponent, AppGeneralComponent
	],
	imports: [
		BrowserModule, HttpModule,
		FormsModule, AppRoutingModule,
		SharedModule.forRoot()
	],
	providers: [{
		provide: APP_BASE_HREF,
		useValue: '/'
	}],
	bootstrap: [AppGeneralComponent]
})
export class AppModule { }
