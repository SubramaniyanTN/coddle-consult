import { Pressable, tw, TwStyle } from "@mgcrea/react-native-tailwind";
import { StyleSheet, ViewProps, ViewStyle } from "react-native";

type CardProps = ViewProps & {
  children?: React.ReactNode;
  onPress?: () => void;
  className?: string;
  disabled?: boolean;
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
    <Pressable style={[styles.card, cardBaseStyle.style,style]} onPress={onPress} disabled={disabled} {...rest}>
      {children}
    </Pressable>
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
