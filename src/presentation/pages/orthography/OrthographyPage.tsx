import { GptMessage, MyMessage } from '../../components';

export const OrthographyPage = () => {
  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          {/* Bienvenida */}
          <GptMessage text='Hola, escribe tu texto en español y te ayudo con las correcciones' />
          <MyMessage text='Hola, soy Alex' />
        </div>
      </div>
    </div>
  );
};
