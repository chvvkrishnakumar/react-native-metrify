/**
 * SVG Text primitive with centered text helper
 */
import React, { memo } from 'react';
import { Text as SVGText } from 'react-native-svg';

export interface TextProps {
  x: number;
  y: number;
  text: string;
  fontSize?: number;
  fontWeight?: string | number;
  fill?: string;
  textAnchor?: 'start' | 'middle' | 'end';
  alignmentBaseline?: 'baseline' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'text-top' | 'bottom' | 'center' | 'top' | 'text-before-edge' | 'text-after-edge' | 'before-edge' | 'after-edge' | 'hanging';
  opacity?: number;
  testID?: string;
}

/**
 * SVG Text component with sensible defaults
 */
export const Text = memo<TextProps>(({
  x,
  y,
  text,
  fontSize = 14,
  fontWeight = 'normal',
  fill = '#000000',
  textAnchor = 'middle',
  alignmentBaseline = 'middle',
  opacity = 1,
  testID,
}) => {
  return (
    <SVGText
      x={x}
      y={y}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fill={fill}
      textAnchor={textAnchor}
      alignmentBaseline={alignmentBaseline}
      opacity={opacity}
      testID={testID}
    >
      {text}
    </SVGText>
  );
});

Text.displayName = 'Text';

/**
 * Helper to create centered text props
 */
export function createCenteredTextProps(
  x: number,
  y: number,
  text: string,
  fontSize?: number,
  fill?: string
): TextProps {
  return {
    x,
    y,
    text,
    fontSize,
    fill,
    textAnchor: 'middle',
    alignmentBaseline: 'middle',
  };
}
