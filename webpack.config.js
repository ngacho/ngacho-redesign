const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');


module.exports = {
  mode : process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',

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

    blogPost : './app/blog-post-app.js',
    blogPostPageStyles : ['./app/view/blog/blog-post.css'],

    bio : './app/about-me-app.js',
    bioPageStyles : ['./app/view/bio/aboutme.css'],

    contact : './app/view-contact-me-app.js',
    contactPageStyles : ['./app/view/contact-me/contact-me.css'],

    /**
     * admin pages
     */ 

    adminPageStyles : ['./app/view/admin/admin-home.css'],

    blogEditor : './app/edit-blog-app.js',
    blogEditorPageStyles : ['./app/view/blog/admin/blog-editor.css'],
  
    blogListAdmin : './app/blogs-to-edit-app.js',
    blogListAdminPageStyles : ['./app/view/blog/admin/blogs_to_edit.css'],
  
    bioListAdmin : './app/bio-list-app.js',
    bioListAdminPageStyles : ['./app/view/bio/admin/edit-bio-list.css'],

    editBioAdmin : './app/edit-bio-app.js',
    editBioAdminPageStyles : ['./app/view/bio/admin/bio-editor.css'],

    contactListAdmin : './app/contact-me-list-app.js',
    contactListAdminPageStyles : ['./app/view/contact-me/admin/contact-me-list.css'],

    contactMeEditorAdmin : './app/edit-contact-me-app.js',
    contactMeEditorAdminPageStyles : ['./app/view/contact-me/admin/edit-contact-me.css'],

    projectsListAdmin : './app/view-project-app.js',
    projectsListAdminPageStyles : ['./app/view/projects/admin/projects_to_edit.css'],
  
    projectEditorAdmin : './app/edit-project-app.js',
    projectEditorAdminPageStyles : ['./app/view/projects/admin/project-editor.css'],

    miscFilesListAdmin : './app/misc-file-list-app.js',
    miscFilesListAdminPageStyles : ['./app/view/admin/misc-files/misc-file-list.css'],

    miscFilesEditorAdmin : './app/misc-file-editor-app.js',
    miscFilesEditorAdminPageStyles : ['./app/view/admin/misc-files/misc-file-editor.css']
    
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
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
    new CopyPlugin({
      patterns: [
        { from: "images", to: "images" },
      ],
    }),

    new HtmlWebpackPlugin({
      template: './403.html',
      inject: true,
      chunks: ['navigation', 'allStyles'],
      filename: '403.html'
    }),

    new HtmlWebpackPlugin({
      template: './404.html',
      inject: true,
      chunks: ['navigation', 'allStyles'],
      filename: '404.html'
    }),

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
      template: './app/view/blog/blog_post.html',
      inject: true,
      chunks: ['blogPost', 'navigation', 'allStyles', 'blogPostPageStyles'],
      filename: 'blog_post.html'
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
    }),

    new HtmlWebpackPlugin({
      template: './app/view/admin/admin-home.html',
      inject: true,
      chunks: ['navigation', 'allStyles', 'adminPageStyles'],
      filename: 'admin-home.html'
    }),

    // EDITING HERE
    
    new HtmlWebpackPlugin({
      template: './app/view/blog/admin/blog_editor.html',
      inject: true,
      chunks: ['navigation', 'allStyles', 'blogEditor', 'blogEditorPageStyles'],
      filename: 'blog_editor.html'
    }),

    new HtmlWebpackPlugin({
      template: './app/view/blog/admin/blogs_to_edit.html',
      inject: true,
      chunks: ['allStyles', 'navigation', 'blogListAdmin', 'blogListAdminPageStyles'],
      filename: 'blogs_to_edit.html'
    }),
    
    new HtmlWebpackPlugin({
      template: './app/view/bio/admin/edit-bio-list.html',
      inject: true,
      chunks: ['bioListAdmin', 'navigation', 'allStyles', 'bioListAdminPageStyles'],
      filename: 'edit-bio-list.html'
    }),
    
    new HtmlWebpackPlugin({
      template: './app/view/bio/admin/bio-editor.html',
      inject: true,
      chunks: ['editBioAdmin', 'navigation', 'allStyles', 'editBioAdminPageStyles'],
      filename: 'bio-editor.html'
    }),
    
    new HtmlWebpackPlugin({
      template: './app/view/contact-me/admin/contact-me-list.html',
      inject: true,
      chunks: ['contactListAdmin', 'navigation', 'allStyles', 'contactListAdminPageStyles'],
      filename: 'contact-me-list.html'
    }),
    
    new HtmlWebpackPlugin({
      template: './app/view/contact-me/admin/edit-contact-me.html',
      inject: true,
      chunks: ['contactMeEditorAdmin', 'navigation', 'allStyles', 'contactMeEditorAdminPageStyles'],
      filename: 'edit-contact-me.html'
    }),
    
    new HtmlWebpackPlugin({
      template: './app/view/projects/admin/projects_to_edit.html',
      inject: true,
      chunks: ['projectsListAdmin', 'navigation', 'allStyles', 'projectsListAdminPageStyles'],
      filename: 'projects_to_edit.html'
    }),
    
    new HtmlWebpackPlugin({
      template: './app/view/projects/admin/project-editor.html',
      inject: true,
      chunks: ['projectEditorAdmin', 'navigation', 'allStyles', 'projectEditorAdminPageStyles'],
      filename: 'project-editor.html'
    }),
    
    new HtmlWebpackPlugin({
      template: './app/view/admin/misc-files/misc-files-list.html',
      inject: true,
      chunks: ['miscFilesListAdmin', 'navigation', 'allStyles', 'miscFilesListAdminPageStyles'],
      filename: 'misc-files-list.html'
    }),
    
    new HtmlWebpackPlugin({
      template: './app/view/admin/misc-files/misc-file-editor.html',
      inject: true,
      chunks: ['miscFilesEditorAdmin', 'navigation', 'allStyles', 'miscFilesEditorAdminPageStyles'],
      filename: 'misc-file-editor.html'
    }),
    
  ]
};
