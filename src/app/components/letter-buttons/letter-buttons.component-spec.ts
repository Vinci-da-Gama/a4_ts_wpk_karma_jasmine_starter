import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LettersSelectionComponent } from './letter-buttons.component';

describe('LettersSelectionComponent', () => {
    let lsComponent: LettersSelectionComponent;
    let fixture: ComponentFixture<LettersSelectionComponent>;
    const localAlphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const alphabetStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LettersSelectionComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LettersSelectionComponent);
        lsComponent = fixture.componentInstance;
        fixture.autoDetectChanges();
    });

    /////////////////////////////////////////////////////////////////////////////////
    // fit is focus it, when develop it, it would be updated and re-run by karma,  //
    // after development, change fit to it.                                        //
    /////////////////////////////////////////////////////////////////////////////////
    it('should display button for each letter of the alphabet.', () => {
        // expect(lsComponent.alphabet[0]).toBe('A');
        expect(lsComponent.alphabet).toEqual(localAlphabet);
        const element = <HTMLElement>fixture.nativeElement;
        const btns = element.querySelectorAll('button');
        expect(btns.length).toBe(localAlphabet.length);
        for (let i = 0; i < localAlphabet.length; i++) {
            const btn = btns.item(i);
            expect(btn.textContent.trim()).toBe(localAlphabet[i]);
            expect(btn.disabled).toBe(false);
        }
    });

    it('should add letter to selection when a button is clicked', () => {
        const element = <HTMLElement>fixture.nativeElement;
        const btns = element.querySelectorAll('button');
        const btnO = btns.item(alphabetStr.indexOf('O'));
        const btnK = btns.item(alphabetStr.indexOf('K'));

        expect(lsComponent.sl).toBe('');
        btnO.click();
        expect(lsComponent.sl).toBe('O');
        expect(btnO.disabled).toBe(true);
        btnK.click();
        expect(lsComponent.sl).toBe('OK');
        expect(btnK.disabled).toBe(true);
    });

});
