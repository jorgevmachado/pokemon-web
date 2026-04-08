export const normalizedName = (name?: string, fallback: string = 'Unknown Pokémon') => {
  
  if (!name) return fallback;

  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};