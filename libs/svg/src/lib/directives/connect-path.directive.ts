import { Directive, Input, Output, EventEmitter, ElementRef, HostListener, NgZone, AfterViewInit } from '@angular/core';
import { ConnectService } from '../services/connect.service';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

declare var ResizeObserver;

@Directive({
  selector: '[ngceConnectPath]'
})
export class ConnectPathDirective implements AfterViewInit {
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
  mousemove$: Observable<MouseEvent>
  constructor(
    private el: ElementRef,
    private connect: ConnectService,
    private ngZone: NgZone
    // @Inject(DOCUMENT) public _document
  ) {
    Object.assign(
      this.el.nativeElement.style,
      this.highlightStyle.leave
    )
    // resizeObserver.observe(document.querySelector('.box:nth-child(2)'));
    // const ro = new ResizeObserver(entries => {
    //   document.scrollingElement.scrollTop =
    //     document.scrollingElement.scrollHeight;
    // });
    // const ResizeObserver = new ResizeObserver()
    // // Observe the scrollingElement for when the window gets resized
    // ro.observe(document.scrollingElement);
    // // Observe the timeline to process new messages
    // ro.observe(timeline);


  }
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   return fromEvent(window, 'resize')
  //     .pipe(
  //       debounceTime(4000)
  //     ).subscribe(() => {
  //       this.connect.resizeConnections()
  //       console.log('connections: ', this.connect.connections)
  //     })

  //   // console.log("Width: " + event.target.innerWidth);
  // }
  // @HostListener('window:resize') onWindowResize($event) {
  //   console.log('event: ', $event)
  // }
  ngAfterViewInit() {
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightStyle.enter);
  }
  resizeTimeout
  @HostListener('window:resize')
  onWindowResize() {
    //debounce resize, wait for resize to finish before doing stuff
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      // this.connect.resizeConnections()
    }
    this.resizeTimeout = setTimeout((() => {
      console.log('Resize complete: ', this.connect.connections);
    }).bind(this), 500);
  }

  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(e) {
  //   // console.log(e);
  //   this.mousemove$ = e
  // }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
  @HostListener('click', ['$event.target'])
  onClick(event) {
    // this.mousemove$.subscribe((move) => {
    //   console.log('move: ', move)
    // })
    this.connecting.emit({
      // data: this.connect.connection
      data: this.connectData, event, el: this.el
    })
    this.connect.connect(event)
  }
  private highlight(style) {
    Object.assign(
      this.el.nativeElement.style,
      style || this.highlightStyle.leave
    )
  }
}
