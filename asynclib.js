var async = {};
async.while = function(args) {
  var broken = false;
  var f = g =>
    args.cond() && !broken ? setTimeout(() => (args.func(), g(g)), args.time || 0) : args.noAftIfBrk ? !broken ? (args.after || (a) => a)() : null : (args.after || (a) => a)();
  f(f);
  return () => broken = true;
};
async.forever = (args) => async.while({
  cond: () => true,
  func: args.func,
  after: args.after,
  time: args.time || 0
});

async.map = (args, i) => (i = i || 0, async.while({
  cond: () => i < args.arry.length,
  func: () => (args.arry[i] = args.func(args.arry[i], i, args.arry), i++),
  after: args.after,
  time: args.time || 0
}));
async.filter = (args, arry) => 
  arry = [],
  async.map({
    arry: args.arry
    func: e => args.cond(e) ? arry.push(e) : null
    after: () => args.after(arry)
    time: args.time || 0
  })

//async.chain = function(args) {
//  
//};
