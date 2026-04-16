import React ,{ useMemo ,useState  } from 'react';
import { Autocomplete ,AutocompleteOption } from '@/app/ds';
import { PokemonCard ,TPokemon } from '@/app/ui';
import { joinClass } from '@/app/utils';

type ModalInitializeProps = {
  pokemons: Array<TPokemon>;
  selected: (selected?: TPokemon) => void;
}
const ModalInitialize = ({
  pokemons ,
  selected ,
}: ModalInitializeProps) => {
  const [selectedPokemon ,setSelectedPokemon] = useState<TPokemon | undefined>(
    undefined);

  const options: Array<AutocompleteOption> = useMemo(() => {
    return pokemons?.map((pokemon) => ({
      key: pokemon.id ,
      value: pokemon.name ?? pokemon.id ,
      label: pokemon.name ?? pokemon.id ,
    }));
  } ,[pokemons]);

  return (
    <div className="min-h-125">
      <label className={ joinClass([
        'flex' ,
        'flex-col' ,
        'gap-1.5' ,
        'relative' ,
      ]) }>
        <span
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Pokémon
        </span>
        <Autocomplete
          name="pokemon"
          value={ selectedPokemon?.name ?? '' }
          options={ options }
          noResultsText="No options found."
          placeholder="Choose your pokémon"
          onValueChange={ (value) => {
            if (value === '') {
              setSelectedPokemon(undefined);
              selected(undefined);
            }
          } }
          onSelectOption={ (option) => {
            const pokemon = pokemons.find(
              (pokemon) => pokemon.name === option.value);
            setSelectedPokemon(pokemon);
            selected(pokemon);
          } }
        />
      </label>
      { selectedPokemon && (
        <div className="mt-5 ml-48 mr-48">
          <PokemonCard
            key={ selectedPokemon.id }
            pokemon={selectedPokemon}
            showStats={true}
          />
        </div>
      ) }
    </div>
  );
};
export default ModalInitialize;