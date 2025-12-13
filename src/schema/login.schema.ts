import { useCustomTranslation } from "@/locale";
import { z } from "zod";

export const useLoginSchema = () => {
  const translation = useCustomTranslation();
  return z.object({
    concern: z.string({error:translation("login.concern-error") }).min(1, { message:translation("login.concern-error") },).max(100, { message: translation("login.concern-max-error") }),
    preference:z.enum([translation('login.chat'), translation('login.video')],{error:translation("login.preference-error")}),
  });
}

export type LoginSchema = z.infer<ReturnType<typeof useLoginSchema>>;