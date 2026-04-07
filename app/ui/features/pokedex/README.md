# Pokedex Feature

This feature renders the protected Pokédex listing using backend data from `GET /pokedex`.

## Main files

- `app/(protected)/pokedex/page.tsx`: thin page entry point
- `app/ui/features/pokedex/PokedexList.tsx`: view composition (header, cards, states, pagination)
- `app/ui/features/pokedex/usePokedexList.ts`: client data orchestration
- `app/api/pokedex/route.ts`: authenticated proxy + response normalization
- `app/ui/components/pagination/Pagination.tsx`: reusable pagination component

## Data flow

1. `PokedexList` calls `usePokedexList`
2. Hook requests `GET /api/pokedex?page={n}`
3. API route reads auth token from cookie and calls `PokedexService.list`
4. Route normalizes backend shape and returns `items + pagination`
5. UI renders `InfoCard` grid + shared `Pagination`

## Reusability

`Pagination` is generic and supports:
- controlled mode via `onPageChange`
- link mode via `getPageHref`
- loading lock via `isLoading`

## UX states

- loading: skeleton grid + global content loading
- empty: themed info card
- error: themed info card + retry button

