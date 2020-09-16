import { basil } from '@spices/basil'
import Field from './field'

/**
 * Anis
 * 
 * @class
 */
export default class Anis{

  /**
   * Detect the given fields in
   * - The localstorage if persistent
   * - The location pathname
   * - The query string
   * 
   * @param {Array.<Field>} fields 
   * @returns {Object}
   */
  static detect(fields){
    let ret = {};

    // Defaults
    fields.forEach(field => {
      ret[field.name] = field.fallback
    });
    
    // Persisted values
    fields.filter(f => f.persistent === true)
          .forEach(f => {
            let v = localStorage.getItem(f.name);

            // No value
            if (!v){
              return;
            }

            // Not a valid value
            if(v && !f.isValid(v)){
              localStorage.removeItem(f.name);
              return;
            }

            ret[f.name] = v
          });

    // Pathname
    let pathname = document.location.pathname
    let sf = fields.filter(f => f.isPath === true);
    sf.forEach(f => {
      let value = null;

      // Regexp
      if(basil.isRegExp(f.path)){
        value = f.path.exec(pathname);
        if (value && value[1]){
          value = value[1];
        }
      }

      // Function
      if (basil.isFunction(f.path)){
        value = f.path.call(f, pathname);
      }

      if (!value || !f.isValid(value)){
        return;
      }

      ret[f.name] = value;
    });

    // Query String
    let query = document.location.search;
    let qf = fields.filter(f => f.isSearch === true);
    let parts = query.split('&');
    parts = parts.filter(p => p.trim().length > 0);
    parts.forEach(p => {
      qf.forEach(f => {
        let value = null;

        // Regexp
        if (basil.isRegExp(f.search)) {
          value = f.search.exec(p);
          if (value && value[1]){
            value = value[1];
          }
        }

        // Function
        if (basil.isFunction(f.search)) {
          value = f.search.call(f, p);
        }

        if (!value || !f.isValid(value)) {
          return;
        }

        ret[f.name] = value;
      })
    });

    // Save the persistents
    fields.filter(f => f.persistent === true && f.isValid(ret[f.name]))
          .forEach(f => localStorage.setItem(f.name, ret[f.name]))

    // End
    return ret;
  }
}
