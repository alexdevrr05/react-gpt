import { useState } from 'react';
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components';

import { translateUseCase } from '../../../core/use-cases/translate.use-case';

interface Message {
  text: string;
  isGpt: boolean;
}

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState('english');

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, message } = await translateUseCase(text, language);

    if (!ok) return;

    setMessages((prev) => [
      ...prev,
      {
        text: message,
        isGpt: true,
      },
    ]);

    setIsLoading(false);
  };

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Hola, escribe que quieras traducir' />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {/* Puntos suspensivos */}
          {isLoading && (
            <div className='col-start-1 col-end-12 fade-in'>
              <TypingLoader className='fade-in' />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        // onSendMessage={(message) => console.log('mi mensaje: ', message)}
        onSendMessage={handlePost}
        placeholder='Escribe aquí'
        disableCorrections
      />
    </div>
  );
};
