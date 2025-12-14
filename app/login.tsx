import { useCustomTranslation } from "@/locale";
import { Button, Input, Radio, ThemedText } from "@/src/components";
import { LoginSchema, useLoginSchema } from "@/src/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(false);
  const loginSchema = useLoginSchema();
    const methods = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
    })
    const translation = useCustomTranslation();
    const chatLabel = translation('login.chat');
    const videoLabel = translation('login.video');
    const radioButtons = useMemo(() => [
        {
            id: chatLabel,
            label: chatLabel,
            value: chatLabel,
        },
        {
            id: videoLabel,
            label: videoLabel,
            value: videoLabel,
        }], [chatLabel, videoLabel]);
  const handleSubmit:SubmitHandler<LoginSchema> = (data) => {
    setIsDisabled(true);
    router.push(`/payment?message=${data.concern}`);
    setIsDisabled(false);
  }
  return (
    <SafeAreaView className="flex-1 justify-center p-[10px]">
    <FormProvider {...methods}>
      <ThemedText variant="title" textContent="login.fill-out-form" className="text-center mb-5" />
        <Input name="concern" label="login.concern" placeholder="login.concern-placeholder" />
        <Radio label="login.preference" name="preference" radioButtons={radioButtons} />
        <Button disabled={isDisabled} className="w-full mt-3" onPress={methods.handleSubmit(handleSubmit)} label="login.preference" />
    </FormProvider>
    </SafeAreaView>
  )
}