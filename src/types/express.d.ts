declare global {
  namespace Express {
    interface Response {
      error: (params: {
        errorCode?: string | null;
        message?: string | null;
        data?: any | null;
      }) => void;
      success: (data: any) => void;  // ← 이거 추가
    }
  }
}

export {};