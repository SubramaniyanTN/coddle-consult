import { TranslationKeys, useCustomTranslation } from "@/locale";
import { tw, TwStyle } from "@mgcrea/react-native-tailwind";
import { Text, TextProps, TextStyle } from "react-native";

type TextVariant =
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "button"
  | "label"|"cardCaption";

type ThemedTextProps = TextProps & {
  textContent?: TranslationKeys;
  variant?: TextVariant;
  className?: string;
};

export default function ThemedText({
  textContent,
  variant = "body",
  className = "",
  children,
  ...rest
}: ThemedTextProps) {
  // Variant configurations using tw (runtime transformation)
const variantStyles: Record<TextVariant, TwStyle<TextStyle>> = {
  title: tw`text-[28px] font-bold scheme:text-text`,
  cardCaption: tw`text-[20px] font-semibold scheme:text-text`,
  subtitle: tw`text-[16px] scheme:text-subText`,
  button: tw`text-[17px] font-semibold scheme:text-buttonText`,
  body: tw`text-[15px] scheme:text-text`,
  label: tw`text-[14px] font-medium scheme:text-text`,
  caption: tw`text-[13px] scheme:text-subText`,
};

  const translation = useCustomTranslation();
  const text = textContent ? translation(textContent) : children;
  const variantStyle = variantStyles[variant];
  return (
    <Text
      {...rest}
      className={className}
      style={[variantStyle.style,rest.style]} // ← Apply pre-compiled style
    >
      {text}
    </Text>
  );
}
