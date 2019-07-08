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
      id: 5,
      name: 'Rogério Araujo da Silva'
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
    }, {
      id: 6,
      name: 'Gustavo Costa'
    }]
  }
  connections = this.connection.connections
  constructor(
    private connection: ConnectService,
    private renderer: Renderer2,
    private element: ElementRef
  ) {
    this.connection.element = element.nativeElement
    this.connection.renderer = renderer
    window.setTimeout(() => {
      this.checkDeplicates()
      console.log('this.checkDeplicates(): ', this.checkDeplicates())
    }, 3000)
  }
  onConnecting(data) {
    console.log('connecting: ', data)
  }
  checkDeplicates() {
    this.connection.findDuplicateConnections(
      this.connection.connections
    )
  }
}
