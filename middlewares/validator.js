// FIXME Corregir errores de linter
// FIXME agregar documentacion a clases y métodos
/**
 * The middleware that validates inputs
 */
class Validator {
  static get regex() {
    return {
      datetime: /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/,
      word: /[a-zA-ZñÑ ]{3,}/,
      alias: /[a-zA-ZñÑ0-9 ]{3,}/,
      language: /[a-zA-ZñÑ0-9\+ ]{1,}/,
      password: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
      number: /^[0-9]+\.?[0-9]*$/,
      email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };
  }
  // FIXME arreglar para mantener funciones en multiples lineas
  static datetime(data){ return (Validator.regex.datetime.test(data));}

  static word(data){ return (Validator.regex.word.test(data));}

  static language(data){ return (Validator.regex.language.test(data));}

  static alias(data){ return (Validator.regex.alias.test(data));}

  static password(data){ return (Validator.regex.password.test(data));}

  static required(data){ return data !== undefined && data !== null && data.length;}

  static email(data){ return (Validator.regex.email.test(data));}

  static number(data){ return (Validator.regex.number.test(data));}

  static validate(req, res, next, rules) {
    const error = {
      message: 'Validation Error',
      status: 409,
      details: {},
    };

    for (let part in rules) {
      for (let field in rules[part]) {
        let validators = rules[part][field].split(',');
        validators.forEach((f) => {
          if (!Validator[f](req[part][field] || '')) {
            if (Array.isArray(error.details[field])) {
              error.details[field].push(`The field ${field} should be a valid ${f}`);
            } else {
              error.details[field] = [`The field ${field} should be a valid ${f}`];
            }
          }
        });
      }
    }
    console.log(error);
    Object.keys(error.details).length ? next(error) : next();
  }
}


module.exports = Validator;
