import { HOME_COPY } from '@/app/ui/features/home/constants';
import { Button ,useAlert ,useModal } from '@/app/ds';
import { MdCatchingPokemon } from 'react-icons/md';
import { InitializeParams ,TPokemon ,TTrainer } from '@/app/ui';
import {
  ApiErrorResponse ,
  FetchPokemonsParams,
} from '@/app/ui/features/home/types';
import ModalInitialize from './modal-initialize';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type InitializeAdventureProps = {
  captureRate?: number;
  fetchPokemons: (params?: FetchPokemonsParams) => Promise<Array<TPokemon>>;
  initializeAdventure: (payload: InitializeParams) => Promise<TTrainer | ApiErrorResponse>;
};

const InitializeAdventure = ({
  captureRate,
  fetchPokemons,
  initializeAdventure,
}: InitializeAdventureProps) => {
  const router = useRouter();
  const { openModal, updateModal, isOpen, modal, closeModal } = useModal();
  const { showAlert } = useAlert();
  const [selectedPokemon, setSelectedPokemon] = useState<TPokemon | undefined>(undefined);
  const selectedPokemonRef = useRef<TPokemon | undefined>(undefined);

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!selectedPokemonRef.current) return;

    await initializeAdventure({
      pokemon_name: selectedPokemonRef.current.name,
    })
      .then(() => {
        closeModal();
        router.refresh();
      })
      .catch((error) => {
        showAlert({
          message: error,
          type: 'error',
        });
      });
  }, [closeModal, initializeAdventure, router, showAlert]);

  useEffect(() => {
    if (!isOpen) return;

    updateModal({
      submitButton: {
        label: 'Initialize',
        disabled: !selectedPokemon,
        onClick: handleSubmit,
      },
    });
  }, [isOpen, selectedPokemon, updateModal, handleSubmit]);

  const handleInitializeAdventure = async (): Promise<void> => {
    const list = await fetchPokemons({ captureRate });
    if (list.length === 0) return;

    setSelectedPokemon(undefined);
    selectedPokemonRef.current = undefined;

    openModal({
      title: 'Choice your initial pokémon',
      width: '5xl',
      body: (
        <ModalInitialize
          pokemons={list}
          selected={(pokemon) => {
            selectedPokemonRef.current = pokemon;
            setSelectedPokemon(pokemon);
          }}
        />
      ),

      closeOnEsc: true,
      closeOnOutsideClick: true,
      submitButton: {
        label: 'Initialize',
        disabled: true,
        onClick: handleSubmit,
      },
      closeButton: {
        label: 'Cancel',
        onClick: () => {
          closeModal();
        },
      }
    });
  };

  return (
    <article className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        {HOME_COPY.incompleteAdventure.title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
        {HOME_COPY.incompleteAdventure.description}
      </p>
      <div className="mt-5">
        <Button
          tone="danger"
          iconLeft={<MdCatchingPokemon size={20} aria-hidden="true" />}
          onClick={handleInitializeAdventure}
        >
          {HOME_COPY.incompleteAdventure.cta}
        </Button>
      </div>
      {modal}
    </article>
  );
};

export default InitializeAdventure;