window.Tiny = {
  injectVditorScript: async function () {
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
  }
}