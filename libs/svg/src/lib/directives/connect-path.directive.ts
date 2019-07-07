import { Directive, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { ConnectService } from '../services/connect.service';

@Directive({
  selector: '[ngceConnectPath]'
})
export class ConnectPathDirective {
  @Input() connectData: any;
  @Output() connecting: EventEmitter<any> = new EventEmitter<any>()
  @Input() highlightStyle = {
    enter: {
      backgroundColor: '#c0d3f2',
      opacity: 1
    },
    leave: {
      backgroundColor: null,
      opacity: 0.5
    }
  }
  constructor(
    private el: ElementRef,
    private connect: ConnectService,
    // @Inject(DOCUMENT) public _document
  ) {
    Object.assign(
      this.el.nativeElement.style,
      this.highlightStyle.leave
    )
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightStyle.enter);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  @HostListener('click', ['$event.target'])
  onClick(event) {
    this.connect.connect(event)
    this.connecting.emit({
      data: this.connectData, event, el: this.el
    })
  }
  private highlight(style) {
    Object.assign(
      this.el.nativeElement.style,
      style || this.highlightStyle.leave
    )
  }
}
