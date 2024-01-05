import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '../../components';

export const OrthographyPage = () => {
  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          {/* Chat izquierda */}
          <GptMessage text='Hola, escribe tu texto en español y te ayudo con las correcciones' />
          {/* Chat derecha */}
          <MyMessage text='Hola, soy Alex' />
          {/* Puntos suspensivos */}
          <TypingLoader className='fade-in' />
        </div>
      </div>

      <TextMessageBox
        onSendMessage={(message) => console.log('mi mensaje: ', message)}
        placeholder='Escribe aquí'
        disableCorrections
      />
    </div>
  );
};
