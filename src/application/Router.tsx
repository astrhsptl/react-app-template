import { Some } from '@/pages';
import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <Routes>
      <Route key={'home page'} element={<Some />} path='/' />
    </Routes>
  );
};
