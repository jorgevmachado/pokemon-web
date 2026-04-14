import React ,{ useMemo } from 'react';
import {
  TextProps ,
  TOption ,
  TRounded ,
  TShadow ,
} from '@/app/ui/components/types';
import { joinClass } from '@/app/utils';

type BlankCardProps = {
  label?: string;
  list?: Array<TOption>;
  title?: string | TextProps;
  shadow?: TShadow;
  helper?: string;
  rounded?: TRounded;
  textColor?: string;
  backgroundColor?: string;
};
const BlankCard = ({
  list ,
  label ,
  title ,
  helper ,
  shadow ,
  rounded = '2xl' ,
  textColor ,
  backgroundColor = 'bg-white/95' ,
}: BlankCardProps) => {
  const className = useMemo(() => {
    const classNames: Array<string> = [
      `rounded-${ rounded }` ,
      'border' ,
      'border-slate-200/60' ,
      'p-4' ,
      backgroundColor,
    ];
    if (textColor) {
      classNames.push(textColor);
    }
    if (shadow) {
      classNames.push(`shadow-${ shadow }`);
    }
    return joinClass(classNames);
  } ,[backgroundColor ,rounded ,shadow ,textColor]);

  const titleElement = useMemo(() => {
    if (!title) {
      return;
    }
    const titleProps: TextProps = {
      text: '' ,
      size: '2xl' ,
      font: 'bold' ,
      textColor: 'text-slate-900' ,
      className: joinClass([
        label && 'mt-02' ,
        'text-2xl' ,
        'font-bold' ,
        'text-slate-900',
      ]) ,
    };
    if (typeof title === 'string') {
      titleProps.text = title;
      return titleProps;
    }

    titleProps.text = title?.text || '';
    if (title?.size) {
      titleProps.size = title?.size || '2xl';
    }
    if (title?.font) {
      titleProps.font = title?.font || 'bold';
    }
    if (title?.textColor) {
      titleProps.textColor = title?.textColor || 'text-slate-900';
    }

    titleProps.className = joinClass([
      title?.className || '' ,
      label && 'mt-2' ,
      `text-${ titleProps.size }` ,
      `font-${ titleProps.font }` ,
      titleProps.textColor,
    ]);

    return titleProps;
  } ,[label ,title]);

  return (
    <article className={ className }>
      { label && (
        <p
          className="text-xs font-semibold uppercase tracking-wide text-slate-500">{ label }</p>
      ) }
      { titleElement && (
        <p className={ titleElement.className }>{ titleElement.text }</p>
      ) }
      { list && list.length > 0 && (
        <div className="mt-4 divide-y divide-slate-100">
          { list.map(({ label ,value }) => (
            <div key={ label }
              className="flex items-center justify-between gap-3 py-2">
              <span
                className="text-sm font-medium text-slate-500">{ label }</span>
              <span
                className="text-sm font-semibold text-slate-800">{ value }</span>
            </div>
          )) }
        </div>
      ) }

      { helper && (
        <p className="mt-1 text-xs text-slate-500">{ helper }</p>
      ) }

    </article>
  );
};
export default BlankCard;