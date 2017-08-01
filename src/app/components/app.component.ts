import { Component, Input } from '@angular/core';

@Component({
	selector: 'my-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppGeneralComponent {
	protected testingword = 'ANGULAR';
	@Input() selection = '';
	// protected selection = 'A';

	constructor() { }

	UpdateSelection(selectedLetter: string) {
		this.selection += selectedLetter;
	}
}
