var Executable = require('../lib/files/executable');

var AccessToken = {
  Get: () => {
    return localStorage.getItem('gh_token');
  },
  Set: (value) => {
    return localStorage.setItem('gh_token', value);
  },
  Renew: (callback) => {
    var messageHandler = e => {
      if (e.origin !== window.location.origin) {
        return;
      }

      AccessToken.Set(e.data);
      window.removeEventListener('message', messageHandler);
      e.source.close();
      callback();
    };

    window.addEventListener('message', messageHandler);
    window.open('/usr/local/bin/gh/oauth/authorize');
  }
}

module.exports = new Executable({
  name: 'gh',
  main: function() {
    var usage = () => {
      this.stdout.write('Usage: gh get repos\r\n');
      this.exit(1);
    };

    var getRepos = () => {
      var authHeaders = new Headers({
        Authorization: 'token ' + AccessToken.Get()
      });

      fetch('/usr/local/bin/gh/proxy/users/ktbartholomew/repos', {headers: authHeaders})
        .then(res => {
          return res.json();
        })
        .then(repos => {
          repos.forEach(repo => {
            this.stdout.write(repo.full_name + '\r\n');
          });

          this.exit(0);
        })
        .catch(err => {
          console.log(err);
          this.exit(1);
        });
    };

    if (arguments[1] !== 'get' && arguments[2] !== 'repos') {
      return usage();
    }

    if (AccessToken.Get() === null || AccessToken.Get() === '') {
      return AccessToken.Renew(getRepos);
    }

    getRepos();
  }
});
