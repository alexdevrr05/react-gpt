import { useRef, useState } from 'react';
import { GptMessage, MyMessage, TypingLoader } from '../../components';

import { translateStreamUseCase } from '../../../core/use-cases';
import { TextMessageTranslateBox } from '../../components/chat-inputs-boxes/TextMessageTranslateBox';

interface Message {
  text: string;
  isGpt: boolean;
}

export const TranslateStreamPage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState('inglés');

  const handlePost = async (text: string) => {
    if (isRunning.current) {
      // Cancela si se estaba generando el texto
      abortController.current.abort();
      // Evita que se cancele la generacion del texto nuevo
      abortController.current = new AbortController();
    }

    setIsLoading(true);
    isRunning.current = true;
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    // con funcion generadora
    const stream = translateStreamUseCase(
      text,
      language,
      abortController.current.signal
    );
    setIsLoading(false);

    setMessages((messages) => [...messages, { text: '', isGpt: true }]);

    for await (const text of stream) {
      setMessages((messages) => {
        const newMessages = [...messages];
        // actualiza el ultimo mensaje
        newMessages[newMessages.length - 1].text = text;
        return newMessages;
      });
    }

    isRunning.current = false;
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

      <TextMessageTranslateBox
        onSendMessage={handlePost}
        placeholder='Escribe aquí'
        disableCorrections
        onLanguageChanged={setLanguage}
        language={language}
      />
    </div>
  );
};
