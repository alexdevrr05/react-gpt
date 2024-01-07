import { ProsConsResponse } from '../../interfaces';

export const prosConsUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,
      {
        body: JSON.stringify({ prompt }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) throw new Error('No se pudo realizar la comparación');

    const data = (await response.json()) as ProsConsResponse;
    return {
      ok: true,
      message: data.content,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error: no se pudo relizar la comparación',
    };
  }
};
