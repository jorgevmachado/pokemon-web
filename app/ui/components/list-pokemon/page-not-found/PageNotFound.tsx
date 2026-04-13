import React ,{ useMemo } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';
import { InfoCard } from '@/app/ui';

type PageNotFoundProps = {
  show?: boolean;
  title?: string;
  variant?: 'blue' | 'red' | 'yellow' | 'green';
  pageName?: string;
  description?: string;
};

const PageNotFound = ({
  show = false,
  title = 'Page Not Found',
  pageName,
  variant = 'yellow',
  description = 'The page you are looking for does not exist.' 
}: PageNotFoundProps) => {
  
  const pageTitle = useMemo(() => {
    if (pageName) {
      return `No ${pageName} Found`;
    }
    return title;
  }, [pageName, title]);

  const pageDescription = useMemo(() => {
    if (pageName) {
      return `The ${ pageName } is currently empty. Try again later.` ;
    }
    return description;
  }, [description, pageName]);


  if (!show) {
    return null;
  }

  return (
    <InfoCard
      icon={ <MdCatchingPokemon size={ 22 }/> }
      variant={ variant }
      title= { pageTitle }
      description={ pageDescription }
    />
  );
};

export default React.memo(PageNotFound);