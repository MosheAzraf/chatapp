import { Outlet, Link } from 'react-router-dom'
import PublicNavbar from '../components/PublicNavbar';


const RootLayout = ({isAuth}) => {
  console.log("rootlayout:", isAuth);
  return (
    <div className="flex flex-col h-screen">
      {
        isAuth ? <p>Ok.</p> : <PublicNavbar/>
      }
      

      {/* Content */}
      <div className="flex-grow p-4 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout

