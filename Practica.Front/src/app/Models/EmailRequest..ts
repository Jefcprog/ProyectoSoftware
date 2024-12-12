export class EmailRequest {
    to?: string;
    subject?: string;
    template?: string;
    params?: Record<string, string>;
  }
  