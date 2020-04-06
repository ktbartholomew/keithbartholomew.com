var Directory = require('./files/directory');
var File = require('./files/file');
var ImageFile = require('./files/image');
var MarkdownFile = require('./files/markdown');
var Hyperlink = require('./files/hyperlink');
var os = require('./os');
var fs = require('./fs');
var fakeboot = require('./fakeboot').default;
var path = require('path-browserify');

module.exports = function () {
  fs.write('/', new Directory());
  fs.write('/bin', new Directory());
  fs.write('/etc', new Directory());
  fs.write('/home', new Directory());
  fs.write('/home/website', new Directory());
  fs.write('/sbin', new Directory());
  fs.write('/usr', new Directory());
  fs.write('/usr/bin', new Directory());
  fs.write('/usr/local', new Directory());
  fs.write('/usr/local/bin', new Directory());
  fs.write('/var', new Directory());

  fs.write('/bin/cat', require('../bin/cat'));
  fs.write('/usr/bin/cd', require('../bin/cd'));
  fs.write('/bin/ls', require('../bin/ls'));
  fs.write('/bin/motd', require('../bin/motd'));
  fs.write('/bin/ps', require('../bin/ps'));
  fs.write('/bin/pwd', require('../bin/pwd'));
  fs.write('/sbin/reboot', require('../sbin/reboot'));
  fs.write('/bin/sleep', require('../bin/sleep'));
  fs.write('/bin/mkdir', require('../bin/mkdir'));
  fs.write('/bin/sh', require('../bin/sh'));
  fs.write('/usr/bin/whoami', require('../bin/whoami'));
  fs.write('/usr/local/bin/view', require('../bin/view'));
  fs.write('/usr/local/bin/open', require('../bin/open'));

  fs.write(
    '/etc/motd',
    new File({contents: require('raw-loader!../etc/motd').default})
  );
  fs.write(
    '/etc/resolv.conf',
    new File({contents: require('raw-loader!../etc/resolv.conf').default})
  );
  fs.write(
    '/etc/passwd',
    new File({contents: require('raw-loader!../etc/passwd').default})
  );
  fs.write(
    '/etc/shadow',
    new File({contents: require('raw-loader!../etc/shadow').default})
  );
  fs.write(
    '/etc/group',
    new File({contents: require('raw-loader!../etc/group').default})
  );
  fs.write('/home/otheruser', new Directory());
  fs.write(
    '/home/website/help.md',
    new MarkdownFile({contents: require('raw-loader!../home/help.md').default})
  );
  fs.write(
    '/home/website/about-me.md',
    new MarkdownFile({
      contents: require('raw-loader!../home/about-me.md').default
    })
  );
  fs.write(
    '/home/website/resume.md',
    new MarkdownFile({
      contents: require('raw-loader!../home/resume.md').default
    })
  );
  fs.write('/home/website/links', new Directory());
  fs.write(
    '/home/website/links/README.md',
    new MarkdownFile({
      contents: require('raw-loader!../home/links/README.md').default
    })
  );
  fs.write(
    '/home/website/links/twitter.url',
    new Hyperlink({href: 'https://twitter.com/ktbartholomew'})
  );
  fs.write(
    '/home/website/links/github.url',
    new Hyperlink({href: 'https://github.com/ktbartholomew'})
  );
  fs.write(
    '/home/website/links/linkedin.url',
    new Hyperlink({href: 'https://www.linkedin.com/in/ktbartholomew'})
  );
  fs.write(
    '/home/website/links/strava.url',
    new Hyperlink({href: 'https://www.strava.com/athletes/ktbartholomew'})
  );
  fs.write('/home/website/photos', new Directory());
  fs.write(
    '/home/website/photos/README.md',
    new MarkdownFile({contents: require('raw-loader!../home/photos/README.md')})
  );
  fs.write(
    '/home/website/photos/keith.jpg',
    new ImageFile({src: '/img/keith.jpg'})
  );
  fs.write(
    '/home/website/photos/time-trial-1.jpg',
    new ImageFile({src: '/img/time-trial-1.jpg'})
  );
  fs.write(
    '/home/website/photos/time-trial-2.jpg',
    new ImageFile({src: '/img/time-trial-2.jpg'})
  );
  fs.write(
    '/home/website/photos/trek-madone.jpg',
    new ImageFile({src: '/img/trek-madone.jpg'})
  );
  fs.write(
    '/home/website/photos/derby.jpg',
    new ImageFile({src: '/img/derby.jpg'})
  );
  fs.write('/home/website/portfolio', new Directory());
  fs.write(
    '/home/website/portfolio/README.md',
    new MarkdownFile({
      contents: require('raw-loader!../home/portfolio/README.md')
    })
  );
  fs.write('/home/website/portfolio/carina', new Directory());
  fs.write(
    '/home/website/portfolio/carina/index.md',
    new MarkdownFile({
      contents: require('raw-loader!../home/portfolio/carina/index.md')
    })
  );
  fs.write(
    '/home/website/portfolio/carina/carina.jpg',
    new ImageFile({src: '/img/portfolio/carina/carina.jpg'})
  );
  fs.write(
    '/home/website/portfolio/carina/carina-ui.jpg',
    new ImageFile({src: '/img/portfolio/carina/carina-ui.jpg'})
  );

  fs.write('/home/website/portfolio/developer.rackspace.com', new Directory());
  fs.write(
    '/home/website/portfolio/developer.rackspace.com/index.md',
    new MarkdownFile({
      contents: require('raw-loader!../home/portfolio/developer.rackspace.com/index.md')
        .default
    })
  );
  fs.write(
    '/home/website/portfolio/developer.rackspace.com/developer.rackspace.com.jpg',
    new ImageFile({
      src: '/img/portfolio/developer.rackspace.com/developer.rackspace.com.jpg'
    })
  );

  fs.write('/home/website/portfolio/skywriter', new Directory());
  fs.write(
    '/home/website/portfolio/skywriter/index.md',
    new MarkdownFile({
      contents: require('raw-loader!../home/portfolio/skywriter/index.md')
        .default,
      escapeHtml: false
    })
  );

  startShell();
};

function startShell() {
  var startPath = '/home/website' + window.location.pathname;
  var entryStat = fs.stat(startPath);

  if (entryStat.type !== null) {
    if (entryStat.type === 'directory') {
      if (fs.stat(startPath + '/index.md').type !== null) {
        // os.chdir(path.resolve(startPath, '..'), true);
        os.exec(['/usr/local/bin/open', startPath + '/index.md']);
        os.exec(['/bin/sh']);
        return;
      }

      os.exec(['/bin/sh']);
      return;
    }

    os.chdir(path.resolve(startPath, '..'), true);
    os.exec(['/usr/local/bin/open', startPath]);
    os.exec(['/bin/sh']);

    return;
  }

  fakeboot(function () {
    os.exec(['/bin/motd']);
    os.exec(['/bin/sh']);
  });
}
