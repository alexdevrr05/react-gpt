import { Outlet } from 'react-router-dom';

import { menuRoutes } from '../router/router';
import { SidebarMenuItem } from '../components';

export const DashboardLayout = () => {
  return (
    <main className='flex flex-row mt-7'>
      <nav className='hidden sm:flex flex-col ml-5 w-[370px] min-h-[calc(100vh-3.0rem)] bg-blackPrimary p-5 rounded-3xl'>
        <h1 className='font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-bone'>
          AIInsightHub<span className='text-primary'>.</span>
        </h1>
        <span className='text-xl text-secondary'>Bienvenido</span>

        {/* Divider */}
        <div className='border-primary border my-3' />

        {/* Opciones del menú */}
        {menuRoutes.map((option) => (
          <SidebarMenuItem key={option.to} {...option} />
        ))}
      </nav>

      {/* bg-opacity-10 */}
      <section className='mx-3 sm:mx-10 flex flex-col w-full h-[calc(100vh-50px)] bg-blackPrimary p-5 rounded-3xl'>
        <div className='flex flex-row h-full'>
          <div className='flex flex-col flex-auto h-full p-1'>
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};
