/* eslint-disable */
window.Tiny = {
  vditorInited: false,
  init: function () {
    Promise.all([
      Tiny.injectVditorScript(),
      Tiny.injectVditorStyle()
    ]).then(() => {
      Tiny.vditorInited = true;
    });
  },
  injectVditorScript: async function () {
    if (Tiny.vditorInited) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/vditor/dist/index.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  },
  injectVditorStyle: async function () {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/vditor/dist/index.min.css';
    document.head.appendChild(link);
  },
  render: function () {
    Tiny.injectVditorScript().then(() => {
      Tiny.vditorInited = true;
      const md = document.getElementById('write');
      const vditor = document.getElementById('vditor');
      if (md && vditor) {
        Vditor.preview(vditor, md.value, {
          after: function (e) {
            console.log(e);
          },
          hljs: {
            enable: false,
            style: 'base16-snazzy',
            lineNumber: true,
          }
        });
      }
    });
  },
  addPjaxListener: function () {
    document.addEventListener('pjax:send', () => {
      topbar.show();
      document.body.classList.add("pjax-start");
      document.body.classList.remove("pjax-end");
    })
    document.addEventListener('pjax:complete', () => {
      topbar.hide();
      document.body.classList.remove("pjax-start");
      document.body.classList.add("pjax-end");
    })
  },
  pjax: function () {
    new Pjax({
      elements: 'a:not([data-no-pjax])',
      selectors: ['#main'],
      cacheBust: false,
    });
    Tiny.addPjaxListener();
  },
}