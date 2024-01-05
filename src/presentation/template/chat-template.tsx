import { useState } from 'react';

import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from '../components';

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    // TODO: Use case
    setIsLoading(false);

    // TODO: Añadir el mensaje de isGPT en true
  };

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text='Hola, escribe tu texto en español y te ayudo con las correcciones' />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text='Esto es de Open AI' />
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
