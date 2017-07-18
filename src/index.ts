import easeIn from './easings/ease-in';
import easeOut from './easings/ease-out';
import easeInOut from './easings/ease-in-out';
import linear from './easings/linear';


interface IRenderedPointMeta {
  x: number;
  y: number;
  width: number;
  height: number;
  fillStyle: string;
}

var app = {

  num: <number> 0,
  $canvas: <object> document.getElementById('canvas'),
  canvasContext: <object> {},
  canvasWidth: <number> 0,
  canvasHeight: <number> 0,

  _val: <number> 0,
  _didRenderPoint: <boolean> false,
  _didCanvasClear: <boolean> false,

  // this will eventially be a class
  renderedPointMeta: {
    x: 0,
    y: 0, 
    width: 1,
    height: 1, 
    fillStyle: '#000'
  },

  init() {
    this.initCanvas();
    this.update();
  },

  initCanvas(fillStyle: string = '#fff') {
    this.canvasContext = this.$canvas.getContext('2d');
    this.canvasWidth = this.$canvas.width;
    this.canvasHeight = this.$canvas.height;
    this.canvasContext.fillStyle = fillStyle;
    this.canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  },

  clearCanvas(x: number = 0, y: number = 0, width: number = this.canvasWidth, height: number = this.canvasHeight) {
		// instead of clearing the entire canvas
    // just pass the object/proto to be cleared
    // default is the clear the entire canvas
    this.canvasContext.clearRect(x, y, width, height);

    return true;
	},

  renderPoint(renderedPointMeta: IRenderedPointMeta) {
    this.canvasContext.fillStyle = renderedPointMeta.fillStyle;
    this.canvasContext.fillRect(renderedPointMeta.x, renderedPointMeta.y, renderedPointMeta.width, renderedPointMeta.height);

    return renderedPointMeta;
  },

  updateRenderedPoint(renderedPointMeta: IRenderedPointMeta) {    
    renderedPointMeta.x++;
    renderedPointMeta.y++;

    return renderedPointMeta;
  },

  timer(state: boolean, cb: Function, val: number) {
    return setInterval(cb, val);
  },

  update() {
    if(this._val >= 1) { return; }

    // intentionality being if the graph
    // has already been rendered stop rendering
    // if(this._didRenderPoint) { return; }

    // intentionality being if the canvas has 
    // already clear the designated region the stop 
    // waisting cycles on clearing it 
    // if(this._didCanvasClear) { return; }

    let val = easeIn(this._val, 1, 200);
    this._val = val;

    let _renderedPointMeta = this.renderPoint(this.renderedPointMeta);
    this.renderedPointMeta = this.updateRenderedPoint(_renderedPointMeta);
    this.clearCanvas(_renderedPointMeta.x, _renderedPointMeta.y, _renderedPointMeta.width, _renderedPointMeta.height);

    // more than likely the canvas only needs to be cleared
    // when the easing type changes ie. a new graph is drawn
    console.log(`PREV: ${_renderedPointMeta.x}`);
    console.log(`CURRENT: ${this.renderedPointMeta.x}`);
    

    window.requestAnimationFrame(this.update.bind(this));
  }
}

app.init();
