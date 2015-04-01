module.exports = compact;

function compact(triples) {
  return triples.reduce(function(resources, triple) {
    var resource = resources[triple.subject];

    if (!resource) {
      resources[triple.subject] = resource = {
        '@id': triple.subject,
      };
    }

    var o = resource[triple.predicate];

    if (typeof o === 'undefined') {
      resource[triple.predicate] = triple.object;
    } else if (Array.isArray(o)) {
      o.push(triple.object);
    } else {
      resource[triple.predicate] = [o, triple.object];
    }

    return resources;
  }, {});
}
