export interface IOrder {
  order?: string | null;
  name?: string | null;
  phone?: string | null | undefined;
}

export interface IResponseSendOrder {
  success: number;
  message: string;
  error: {
    message: string;
  };
}
