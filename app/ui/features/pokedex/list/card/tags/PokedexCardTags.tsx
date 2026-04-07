import { TPokemon } from '@/app/ui/features/pokemon';
import React ,{ useMemo } from 'react';
import PokedexCardTag ,{
  PokedexCardTagProps ,
} from '@/app/ui/features/pokedex/list/card/tags/tag';

type PokedexCardTagsProps = {
  types: TPokemon['types'];
  discovered: boolean;
};

const PokedexCardTags = ({ types ,discovered }: PokedexCardTagsProps) => {

  const tags: Array<PokedexCardTagProps> = useMemo(() => {
    if (!discovered) {
      return [
        {
          key: 'not_discovered' ,
          tone: 'neutral' ,
          name: 'NOT DISCOVERED',
        }];
    }
    if (types && types.length > 0) {
      return types.map((type) => ({
        key: type.id ,
        name: type.name ,
        style: {
          color: type.text_color ,
          backgroundColor: type.background_color ,
        },
      }));
    }
    return [];
  } ,[discovered ,types]);

  return (
    <div className="flex flex-wrap gap-2">
      { tags.map((tag) => <PokedexCardTag  { ...tag } key={ tag.key }/>) }
    </div>
  );
};

export default React.memo(PokedexCardTags);