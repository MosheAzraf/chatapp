import { Outlet } from 'react-router-dom'
import PrivateNabar from '../components/PrivateNavbar'
import PublicNavbar from '../components/PublicNavbar'
import { useSelector } from 'react-redux';


const RootLayout = () => {
  const { isLoggedIn, loading } = useSelector(state => state.auth);

  return (
    <div className="flex flex-col h-screen">
    {isLoggedIn ? <PrivateNabar /> : <PublicNavbar />}
      <Outlet />
    </div>
  );
};

export default RootLayout

