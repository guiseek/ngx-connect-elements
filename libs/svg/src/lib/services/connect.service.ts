import { Injectable, Renderer2, HostListener } from '@angular/core';
interface Connection {
  left: any,
  right: any
}


@Injectable()
export class ConnectService {
  connection: Connection = {
    left: null,
    right: null
  }
  connections: Connection[] = []
  // width = this.el.nativeElement.width
  element: HTMLElement
  renderer: Renderer2
  constructor() {
    this.connections.push(this.connection)
  }
  connect(data) {
    const { left, right } = this.connection
    // Object.assign()
    if (!left) {
      this.connection.left = data
    } else {
      this.connection.right = data
      console.log('right: ', this.connection)
      this.finishConnect(this.connection)
    }
  }
  resizeConnections() {
    console.log('this.connections: ', this.connections)
    const connections = this.connections
    console.log('right: ', this.connections)
    this.connections = []
    this.connections.forEach(({left, right}) => {
      console.log('connection: ', left, right)
      // console.log('right: ', right)
      // this.connectDivs(left, right, '#2c6cd3', 0.6)
      // this.connections.push({ left, right })
    })
  }
  finishConnect({ left, right }) {
    // console.log(left, right)
    if (left !== right) {
      this.connectDivs(left, right, '#2c6cd3', 0.6)
      // const { dataset } = this.connection
      console.log({left, right})
      this.connections.push({ left, right })
      console.log('left right: ', left, right)
      console.log('this.connections: ', this.connections)
      this.connection = {
        left: null,
        right: null
      }
    }
    // this.changeSvgLayer(4)
  }
  public findDuplicateConnections(connection: Connection[]) {
    return connection.filter((c) => {
      return connection.some(c => !!c)
    })
    // return this.connections.includes(connection);
  }
  public getConnectionsFor(source: any) {
    return this.connections.filter(({ left: a }) => a === source);
  }
  public removeConnection(source: any, i: number) {
    const sinks = this.getConnectionsFor(source);
    const r = this.connections.filter(({ left, right }) => {
      return !(left === source) && !(right === sinks[i].right);
    });
    return r;
  }
  createSVG() {
    // let svg: any = this.elementRef.getElementById("svg-canvas");
    let svg = this.element.querySelector('#svg-canvas')
    if (null == svg) {
      svg = this.renderer.createElement("http://www.w3.org/2000/svg",
        "svg");
      svg.setAttribute('id', 'svg-canvas');
      svg.setAttribute('style', 'position:absolute;top:0px;left:0px');
      // svg.setAttribute('width', `${this.width}`);
      // svg.setAttribute('height', `${this.height}`);
      svg.setAttributeNS("http://www.w3.org/2000/xmlns/",
        "xmlns:xlink",
        "http://www.w3.org/1999/xlink");
      this.element.appendChild(svg)
    }
    return svg;
  }
  drawCircle(x, y, radius, color) {
    const svg = this.createSVG();
    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    shape.setAttributeNS(null, 'cx', x);
    shape.setAttributeNS(null, 'cy', y);
    shape.setAttributeNS(null, 'r', radius);
    shape.setAttributeNS(null, 'fill', color);
    svg.appendChild(shape);
  }
  drawArrow(x, y, radius, color) {
    const svg = this.createSVG();
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttributeNS(null, 'id', 'triangle');
    marker.setAttributeNS(null, 'viewBox', '0 0 10 10');
    marker.setAttributeNS(null, 'refX', x);
    marker.setAttributeNS(null, 'refY', y);
    marker.setAttributeNS(null, 'markerUnits', 'strokeWidth');
    marker.setAttributeNS(null, 'markerWidth', '5');
    marker.setAttributeNS(null, 'markerHeight', '4');
    marker.setAttributeNS(null, 'orient', 'auto');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'refX', x);
    path.setAttributeNS(null, 'refY', y);
    path.setAttributeNS(null, 'r', radius);
    path.setAttributeNS(null, 'fill', color);
    marker.appendChild(path);
    svg.appendChild(marker);
  }
  findAbsolutePosition(htmlElement) {
    let x = htmlElement.offsetLeft;
    let y = htmlElement.offsetTop;
    let el
    for (x = 0, y = 0, el = htmlElement;
      el != null;
      el = el.offsetParent) {
      x += el.offsetLeft;
      y += el.offsetTop;
    }
    return {
      "x": x,
      "y": y
    };
  }
  drawCurvedLine(x1, y1, x2, y2, tension) {
    const svg = this.createSVG();
    const shape = document.createElementNS("http://www.w3.org/2000/svg",
      "path"); {
      // console.log('x1: ', x1, 'y1: ', y1, 'x2: ', x2, 'y2: ', y2);
      let path
      if (tension < 0) {
        const delta = (y2 - y1) * tension;
        const hx1 = x1;
        const hy1 = y1 - delta;
        const hx2 = x2;
        const hy2 = y2 + delta;
        path = "M " + x1 + " " + y1 +
          " C " + hx1 + " " + hy1 + " "
          + hx2 + " " + hy2 + " "
          + x2 + " " + y2;
      } else {
        const delta = (x2 - x1) * tension;
        const hx1 = x1 + delta;
        const hy1 = y1;
        const hx2 = x2 - delta;
        const hy2 = y2;
        path = "M " + x1 + " " + y1 +
          " C " + hx1 + " " + hy1 + " "
          + hx2 + " " + hy2 + " "
          + x2 + " " + y2;
      }
      // const delta = (x2 - x1) * tension;
      // const hx1 = x1 + delta;
      // const hy1 = y1;
      // const hx2 = x2 - delta;
      // const hy2 = y2;
      // const path = "M " + x1 + " " + y1 +
      //   " C " + hx1 + " " + hy1
      //   + " " + hx2 + " " + hy2
      //   + " " + x2 + " " + y2;
      shape.setAttributeNS(null, "d", path);
      shape.setAttributeNS(null, "fill", "none");
      shape.setAttributeNS(null, "stroke", this.getRandomColor());
      shape.setAttributeNS(null, "stroke-width", "3");
      shape.setAttributeNS(null, "marker-end", "url(#triangle)");
      svg.appendChild(shape);
    }
  }
  getRandomColor() {
    return '#96b6e9';
    // const letters = '0123456789ABCDEF';
    // let color = '#';
    // for (let i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
  }
  connectDivs(leftId, rightId, color, tension) {
    const left = this.connection.left || leftId
    const right = this.connection.right || rightId
    // const left = this.connection.left;
    // const right = this.connection.right;
    console.log(
      leftId, rightId
    )
    // this.connections.push(left.getAttribute('data-connect'), right)

    const leftPos = this.findAbsolutePosition(left);
    let x1 = leftPos.x;
    let y1 = leftPos.y;

    x1 += left.offsetWidth;
    y1 += (left.offsetHeight / 2);

    const rightPos = this.findAbsolutePosition(right);

    let x2 = rightPos.x;
    let y2 = rightPos.y;
    y2 += (right.offsetHeight / 2);

    if (x1 > x2) {
      console.log('left')
      x1 = (x1 - right.clientWidth)
      x2 = (x2 + right.clientWidth)
    }


    const width = x2 - x1;
    const height = y2 - y1;

    this.drawCircle(x1, y1, 3, color);
    this.drawCircle(x2, y2, 3, color);
    this.drawArrow(x2, y2, 3, color);
    this.drawCurvedLine(x1, y1, x2, y2, tension);
  }
}
