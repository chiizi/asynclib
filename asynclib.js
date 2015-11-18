var async = {};
async.while = function(cond, func, time) {
  var f = function(g) {
    cond() ? setTimeout(() => (func(), g(g)), time || 0) : null;
  };
  f(f);
};
