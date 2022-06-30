export type CreateAccount =
  | {
      ok: boolean;
      result: {
        short_name: string;
        author_name: string;
        author_url: string;
        access_token: string;
        auth_url: string;
      };
    }
  | ErrorMessage;

export type AccountInfo = (CreateAccount & { result: { page_count: number } }) | ErrorMessage;

export type ErrorMessage = {
  ok: false;
  error: string;
};

export type PageObject = {
  path: string;
  url: string;
  title: string;
  description: string;
  author_name?: string;
  author_url?: string;
  views: number;
  can_edit?: boolean;
};
