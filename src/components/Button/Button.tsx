import { TranslationKeys, useCustomTranslation } from "@/locale";
import { tw, TwStyle } from "@mgcrea/react-native-tailwind";
import * as Haptics from "expo-haptics";
import React, { ComponentProps, useEffect, useState } from "react";
import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

import Animated, {
  FadeInDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";

type ButtonVariant = "primary" | "secondary";


type ButtonProps =Partial<Omit<ComponentProps<typeof AnimatedPressable>,"style"|"key">> & {
  label: TranslationKeys;
  variant?: ButtonVariant;
  isError?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: any;
  className?: string;
  textClassName?: string;
};

export default function Button({
  label,
  variant = "primary",
  isError = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onPress,
  style,
  className,
  textClassName,
  ...otherProps
}: ButtonProps) {

const buttonVariants: Record<
ButtonVariant,
{ container: TwStyle<ViewStyle>; text: TwStyle<TextStyle> }
> = {
primary: {
  container: disabled ?
  tw`
    scheme:bg-button 
    w-[90%] 
    h-[50px] 
    rounded-[10px] 
    flex-row 
    items-center 
    justify-center
    opacity-50
    `:tw`
    scheme:bg-button 
    w-[90%] 
    h-[50px] 
    rounded-[10px] 
    flex-row 
    items-center 
    justify-center
    `,
  text: tw`
    text-[17px] 
    font-semibold 
    scheme:text-buttonText
  `,
},

secondary: {
  container: tw`
    scheme:bg-surface 
    w-[80%] 
    h-[50px] 
    rounded-[10px] 
    border 
    scheme:border-cardBorder 
    flex-row 
    items-center 
    justify-center
  `,
  text: tw`
    text-[17px] 
    font-semibold 
    scheme:text-text
  `,
},
};
  const t = useCustomTranslation();
  const labelText = t(label);

  const scale = useSharedValue(1);
  const shake = useSharedValue(0);
  const [lock, setLock] = useState(false);


  const animatedScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedShakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 120 })
    );
    onPress?.();
  };

  const triggerShake = () => {
    setLock(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

    shake.value = withSequence(
      withTiming(-10, { duration: 40 }),
      withRepeat(withTiming(10, { duration: 80 }), 6, true),
      withTiming(0, { duration: 40 }, () => runOnJS(setLock)(false))
    );
  };

  useEffect(() => {
    if (isError) triggerShake();
  }, [isError]);

  const variantStyle = buttonVariants[variant];

  return (
    <AnimatedPressable
      disabled={disabled || lock}
      onPress={handlePress}
      entering={FadeInDown.duration(1000)}
      testID={label}
      className={className}
      {...otherProps}
      style={[
        animatedScaleStyle,
        animatedShakeStyle,
        variantStyle.container.style, // ← SAME AS ThemedText
        style,
      ]}
    >
      {leftIcon && <View className="mr-2">{leftIcon}</View>}

      <Text className={textClassName} style={variantStyle.text.style}>
        {labelText}
      </Text>

      {rightIcon && <View className="ml-2">{rightIcon}</View>}
    </AnimatedPressable>
  );
}
