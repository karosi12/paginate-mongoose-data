module.exports.responses = {
    error: (statusCode, message) => {
      const errorMessage = {
        error: true,
        statusCode,
        message,
      };
      return errorMessage;
    },
    output: (statusCode, message, data, meta) => {
      const outputMessage = {
        error: false,
        statusCode,
        message,
        data,
        meta,
      };
      return outputMessage;
    },
  };