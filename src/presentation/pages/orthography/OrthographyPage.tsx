import { useState } from 'react';

import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  // TextMessageBoxFile,
  // TextMessageBoxSelect,
  TypingLoader,
} from '../../components';

import { orthographyUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    // copia el previo y coloca el/los nuevo/s
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    // TODO: Use case
    const { ok, userScore, errors, message } = await orthographyUseCase(text);

    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: 'No se pudo realizar la coreccion', isGpt: true },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isGpt: true,
          info: {
            userScore,
            errors,
            message,
          },
        },
      ]);
    }

    // TODO: Añadir el mensaje de isGPT en true

    setIsLoading(false);
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
      {/* <TextMessageBoxFile
        // onSendMessage={(message) => console.log('mi mensaje: ', message)}
        onSendMessage={handlePost}
        placeholder='Escribe aquí'
      /> */}
      {/* <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder='Escribe aquí'
        options={[
          { id: '1', text: 'example 1' },
          { id: '2', text: 'example 2' },
        ]}
      /> */}
    </div>
  );
};
