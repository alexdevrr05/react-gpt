export async function* translateStreamUseCase(
  prompt: string,
  lang: string,
  abortSignal: AbortSignal
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/translate-stream`,
      {
        body: JSON.stringify({ prompt, lang }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortSignal,
      }
    );

    if (!response.ok) throw new Error('No se pudo realizar la traducción');

    const reader = response.body?.getReader();
    if (!reader) {
      console.log('No se pudo generar el reader');
      return null;
    }

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      // yield se utiliza para devolver un valor de la función sin finalizarla por completo
      yield text;
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error: no se pudo relizar la traducción',
    };
  }
}
