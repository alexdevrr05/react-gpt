import Markdown from 'react-markdown';

interface Props {
  text: string;
  audio: string;
}

export const GptMessageAudio = ({ text, audio }: Props) => {
  return (
    <div className='col-start-1 col-end-8 p-3 rounded-lg'>
      <div className='flex flex-row items-start'>
        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-primary text-bone flex-shrink-0'>
          G
        </div>
        <div className='relative ml-3 text-sm bg-blackPrimary pt-3 pb-2 px-4 shadow-md rounded-xl border border-blackPrimary'>
          <Markdown>{text}</Markdown>
          <audio controls src={audio} className='w-full' autoPlay />
        </div>
      </div>
    </div>
  );
};
