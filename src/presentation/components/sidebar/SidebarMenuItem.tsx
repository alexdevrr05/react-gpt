import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  icon: string;
  title: string;
  description: string;
  // component: JSX.Element;
}

export const SidebarMenuItem = ({ to, icon, title, description }: Props) => {
  return (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'flex justify-center items-center bg-secondary bg-opacity-50 rounded p-2 transition-colors'
          : 'flex justify-center items-center hover:bg-blackSecondary rounder-md p-2 transition-colors'
      }
    >
      <i className={`${icon} text-2xl mr-4 text-white`}></i>
      <div className='flex flex-col flex-grow'>
        <span className='text-secondary text-lg font-semibold'>{title}</span>
        <span className='text-bone text-sm'>{description}</span>
      </div>
    </NavLink>
  );
};
