export default class ApiError extends Error {
  errObj: {
    [key: string]: string[];
  }[];

  constructor(
    errObj: {
      [key: string]: string[];
    }[],
    message: string,
  ) {
    super(message);
    this.name = 'UiError';
    this.errObj = errObj;
    this.message = message;
  }

  static isApiError(err: any): err is ApiError {
    return err instanceof ApiError;
  }

  static formatErrorMessage(err: ApiError) {
    return err.errObj
      .map((obj) =>
        Object.entries(obj)
          .map(([key, value]) => `錯誤欄位：${key}，錯誤訊息: ${value.join(', ')}`)
          .join('\n'),
      )
      .join('\n');
  }
}
