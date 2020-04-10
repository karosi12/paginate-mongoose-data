module.exports.responses = {
    success: (errorCode, data, message) => {
      return {
        error: false,
        errorCode,
        data,
        message
      };
    },
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