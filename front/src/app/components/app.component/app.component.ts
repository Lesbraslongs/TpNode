import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: ` <flash-messages></flash-messages>
      <router-outlet></router-outlet>`,
})
export class AppComponent  { name = 'Angular2-front'; }
