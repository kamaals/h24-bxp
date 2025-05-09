/* istanbul ignore file @preserve */
export type Doc = { id: string };

export type SingleRequest = {
  id?: string;
};

export type GeneralAsyncRequestParams = Promise<{ id: string }>;
