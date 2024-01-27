import { ChangeEvent } from 'react';

const languages = [
  { id: 'alemán', text: 'Alemán' },
  { id: 'árabe', text: 'Árabe' },
  { id: 'bengalí', text: 'Bengalí' },
  { id: 'francés', text: 'Francés' },
  { id: 'hindi', text: 'Hindi' },
  { id: 'inglés', text: 'Inglés' },
  { id: 'japonés', text: 'Japonés' },
  { id: 'mandarín', text: 'Mandarín' },
  { id: 'portugués', text: 'Portugués' },
  { id: 'ruso', text: 'Ruso' },
];

interface Props {
  onLanguageChanged: (language: string) => void;
  language: string;
}

export const SelectLanguagesBox = ({ onLanguageChanged, language }: Props) => {
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onLanguageChanged(event.target.value);
  };

  return (
    <>
      <select
        className='bg-primary text-bone font-bold py-2 px-4 rounded-xl hover:opacity-80 transition-all duration-200 ease-in-out'
        disabled={false}
        name={language}
        onChange={onChange}
        value={language}
      >
        {languages.map(({ id, text }) => (
          <option key={id} value={id}>
            {text}
          </option>
        ))}
      </select>
    </>
  );
};
