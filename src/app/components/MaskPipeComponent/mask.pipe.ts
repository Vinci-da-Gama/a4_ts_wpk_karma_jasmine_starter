import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mask' })
export class MaskPipe implements PipeTransform {

    transform(val: string, selection: string) {
        let masked = '';
        for (const c of val) {
            if (selection.includes(c)) {
                masked += c;
            } else {
                masked += '*';
            }
        }
        return masked;
    }

}
