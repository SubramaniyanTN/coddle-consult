import { TranslationKeys } from '@/locale';
import { Checkbox as RNCheckbox } from 'expo-checkbox';
import { ComponentProps } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ThemedText from '../ThemedText/ThemedText';
const AnimatedCheckbox = Animated.createAnimatedComponent(RNCheckbox);
type CheckboxProps = Omit<ComponentProps<typeof AnimatedCheckbox>,"style"|"key"> & {
    label:TranslationKeys,
    name:string,
    errorStyle?:StyleProp<TextStyle>
}
export default function Checkbox({label,name,errorStyle, ...otherProps}:CheckboxProps) {
    const { control } = useFormContext();
const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });
    return (
        <>
       <View className='flex flex-row gap-4 items-center self-start'>
        <AnimatedCheckbox 
        entering={FadeInDown.duration(1000)}
       value={value}
       onValueChange={onChange}
       {...otherProps}
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