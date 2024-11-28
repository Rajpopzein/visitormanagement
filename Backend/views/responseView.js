const successResponse = ({message, data}) => { return{
    statusCode: 200,
    message: message ?? "Success!",
    ...(data && { data }),
  }};

const errorResponse = (message, statusCode) => {return{
    statusCode,
    message,
  }};

export {successResponse, errorResponse}