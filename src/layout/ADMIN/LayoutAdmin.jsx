import { Outlet } from 'react-router-dom'
import NavbarAdmin from './NavbarAdmin'
import HeaderAdmin from './HeaderAdmin'



const LayoutAdmin = () => {

  return (
    <div>

      <HeaderAdmin />
      <NavbarAdmin />

      <main>
        <Outlet />
      </main>

    </div> )
}

export default LayoutAdmin