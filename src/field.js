/**
 * @class
 */
export default class Field{

  /**
   * @constructor
   * @param {Object} options
   * @param {Object} [options.fallback=null] The fallback if the field is not found
   * @param {String} options.name The value to identify the field
   * @param {RegExp|Function} [options.path] The path regexp to test against.
   *                                         The function to call to check whether or not the arguments is part of the pathname  
   * @param {Boolean} [options.persistent=false] Whether or not use the localstorage are a source and provider
   * @param {RegExp|Function} [options.search] The search regexp to test against. 
   *                                           The function to call to check whether or not the arguments is part of the search query string  
   * @param {Function} [options.validator] Whether or not the value detected is valid or not
   * @param {Array} [options.values=[]] A list of allowed values for the field. Will be used to check against for validity. 
   */
  constructor({ fallback = null, name, path = null, persistent = false, search = false, validator = null, values = [] }){
    this.fallback = fallback;
    this.name = name;
    this.path = path;
    this.persistent = persistent;
    this.search = search;
    this.validator = validator;
    this.values = values;
  }

  /**
   * Whether or not the field is in the pathname
   * 
   * @property {Boolean}
   * @readonly
   */
  get isPath(){
    return this.path != null;
  }

  /**
   * Whether or not the field is in the search query string
   * 
   * @property {Boolean}
   * @readonly
   */
  get isSearch(){
    return this.search != null;
  }

  /**
   * @returns {Boolean}
   * @param {*} value 
   */
  isValid(value){
    return this.validator ?
           this.validator.call(this) : 
           this.values && this.values.length > 0 ? 
            this.values.includes(value) : 
            true;
  }
}
