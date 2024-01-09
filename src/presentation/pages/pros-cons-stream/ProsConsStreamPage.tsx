import { useRef, useState } from 'react';
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components';
import {
  // prosConsUseStreamCase,
  prosConsUseStreamGeneratorCase,
} from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

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
    const stream = prosConsUseStreamGeneratorCase(
      text,
      abortController.current.signal
    );
    setIsLoading(false);

    setMessages((messages) => [...messages, { text: '', isGpt: true }]);

    for await (const text of stream) {
      setMessages((messages) => {
        const newMessages = [...messages];
        //  actualiza el ultimo mensaje
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
          <GptMessage text='¿Qué deseas comparar?' />

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
        onSendMessage={handlePost}
        placeholder='Escribe aquí'
        disableCorrections
      />
    </div>
  );
};
