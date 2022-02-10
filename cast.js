const cast = (schema, instance, object) => {
  switch (schema.constructor) {
    case Object:
      for (const key in schema) {
        const s = schema[key];
        instance[key] = cast(s, instance[key], object?.[key]);
      }
      return instance;

    case Array:
      const s = schema[0];
      schema = [];
      if (object?.constructor === Array) {
        for (let i = 0; i < object?.length; i++) {
          instance[i] = cast(s, instance[i], object?.[i]);
        }
      }
      return instance;
  }

  if (schema.constructor === object?.constructor) {
    return object;
  }

  return schema.constructor(object);
};

exports.cast = ({ instance, schema }, object) => cast(schema, instance, object);
