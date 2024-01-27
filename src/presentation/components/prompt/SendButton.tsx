interface Props {
  text?: string;
}

export const SendButton = ({ text = 'Enviar' }: Props) => {
  return (
    <button className='btn-primary'>
      <span className='mr-2'>{text}</span>
      <i className='fa-regular fa-paper-plane'></i>
    </button>
  );
};
