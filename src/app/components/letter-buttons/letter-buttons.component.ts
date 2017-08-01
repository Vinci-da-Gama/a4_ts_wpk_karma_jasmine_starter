import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'letter-selection-buttons',
    templateUrl: './letter-buttons.component.html',
    styleUrls: ['./letter-buttons.component.scss']
})
export class LettersSelectionComponent implements OnInit {
    alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    @Input() sl = '';
    @Output() letterEmit = new EventEmitter<string>();

    constructor() { }
    ngOnInit() { }

    selectLetter(letter: string) {
        //////////////////////////
        // this is for disabled //
        //////////////////////////
        this.sl += letter;
        this.letterEmit.emit(this.sl);
    }

}
