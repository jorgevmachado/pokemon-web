import React ,{ useMemo } from 'react';

import { WEIGHT_CLASS_MAP } from '@/app/utils/constants';
import { joinClass } from '@/app/utils';

import { type TextProps ,type TextTag ,type TextTone  } from './types';
import {
  ALIGN_CLASS_MAP ,
  BREAK_CLASS_MAP ,
  DECORATION_CLASS_MAP ,
  DISPLAY_CLASS_MAP ,
  FONT_FAMILY_CLASS_MAP ,
  LEADING_CLASS_MAP ,
  LINE_CLAMP_CLASS_MAP ,
  SIZE_CLASS_MAP ,
  TAG_CLASS_MAP_PROPS ,
  TONE_CLASS_MAP ,
  TRACKING_CLASS_MAP ,
  TRANSFORM_CLASS_MAP ,
  WHITESPACE_CLASS_MAP ,
  WRAP_CLASS_MAP ,
} from '@/app/ds/text/config';

/**
 * Polymorphic typography primitive with semantic defaults and Tailwind-friendly overrides.
 * For any advanced Tailwind rule not covered by props, pass it through `className`.
 */
const TextBase = <T extends TextTag = 'p'>({
  as ,
  children ,
  size ,
  weight ,
  tone ,
  align ,
  transform ,
  tracking ,
  leading ,
  decoration ,
  fontFamily ,
  display ,
  wrap ,
  color ,
  whitespace ,
  breakStrategy ,
  lineClamp ,
  italic = false ,
  truncate = false ,
  srOnly = false ,
  className ,
  ...elementProps
}: TextProps<T>) => {
  const Component = (as ?? 'p') as React.ElementType;

  const buildColor = (
    color?: string ,
    tagColor?: string ,
    tone?: TextTone ,
    tagTone?: TextTone ,
  ): string | undefined => {
    if (color) {
      return color;
    }

    if (tone) {
      return TONE_CLASS_MAP[tone];
    }

    if (tagColor) {
      return tagColor;
    }

    if (tagTone) {
      return TONE_CLASS_MAP[tagTone];
    }
    return;
  };

  const classNameList = useMemo(() => {
    const classNames: Array<string> = [];
    const tagClassProps = TAG_CLASS_MAP_PROPS[Component as TextTag];
    const tagColor = buildColor(
      color ,
      tagClassProps?.color ,
      tone ,
      tagClassProps?.tone ,
    );
    if (tagColor) {
      classNames.push(tagColor);
    }
    const tagSize = size ?? tagClassProps?.size;
    if (tagSize) {
      classNames.push(SIZE_CLASS_MAP[tagSize]);
    }
    const tagWeight = weight ?? tagClassProps?.weight;

    if (tagWeight) {
      classNames.push(WEIGHT_CLASS_MAP[tagWeight]);
    }
    const tagTracking = tracking ?? tagClassProps?.tracking;
    if (tagTracking) {
      classNames.push(TRACKING_CLASS_MAP[tagTracking]);
    }
    const tagFontFamily = fontFamily ?? tagClassProps?.fontFamily;
    if (tagFontFamily) {
      classNames.push(FONT_FAMILY_CLASS_MAP[tagFontFamily]);
    }

    const tagLeading = leading ?? tagClassProps?.leading;
    if (tagLeading) {
      classNames.push(LEADING_CLASS_MAP[tagLeading]);
    }

    if (tagClassProps?.className) {
      classNames.push(tagClassProps.className);
    }

    if (align) {
      classNames.push(ALIGN_CLASS_MAP[align]);
    }

    if (transform) {
      classNames.push(TRANSFORM_CLASS_MAP[transform]);
    }

    if (decoration) {
      classNames.push(DECORATION_CLASS_MAP[decoration]);
    }

    if (display) {
      classNames.push(DISPLAY_CLASS_MAP[display]);
    }

    if (wrap) {
      classNames.push(WRAP_CLASS_MAP[wrap]);
    }

    if (whitespace) {
      classNames.push(WHITESPACE_CLASS_MAP[whitespace]);
    }

    if (breakStrategy) {
      classNames.push(BREAK_CLASS_MAP[breakStrategy]);
    }

    if (typeof lineClamp !== 'undefined') {
      classNames.push(LINE_CLAMP_CLASS_MAP[lineClamp]);
    }

    if (italic) {
      classNames.push('italic');
    }

    if (truncate) {
      classNames.push('truncate');
    }

    if (srOnly) {
      classNames.push('sr-only');
    }

    if (className) {
      classNames.push(className);
    }

    return joinClass(classNames);
  } ,[
    Component ,
    align ,
    breakStrategy ,
    className ,
    color ,
    decoration ,
    display ,
    fontFamily ,
    italic ,
    leading ,
    lineClamp ,
    size ,
    srOnly ,
    tone ,
    tracking ,
    transform ,
    truncate ,
    weight ,
    whitespace ,
    wrap]);

  return React.createElement(
    Component ,
    {
      ...elementProps ,
      className: classNameList ,
    } ,
    children ,
  );
};

const Text = React.memo(TextBase) as typeof TextBase;

export default Text;

