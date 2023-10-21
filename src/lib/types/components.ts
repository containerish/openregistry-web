import { z } from "zod";

export const DialogCloser = z.function().returns(z.void());
export const DialogSuccessHandler = z.function().returns(z.promise(z.void()));
export type DialogCloser = z.infer<typeof DialogCloser>;
export type DialogSuccessHandler = z.infer<typeof DialogSuccessHandler>;

