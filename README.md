template repo for future projects

INCLUDES:

Webpack, Jest, Babel && babel-jest; Relevant npm scripts included:

"scripts": {
  "build": "webpack",
  "babel": "babel src -d dist",
  "test":  "jest",
  "watch": "jest --watch *.js"
}

Browserlist for Babel handled in package.json:

"browserslist": [
  "last 2 versions",
  "> 0.5%",
  "not dead"
]