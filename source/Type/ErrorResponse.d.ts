interface ResponseError {
  error: string;
  error_type: string;
  message?: string;
  success: boolean;
}

export default ResponseError;
