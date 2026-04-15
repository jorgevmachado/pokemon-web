import React ,{ useMemo } from 'react';
import {
  TOption ,
  TRounded ,
  TShadow ,
} from '@/app/ui/components/types';
import { joinClass } from '@/app/utils';
import { Text, Card, TextProps } from '@/app/ds';

type BlankCardProps = {
  label?: string;
  list?: Array<TOption>;
  title?: string | TextProps;
  shadow?: TShadow;
  helper?: string;
  rounded?: TRounded;
};
const BlankCard = ({
  list ,
  label ,
  title ,
  helper ,
  shadow ,
  rounded = '2xl' ,
}: BlankCardProps) => {
  const titleElement = useMemo(() => {
    if (!title) {
      return;
    }
    const titleProps: TextProps = {
      children: '' ,
      size: '2xl' ,
      weight: 'bold' ,
      color: 'text-slate-900' ,
      className: joinClass([
        label && 'mt-02' ,
      ]) ,
    };
    if (typeof title === 'string') {
      titleProps.children = title;
      return titleProps;
    }

    titleProps.children = title?.children || '';
    if (title?.size) {
      titleProps.size = title?.size || titleProps.size;
    }
    if (title?.weight) {
      titleProps.weight = title?.weight || titleProps.weight;
    }
    if (title?.color) {
      titleProps.color = title?.color || titleProps.color;
    }

    return titleProps;
  } ,[label ,title]);

  return (
    <Card shadow={shadow} rounded={rounded}  borderColor="slate-200/60">
      { label && (
        <Text size="xs" weight="semibold" transform="uppercase" tracking="wide" tone="subtle">{ label }</Text>
      ) }
      { titleElement && (
        <>
          <Text {...titleElement}>{titleElement.children}</Text>
        </>
      ) }
      { list && list.length > 0 && (
        <div className="mt-4 divide-y divide-slate-100">
          { list.map(({ label ,value }) => (
            <div key={ label }
              className="flex items-center justify-between gap-3 py-2">
              <Text
                as="span"
                size="sm"
                weight="medium"
                tone="subtle"
              >{ label }</Text>
              <Text
                as="span"
                size="sm"
                weight="semibold"
                color="text-slate-800"
              >{ value }</Text>
            </div>
          )) }
        </div>
      ) }

      { helper && (
        <p className="mt-1 text-xs text-slate-500">{ helper }</p>
      ) }

    </Card>
  );
};
export default BlankCard;