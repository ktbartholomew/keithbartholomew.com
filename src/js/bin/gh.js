var Executable = require('../lib/files/executable');

module.exports = new Executable({
  name: 'gh',
  main: function () {
    var usage = () => {
      this.stdout.write('Usage: gh get repos\r\n')
      this.exit(1);    
    };


    if (arguments[1] !== 'get' && arguments[2] !== 'repos') {
      return usage();
    }

    fetch('https://api.github.com/users/ktbartholomew/repos')
    .then((res) => {
      return res.json();
    })
    .then((repos) => {
      repos.forEach((repo) => {
        this.stdout.write(repo.full_name + '\r\n');
      });

      this.exit(0);
    })
    .catch((err) => {
      console.log(err);
      this.exit(1);
    })
  }
});

