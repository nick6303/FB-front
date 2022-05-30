module.exports = {
  publicPath: '/',
  devServer: {
    port: 8000,
  },
  chainWebpack: (config) => {
    // pug
    const pugRule = config.module.rule('pug')
    pugRule
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@as': '@/assets',
        '@c': '@/components',
        '@img': '@/assets/img',
        '@css': '@/assets/css',
        '@v': '@/views',
        '@api': '@/api',
        '@router': '@/router',
        '@l': '@/layout',
      },
    },
  },
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: '@import "@css/base/_variable.sass"',
      },
    },
  },
  productionSourceMap: false,
}
