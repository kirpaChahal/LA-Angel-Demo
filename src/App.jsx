import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}labackground.png`;
    const body = document.body;
    body.style.margin = '0';
    body.style.backgroundImage = `url(${url})`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.minHeight = '100dvh';
    // optional: clear any body bg-color that might be set somewhere
    body.style.backgroundColor = 'transparent';

    return () => {
      body.style.backgroundImage = '';
      body.style.backgroundSize = '';
      body.style.backgroundPosition = '';
      body.style.backgroundRepeat = '';
      body.style.minHeight = '';
      body.style.backgroundColor = '';
    };
  }, []);

  // Render nothing; the background is on <body>
  return null;
}
