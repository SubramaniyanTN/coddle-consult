import useThemeColors, { ColorName } from "@/src/utils/useThemedColors";
import { StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";
import { icons } from "./icons";

export type ThemedSVGProps = SvgProps &
  Partial<{
    themedStroke: ColorName;
    themedFill: ColorName;
  }> & {
    variants: keyof typeof icons;
  };

export const ThemedSVG = ({
  variants,
  themedFill,
  themedStroke = "svg-primary",
  ...restProps
}: ThemedSVGProps) => {
  const colors = useThemeColors();
  const Icon = icons[variants];
  if (!Icon) {
    console.error(`ThemedSVG: No icon found for variant "${variants}"`);
    return null; // avoid rendering undefined
  }
  const strokeColor = themedStroke && colors[themedStroke];
  const fillColor = themedFill && colors[themedFill];
  return (
    <Icon
      hitSlop={5}
      testID={variants}
      {...restProps}
      stroke={restProps.stroke ?? strokeColor}
      fill={restProps.fill ?? fillColor ?? "none"}
      style={[svgStyles.icons,restProps.style]}
    />
  );
};

const svgStyles=StyleSheet.create({
  icons:{
    width:16,
    height:16
  }
})
