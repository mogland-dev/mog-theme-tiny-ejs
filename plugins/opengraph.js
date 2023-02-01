module.exports = {
  name: 'opengraph',
  opengraph: function () {
    const siteName = config.seo.title;
    const siteDescription = config.seo.description;
    const isArticle = page.title ? true : false;
    const title = isArticle ? page.title : siteName;
    const summary = isArticle ?
    page.summary ? page.summary : page.text.substring(0, 100) 
    : siteDescription;
    const image = page.image ? page?.image[0].url : config.user.avatar;
    const _url = url.url;
    const type = isArticle ? 'article' : 'website';
    return `
    <meta property="og:title" content="${title}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${_url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:description" content="${summary}" />
    `
  },
}