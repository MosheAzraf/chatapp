import { Outlet } from 'react-router-dom'
import PublicNavbar from '../components/PublicNavbar';
import PrivateNabar from '../components/PrivateNavbar'
import { useSelector } from 'react-redux';


const RootLayout = () => {
  const { isLoggedIn, loading } = useSelector(state => state.auth);

  return (
    <div className="flex flex-col h-screen">
      {
        isLoggedIn ? <PrivateNabar/> : <PublicNavbar/>
      }
      {/* Content */}
      <div className="flex-grow p-4 bg-gray-100">
        <Outlet/>
      </div>
    </div>
  );
};

export default RootLayout

