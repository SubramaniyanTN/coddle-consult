import { Avatar, Button, Checkbox, ThemedText } from "@/src/components";
import { PaymentSchema, usePaymentSchema } from "@/src/schema/payment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
const AVATAR={
    blurhash:'LEOgB3D$_N?b~qxvtSRjIot6D$IV',
    name:'Doctor',
    image:'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMV9waG90b2dyYXBoeV9vZl9hbl9zb3V0aF9pbmRpYW5fd29tZW5fYXNfYV9kb2N0b19kMzAxMDM3Zi03MDUzLTQxNDAtYmYyZS1lZDFlYWE0YTM3NDRfMS5qcGc.jpg'
}

export default function Payment() {
  const paymentSchema = usePaymentSchema();
  const methods = useForm({
    resolver:zodResolver(paymentSchema),
    defaultValues: {
      isAgreeToTermsAndConditions: false,
    },
  });
  const onSubmit:SubmitHandler<PaymentSchema> = (data ) => {
    console.log({data});
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