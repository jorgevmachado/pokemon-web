import PageContentArtwork from './page-content-artwork';
import StatsCard from '@/app/ui/components/stats-card/StatsCard';
import React from 'react';
import BattleSummary from '../../../primitives/battle-summary';
import CardDescription from '@/app/ui/components/card-description';
import InfoPanel from '@/app/ui/components/info-panel';
import CardBadge from '@/app/ui/components/card-badge';
import { normalizedName } from '@/app/utils';
import { DetailPokemonItem } from '@/app/ui/components/detail-pokemon/types';

type PageContentProps = {
  item: DetailPokemonItem;
  displayName: string;
};
const PageContent = ({ displayName, item }: PageContentProps) => {

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
      {/* Left column */ }
      <div className="space-y-4">

        <PageContentArtwork
          image={item.image}
          displayName={displayName}
          externalImage={item.external_image}
        />

        <StatsCard
          hp={ item.hp }
          title="STATS"
          maxHp={ item.maxHp }
          speed={ item.speed }
          attack={ item.attack }
          defense={ item.defense }
          specialAttack={ item.special_attack }
          specialDefense={ item.special_defense }
        />

        <BattleSummary
          title="BATTLE SUMMARY"
          wins={ item.wins }
          battles={ item.battles }
          losses={ item.losses }
        />

      </div>
      {/* Right column */ }
      <div className="space-y-4">
        <CardDescription
          hp={ item.hp }
          name={ item.name }
          maxHp={ item.maxHp }
          level={ item.level }
          nickname={ item.nickname }
        />

        <InfoPanel
          height={ item.height }
          weight={ item.weight }
          isBaby={ item.is_baby }
          habitat={ item.habitat }
          experience={ item.experience }
          isMythical={ item.is_mythical }
          isLegendary={ item.is_legendary }
          captureRate={ item.capture_rate }
        />

        {/* Types */ }
        { item.types && item.types.length > 0 && (
          <CardBadge
            title="TYPES"
            badges={ item.types.map((type) => ({
              id: type.id ,
              name: normalizedName(type.name) ,
              style: {
                color: type.text_color ,
                backgroundColor: type.background_color ,
              }
            })) }
          />
        ) }
        {/* Abilities */ }
        { item.abilities && item.abilities.length > 0 && (
          <CardBadge
            title="ABILITIES"
            badges={ item.abilities.map((ability) => ({
              id: ability.id ,
              name: normalizedName(ability.name) ,
            })) }
            randomColors={true}
          />
        ) }

      </div>
    </div>
  );
};
export default PageContent;