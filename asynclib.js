var async = {};
async.while = function(cond, func, time) {
  var broken = false;
  var f = g =>
    cond() && !broken ? setTimeout(() => (func(), g(g)), time || 0) : null;
  f(f);
  return () => broken = true;
};
async.forever = (func, time) => async.while(() => true, func, time);
async.forEach = (arry, func, time, i) => (i = i || 0,
  async.while(() => i < arry.length, () => (func(arry[i]), i++), time));
