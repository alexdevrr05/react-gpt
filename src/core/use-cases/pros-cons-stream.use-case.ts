export const prosConsUseStreamCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        body: JSON.stringify({ prompt }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // TODO: abort signal
      }
    );

    if (!response.ok) throw new Error('No se pudo realizar la comparación');

    const reader = response.body?.getReader();
    if (!reader) {
      console.log('No se pudo generar el reader');
      return null;
    }

    return reader;
  } catch (error) {
    return null;
  }
};
