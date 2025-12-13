import { TranslationKeys, useCustomTranslation } from '@/locale';
import useThemeColors, { ColorName } from '@/src/utils/useThemedColors';
import { Checkbox as RNCheckbox } from 'expo-checkbox';
import { useController, useFormContext } from 'react-hook-form';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import ThemedText from '../ThemedText/ThemedText';
export default function Checkbox({label,name,color,errorStyle}:{label:TranslationKeys,name:string,color:ColorName,errorStyle?:StyleProp<TextStyle>}) {
    const { control } = useFormContext();
const translation = useCustomTranslation();
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
       color={colors[color]}
       />
       <ThemedText variant="subtitle" className="text-text" textContent={label} />
       </View>
       {error?.message && (
        <Text className="text-sm text-red-600 mt-1" style={errorStyle}>
          {error.message}
        </Text>
      )}
       </>
    )
}