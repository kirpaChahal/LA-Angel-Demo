// App.jsx
export default function App() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        backgroundImage: `url(${import.meta.env.BASE_URL}labackground.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-label="Background"
    />
  );
}
