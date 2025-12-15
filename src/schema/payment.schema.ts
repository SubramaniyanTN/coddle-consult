import { useCustomTranslation } from "@/locale";
import { z } from "zod";

export const usePaymentSchema = () => {
  const translation = useCustomTranslation();
  return z.object({
    isAgreeToTermsAndConditions: z.boolean({error:translation("payment.i-agree-to-the-terms-and-conditions-error")}).refine((value) => value, {
      message:translation("payment.i-agree-to-the-terms-and-conditions-error"),
    }),
  });
};

export type PaymentSchema = z.infer<ReturnType<typeof usePaymentSchema>>;