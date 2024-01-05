interface Props {
  text: string;
}

export const MyMessage = ({ text }: Props) => {
  return (
    <div className='col-start-6 col-end-13 p-3 rounded-lg'>
      <div className='flex items-start justify-start flex-row-reverse'>
        <div className='flex items-center justify-center h-10 w-10 rounded-full bg-indigo-700 flex-shrink-0'>
          A
        </div>
        <div className='relative mr-3 text-sm bg-indigo-700 pt-2 pb-2 px-4 shadow rounded-xl'>
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
};
