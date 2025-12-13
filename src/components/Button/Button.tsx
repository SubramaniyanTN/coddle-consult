import { TranslationKeys, useCustomTranslation } from "@/locale";
import { tw, TwStyle } from "@mgcrea/react-native-tailwind";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import {
    GestureResponderEvent,
    Pressable,
    PressableProps,
    Text,
    TextStyle,
    View,
    ViewStyle
} from "react-native";
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const buttonVariants: Record<"primary", { button: TwStyle<ViewStyle>, text: TwStyle<TextStyle> }> = {
  primary: {
    button: tw`scheme:bg-button w-[80%] h-[50px] rounded-[10px] flex items-center justify-center`,
    text: tw`scheme:text-buttonText`,
  }
};

type ScalableButtonProps = PressableProps & {
  value?: number;
  isError?: boolean;
  variants: keyof typeof buttonVariants;
  label: TranslationKeys;
  textClassName?: string;
  leftIcon?: React.ReactNode; // <-- NEW
  rightIcon?: React.ReactNode; // <-- NEW (optional)
};

function Button({
  isError = false,
  variants,
  label,
  leftIcon,
  rightIcon,
  ...props
}: ScalableButtonProps) {
  const scale = useSharedValue(1);
  const shake = useSharedValue(0);
  const [disabled, setDisabled] = useState(false);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const t=useCustomTranslation()
  const labelText=t(label)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shakeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  const handlePress = (event: GestureResponderEvent) => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 120 })
    );
    props?.onPress?.(event);
  };

  const triggerShake = () => {
    setDisabled(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

    shake.value = withSequence(
      withTiming(-10, { duration: 40, easing: Easing.linear }),
      withRepeat(
        withTiming(10, { duration: 80, easing: Easing.linear }),
        6,
        true
      ),
      withTiming(0, { duration: 40 }, (finished) => {
        if (finished) runOnJS(setDisabled)(false);
      })
    );
  };

  useEffect(() => {
    if (isError) triggerShake();
  }, [isError]);
  console.log(buttonVariants[variants].button.style);
  return (
    <AnimatedPressable
      {...props}
      disabled={props.disabled || disabled}
      testID={`${label}-button`}
      style={[ animatedStyle, shakeAnimatedStyle,buttonVariants[variants].button.style, props.style]}
      onPress={handlePress}
    >
      {/* LEFT ICON */}
      {leftIcon && <View className="mr-[4px]">{leftIcon}</View>}

      {/* LABEL */}
      {typeof label === "string" ? (
        <Text
          testID={`${label}-text`}
          style={buttonVariants[variants].text.style}
          >{labelText}</Text>
      ) : (
        label
      )}

      {/* RIGHT ICON */}
      {rightIcon && <View className="ml-[4px]">{rightIcon}</View>}
    </AnimatedPressable>
  );
}

export default Button;
