import { setUserData } from "@/redux/auth/authReducer";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { Avatar, Button, Checkbox, ThemedText } from "@/src/components";
import { PaymentSchema, usePaymentSchema } from "@/src/schema/payment.schema";
import { AVATAR } from "@/src/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Payment() {
  const paymentSchema = usePaymentSchema();
  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver:zodResolver(paymentSchema),
    defaultValues: {
      isAgreeToTermsAndConditions: false,
    },
  });
  const onSubmit:SubmitHandler<PaymentSchema> = (data ) => {
    dispatch(setUserData({isAuthenticated:true}));
  }
  return (
    <FormProvider {...methods}>
    <SafeAreaView className="flex-1 items-center p-[20px] gap-[10px] justify-center">
        <Avatar name={AVATAR.name} size={100} source={{uri:AVATAR.image}} placeholder={{blurhash:AVATAR.blurhash}} />
        <ThemedText variant="title" textContent="payment.doctor-name" />
        <ThemedText variant="subtitle" className="text-center" textContent="payment.doctor-description" />
        <Checkbox label="payment.agree-to-terms-and-conditions" name="isAgreeToTermsAndConditions" color="text" />
        <Button onPress={methods.handleSubmit(onSubmit)} label="payment.confirm-pay" variant="primary" className="w-full" />
        <ThemedText variant="title"  textContent="payment.amount" />
    </SafeAreaView>
    </FormProvider>
  )
}