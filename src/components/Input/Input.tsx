import { TranslationKeys, useCustomTranslation } from "@/locale";
import useThemeColors from "@/src/utils/useThemedColors";
import { TextInput } from "@mgcrea/react-native-tailwind";
import { ComponentProps } from "react";
import { useController, useFormContext } from "react-hook-form";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
type InputProps = Omit<ComponentProps<typeof AnimatedTextInput>,"style"|"key"|"value"|"onChangeText"|"onBlur"> & {
  label?: TranslationKeys;
  placeholder?: TranslationKeys;
  // Style props
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  // className props (compile-time only)
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  name:string
};

function Input({
  label,
  placeholder,
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  name,
  ...otherProps
}: InputProps) {
const { control } = useFormContext();
const translation = useCustomTranslation();
const translatedLabel = label ? translation(label) : undefined;
const translatedPlaceholder = placeholder ? translation(placeholder) : undefined;
const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name, control });
  const colors =useThemeColors();
  return (
    <View className="mb-4 flex flex-col gap-2" style={style}>
      {translatedLabel && (
        <Text className="text-lg font-semibold scheme:text-text mb-2" style={labelStyle}>
          {translatedLabel}
        </Text>
      )}
      <AnimatedTextInput
        entering={FadeInDown.duration(1000)}
        {...otherProps}
        className="border-2 border-gray-300 focus:border-blue-500 p-3 rounded-lg bg-white"
        style={inputStyle}
        placeholder={translatedPlaceholder}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={colors["placeholder"]}
      />
      {error?.message && (
        <Text className="text-sm text-red-600 mt-1" style={errorStyle}>
          {error.message}
        </Text>
      )}
    </View>
  );
}

export default Input;