How do we handle errors in rendr?
=================================

You need to pass an `errorHandler` parameter to the rendr server when
you create it, like this:

```
var server = rendr.createServer({
  dataAdapterConfig: dataAdapterConfig,
  errorHandler: errorHandler //< This is how you handle errors in rendr controllers/etc
});
```

You should also add the `errorHandler` middleware to the express stack
in case errors come from elsewhere.

```
app.use(errorHandler);
```

Just adding the standard `(err, req, res, next)` middleware to express
is insufficient for rendr-0.5.0-alpha09 as it will never be called.
