import { FormEvent, useState } from 'react';
import { SendButton } from '..';

interface Props {
  onSendMessage: (message: string, selectedOption: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
}

export const TextMessageBoxSelect = ({
  onSendMessage,
  placeholder = '',
  disableCorrections = false,
  options,
}: Props) => {
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim().length === 0) return;

    onSendMessage(message, selectedOption);
    setMessage('');
  };

  return (
    <form
      className='flex flex-row items-center h-16 rounded-xl bg-white w-full px-4'
      onSubmit={handleSendMessage}
    >
      <div className='flex-grow'>
        <div className='flex w-full'>
          <input
            type='text'
            autoFocus
            name='message'
            className='bg-white w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'on' : 'off'}
            autoCorrect={disableCorrections ? 'on' : 'off'}
            spellCheck={disableCorrections ? 'true' : 'false'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <select
            name='select'
            id='select'
            onChange={(e) => setSelectedOption(e.target.value)}
            className='bg-white dark:bg-white dark:text-gray-800 w-2/5 ml-5 border rounded-xl text-gray focus:outline-none focus:border-indigo-300 pl-4 h-10'
          >
            <option value=''>Seleccione</option>
            {options.map(({ id, text }) => (
              <option key={id} value={id}>
                {text}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='ml-4'>
        <SendButton />
      </div>
    </form>
  );
};
