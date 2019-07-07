import { Component, Renderer2, ElementRef } from '@angular/core';
import { ConnectService } from '@ngx-connect-elements/svg';

@Component({
  selector: 'ngx-connect-elements-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-connect-elements';
  data = {
    left: [{
      id: 3,
      name: 'Gui Seek'
    }, {
      id: 4,
      name: 'Munif Geba'
    }],
    right: [{
      id: 1,
      name: 'Joao Ogava'
    }, {
      id: 2,
      name: 'Tiago Ogava'
    }]
  }
  constructor(
    private connection: ConnectService,
    private renderer: Renderer2,
    private element: ElementRef
  ) {
    this.connection.element = element.nativeElement
    this.connection.renderer = renderer
  }
  onConnecting(data) {
    console.log('connecting: ', data)
  }
}
