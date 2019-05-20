/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 * @author exactchange / http://github.com/exactchange
 **/

const noSupportBrowserText = 'Your browser does not support WebGL.';
const noSupportGfxText = 'Your graphics card does not support WebGL.';
const noSupportHelpText = 'Learn how to enable WebGL in your browser: http://get.webgl.org';

const noSupportBrowser = [noSupportBrowserText, noSupportHelpText].join('\n');
const noSupportGfx = [noSupportGfxText, noSupportHelpText].join('\n');

class WebGLDetector {
  constructor() {
    this.features = {
      canvas: Boolean(window.CanvasRenderingContext2D),
      fileapi: Boolean(window.File && window.FileReader && window.FileList && window.Blob)
    };

    this.render.bind(this);
  }

  get isWebGLEnabled() {
    try {
      const _canvas = document.createElement('canvas');

      return Boolean(window.WebGLRenderingContext && (_canvas.getContext('webgl') || _canvas.getContext('experimental-webgl')));
    } catch(e) {
      return false;
    }
  }

  render(props) {
    const { isWebGLEnabled } = this;

    const element = document.createElement('div');
    const parameters = props || {};
    const parent = parameters.parent !== undefined ? parameters.parent : document.body;
    const id = parameters.id !== undefined ? parameters.id : 'oldie';

    if (!isWebGLEnabled) {
      element.id = id;
      element.innerHTML = window.WebGLRenderingContext ? noSupportBrowser : noSupportGfx;
      element.style.fontFamily = 'monospace';
      element.style.fontSize = '13px';
      element.style.fontWeight = 'normal';
      element.style.textAlign = 'center';
      element.style.background = '#fff';
      element.style.color = '#000';
      element.style.padding = '1.5em';
      element.style.width = '400px';
      element.style.margin = '5em auto 0';
    }

    parent.appendChild(element);
  }
}
