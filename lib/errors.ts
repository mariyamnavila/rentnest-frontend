export enum ErrorType {
  NETWORK = 'NETWORK',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION = 'VALIDATION',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export type AppError = {
  type: ErrorType;
  message: string;
  statusCode?: number;
  digest?: string;
};

export function getErrorType(statusCode: number): ErrorType {
  switch (statusCode) {
    case 401:
      return ErrorType.UNAUTHORIZED;
    case 403:
      return ErrorType.FORBIDDEN;
    case 404:
      return ErrorType.NOT_FOUND;
    case 422:
      return ErrorType.VALIDATION;
    case 500:
    case 502:
    case 503:
      return ErrorType.SERVER;
    default:
      return ErrorType.UNKNOWN;
  }
}

export function handleApiError(res: Response, result?: { message?: string }): AppError {
  const statusCode = res.status;
  const type = getErrorType(statusCode);

  const messages: Record<ErrorType, string> = {
    [ErrorType.NETWORK]: 'Unable to connect to the server. Please check your internet connection.',
    [ErrorType.UNAUTHORIZED]: 'Your session has expired. Please log in again.',
    [ErrorType.FORBIDDEN]: 'You do not have permission to access this resource.',
    [ErrorType.NOT_FOUND]: 'The requested resource was not found.',
    [ErrorType.VALIDATION]: 'Please fix the validation errors and try again.',
    [ErrorType.SERVER]: 'Something went wrong on our end. Please try again later.',
    [ErrorType.UNKNOWN]: 'An unexpected error occurred. Please try again.',
  };

  return {
    type,
    message: result?.message || messages[type],
    statusCode,
  };
}

export function handleNetworkError(): AppError {
  return {
    type: ErrorType.NETWORK,
    message: 'Unable to connect to the server. Please check your internet connection.',
  };
}
