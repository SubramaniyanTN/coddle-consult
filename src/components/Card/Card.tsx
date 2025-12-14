import { Pressable, tw, TwStyle } from "@mgcrea/react-native-tailwind";
import { ComponentProps } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type CardProps = Omit<
  ComponentProps<typeof AnimatedPressable>,
  "key" | "style"
> & {
  children?: React.ReactNode;
  onPress?: () => void;
  className?: string;
  disabled?: boolean;
  style?: ViewStyle;
};

export default function Card({
  children,
  onPress,
  className,
  disabled = false,
  style,
  ...rest
}: CardProps) {
  const cardBaseStyle: TwStyle<ViewStyle> = tw`p-[10px] min-h-[70px] gap-[10px] scheme:bg-card rounded-[10px] max-w-[90%] scheme:border-cardBorder flex flex-row items-center justify-between active:opacity-50`;
  return (
    <AnimatedPressable 
    entering={FadeInDown.duration(1000)}
    style={[styles.card, cardBaseStyle.style,style]} onPress={onPress} disabled={disabled} {...rest}>
      {children}
    </AnimatedPressable>
  ); 
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
