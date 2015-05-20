var test = require('tape');
var compact = require('..').compact;

test('compact', function(t) {
  t.plan(3);

  var triples = [
    { subject: 's1', predicate: 'p1', object: 'o1' },
    { subject: 's1', predicate: 'p2', object: 'o2' },
    { subject: 's2', predicate: 'p1', object: 'o3' },
    { subject: 's2', predicate: 'p2', object: 'o4' },
    { subject: 's2', predicate: 'p2', object: 'o5' },
  ];

  var resources = compact(triples);

  t.equal(Object.keys(resources).length, 2);

  t.deepEqual(resources.s1, {
    '@id': 's1',
    p1: 'o1',
    p2: 'o2',
  });

  t.deepEqual(resources.s2, {
    '@id': 's2',
    p1: 'o3',
    p2: ['o4', 'o5'],
  });
});
