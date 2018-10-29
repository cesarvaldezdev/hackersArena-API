// FIXME agregar documentacion a clase y métodos
// FIXME para el manejo de estados 0, 1 y 2 sería mejor usar una constante definida con un nombre mas claro

class Response {
  static notFound(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `No items found in ${table}` },
    };
    return error;
  }

  static created(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `Successful registration of ${table} element` },
    };
    return error;
  }

  static cantCreate(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `Impossible to register ${table} element` },
    };
    return error;
  }

  static updated(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `Successful update ${table} element` },
    };
    return error;
  }

  static cantUpdate(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `Impossible to update ${table} element` },
    };
    return error;
  }

  static deleted(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `Successful deleted ${table} element` },
    };
    return error;
  }

  static cantDelete(table) {
    const error = {
      message: 'Query results',
      status: 204,
      details: { table: `Impossible to delete ${table} element'` },
    };
    return error;
  }
}


module.exports = new Response();
