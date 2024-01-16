import { TranslateResponse } from '../../interfaces';

export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      body: JSON.stringify({ prompt, lang }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('No se pudo realizar la traducción');

    const data = (await response.json()) as TranslateResponse;

    return {
      ok: true,
      message: data.message,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error: no se pudo relizar la traducción',
    };
  }
};
