var fs = require('fs');
var mu = require('mu2');
var path = require('path');
mu.root = path.join(__dirname, 'templates');
var projectDirectory = path.join(process.cwd(), 'build');

function writeProject() {
  createProjectDirectory();
  mu.compileAndRender('server.mustache', {})
  .on('data', function (data) {
    fs.writeFileSync(path.join(projectDirectory, 'server.js'), data);
  });

   mu.compileAndRender('package.mustache', {})
  .on('data', function (data) {
    fs.writeFileSync(path.join(projectDirectory, 'package.json'), data);
  });
}

function createProjectDirectory(content) {	
	if (!fs.existsSync(projectDirectory)){
		fs.mkdirSync(projectDirectory);
	}	
}

module.exports = writeProject;