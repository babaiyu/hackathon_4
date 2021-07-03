const response = (success: boolean, message: string = '', data: any = null) => {
  return {
    success,
    message,
    data,
  };
};

export default response;
