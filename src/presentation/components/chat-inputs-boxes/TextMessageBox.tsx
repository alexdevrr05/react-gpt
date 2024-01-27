import { FormEvent, useState } from 'react';
import { SendButton } from '..';

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
}

export const TextMessageBox = ({
  onSendMessage,
  placeholder = '',
  disableCorrections = false,
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
      className='flex flex-row items-center h-16 rounded-xl bg-secondary w-full px-4'
      onSubmit={handleSendMessage}
    >
      <div className='flex-grow'>
        <div className='relative w-full'>
          <input
            type='text'
            autoFocus
            name='message'
            className='bg-bone flex w-full border rounded-xl text-blackPrimary focus:outline-none focus:border-primary pl-4 h-10'
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'on' : 'off'}
            autoCorrect={disableCorrections ? 'on' : 'off'}
            spellCheck={disableCorrections ? 'true' : 'false'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className='ml-4'>
        <SendButton />
      </div>
    </form>
  );
};
