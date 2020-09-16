import {
  trigger,
  style,
  animate,
  transition,
  AUTO_STYLE,
} from '@angular/animations';

export const Animations = {
  inOutAnimation: trigger('inOutAnimation', [
    transition(':enter', [
      style({ height: 0, opacity: 0 }),
      animate('1s ease-out', style({ height: AUTO_STYLE, opacity: 1 })),
    ]),
    transition(':leave', [
      style({ height: AUTO_STYLE, opacity: 1 }),
      animate('1s ease-in', style({ height: 0, opacity: 0 })),
    ]),
  ]),
};
