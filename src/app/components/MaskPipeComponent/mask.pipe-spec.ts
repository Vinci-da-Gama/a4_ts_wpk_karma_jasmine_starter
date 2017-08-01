import { } from 'jasmine';
import { MaskPipe } from './mask.pipe';

describe('MaskPipe', () => {
    const MaskPipeInstance = new MaskPipe();
    const testWord = 'ANGULAR';

    it('Shoule be hide when no letter is selected.', () => {
        const masked = MaskPipeInstance.transform(testWord, '');
        expect(masked).toBe('*******');
    });

    it('should reveal only selected letter.', () => {
        const masked = MaskPipeInstance.transform(testWord, 'A');
        expect(masked).toBe('A****A*');
    });

    it('should reveal only selected letters.', () => {
        const masked = MaskPipeInstance.transform(testWord, 'ABCL');
        expect(masked).toBe('A***LA*');
    });

    it('should reveal everything when all letters selected.', () => {
        const masked = MaskPipeInstance.transform(testWord, testWord);
        expect(masked).toBe(testWord);
    });

});
