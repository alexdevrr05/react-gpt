import { FormEvent, useState } from 'react';
import { SelectLanguagesBox } from './SelectLanguagesBox';
import { SendButton } from '..';

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  onLanguageChanged: (language: string) => void;
  language: string;
}

export const TextMessageTranslateBox = ({
  onSendMessage,
  placeholder = '',
  disableCorrections = false,
  onLanguageChanged,
  language,
}: Props) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim().length === 0) return;

    onSendMessage(message);
    setMessage('');
  };

  return (
    <form
      className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'
      onSubmit={handleSendMessage}
    >
      <div className='flex-grow'>
        <div className='relative w-full'>
          <input
            type='text'
            autoFocus
            name='message'
            className='bg-white flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'on' : 'off'}
            autoCorrect={disableCorrections ? 'on' : 'off'}
            spellCheck={disableCorrections ? 'true' : 'false'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className='flex ml-4 gap-2'>
        {/* Selector de idiomas */}
        <SelectLanguagesBox
          onLanguageChanged={onLanguageChanged}
          language={language}
        />

        <SendButton />
      </div>
    </form>
  );
};
