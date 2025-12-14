import { TranslationKeys } from '@/locale';
import useThemeColors from '@/src/utils/useThemedColors';
import { Checkbox as RNCheckbox } from 'expo-checkbox';
import { useController, useFormContext } from 'react-hook-form';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import ThemedText from '../ThemedText/ThemedText';
type CheckboxProps = {
    label:TranslationKeys,
    name:string,
    errorStyle?:StyleProp<TextStyle>
}
export default function Checkbox({label,name,errorStyle}:CheckboxProps) {
    const { control } = useFormContext();
const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name, control });
  const colors = useThemeColors();
    return (
        <>
       <View className='flex flex-row gap-4 items-center self-start'>
        <RNCheckbox 
       value={value}
       onValueChange={onChange}
       />
       <ThemedText variant="subtitle" textContent={label} />
       </View>
       {error?.message && (
        <Text className="text-sm text-red-600 mt-1" style={errorStyle}>
          {error.message}
        </Text>
      )}
       </>
    )
}