module.exports = {
  index: function(params, callback) {
    var err = new Error("Denied");
    err.status = 403;
    callback(err);
  }
}
