import { TranslationKeys, useCustomTranslation } from "@/locale";
import useThemeColors from "@/src/utils/useThemedColors";
import { useController, useFormContext } from "react-hook-form";
import { StyleProp, Text, TextStyle, View } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

type RadioProps = {
    label?: TranslationKeys
    labelStyle?: StyleProp<TextStyle>
    radioButtons: RadioButtonProps[];
    name:string;
    errorStyle?: StyleProp<TextStyle>;
}

export default function Radio({label, radioButtons,labelStyle,name,errorStyle}: RadioProps) {
    const { control } = useFormContext();
    const {
        field: { value, onChange, onBlur },
        fieldState: { error },
      } = useController({ name, control });
    const translation=useCustomTranslation();
    const colors =useThemeColors();
    const translatedLabel=label ? translation(label) : undefined;
  return (
    <View className="flex flex-col gap-2">
    {translatedLabel && (
        <Text className="text-lg font-semibold scheme:text-text mb-2" style={labelStyle}>
          {translatedLabel}
        </Text>
      )}
    <RadioGroup 
    radioButtons={radioButtons}
    layout="row"
    onPress={onChange}
    selectedId={value}
    labelStyle={{color:colors["text"]}}
    />
    {error?.message && (
        <Text className="text-sm text-red-600 mt-1" style={errorStyle}>
          {error.message}
        </Text>
      )}
    </View>
  )
}