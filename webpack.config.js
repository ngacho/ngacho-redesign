const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode : 'development',
  devtool: "source-map",

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    allStyles: ['./all.css', './app/view/navigation/nav-bar.css'],
    navigation : './app/view/navigation/navigation.js',
    
    index: './app/homepage-app.js',
    homePageStyles : ['./homepage.css'],

    projects : './app/projects-list-app.js',
    projectPageStyles : ['./app/view/projects/projects.css'],

    blog : './app/blog-list-app.js',
    blogPageStyles : ['./app/view/blog/blog.css'],

    bio : './app/about-me-app.js',
    bioPageStyles : ['./app/view/bio/aboutme.css'],

    contact : './app/view-contact-me-app.js',
    contactPageStyles : ['./app/view/contact-me/contact-me.css']


    
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },
 

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
      chunks: ['index', 'navigation', 'allStyles', 'homePageStyles'],
      filename: 'index.html'
    }),

    new HtmlWebpackPlugin({
      template: './app/view/projects/projects.html',
      inject: true,
      chunks: ['projects', 'navigation', 'allStyles', 'projectPageStyles'],
      filename: 'projects.html'
    }),

    new HtmlWebpackPlugin({
      template: './app/view/blog/blog.html',
      inject: true,
      chunks: ['blog', 'navigation', 'allStyles', 'blogPageStyles'],
      filename: 'blog.html'
    }),

    new HtmlWebpackPlugin({
      template: './app/view/bio/aboutme.html',
      inject: true,
      chunks: ['bio', 'navigation', 'allStyles', 'bioPageStyles'],
      filename: 'aboutme.html'
    }),

    new HtmlWebpackPlugin({
      template: './app/view/contact-me/contact.html',
      inject: true,
      chunks: ['contact', 'navigation', 'allStyles', 'contactPageStyles'],
      filename: 'contact.html'
    })
  ]
};
