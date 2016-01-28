module.exports = function(Artist) {
  Artist.testadd = function(name, cb) {
    Artist.findOne({
      where: {
        name: name
      }
    }, function(err, artist) {
      if (artist == null) {
        Artist.create({
          name: name
        }, function() {
          cb(null, {
            name: name,
            status: 'created'
          });
        });
      } else {
        cb(null, {
          status: 'exist'
        });
      }

    });
  };
  Artist.remoteMethod('testadd', {
    http: {
      path: '/testadd',
      verb: 'get'
    },
    accepts: {
      arg: 'name',
      type: 'string',
      http: {
        source: 'query'
      }
    },
    returns: {
      arg: 'artist',
      type: 'string'
    }
  })
};
