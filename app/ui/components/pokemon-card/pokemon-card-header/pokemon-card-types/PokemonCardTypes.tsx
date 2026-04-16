import { Badge } from '@/app/ds';
import { TPokemon } from '@/app/ui';
import React from 'react';

type PokemonCardTypesProps = Pick<TPokemon ,'types'>;
const PokemonCardTypes = ({
  types ,
}: PokemonCardTypesProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      { types?.map((type) => (
        <Badge
          key={ type.id }
          size="lg"
          shape="rounded"
          style={ {
            color: type?.text_color ,
            backgroundColor: type?.background_color ,
          } }
          className="min-w-20">
          { type.name }
        </Badge>
      ))}
    </div>
  );
};
export default PokemonCardTypes;