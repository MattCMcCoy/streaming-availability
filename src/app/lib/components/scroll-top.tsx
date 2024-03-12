import React from 'react';

import { ArrowUp } from 'lucide-react';

import { Button } from './button';

export function ScrollToTopButton() {
  const [showScroll, setShowScroll] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {showScroll && (
        <Button
          className="fixed bottom-20 left-5 space-x-2 rounded-xl border border-white"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp size={16} className="font-bold" />
        </Button>
      )}
    </>
  );
}
