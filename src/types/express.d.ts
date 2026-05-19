declare global {
  namespace Express {
    interface Response {
      error: (params: {
        errorCode?: string | null;
        message?: string | null;
        data?: any | null;
      }) => void;
    }
  }
}

export {};