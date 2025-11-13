import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

function Layout() {
  return (
    <div className="layout">
      <nav className="layout__sidebar">
        <ul className="layout__nav">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? 'layout__link layout__link--active' : 'layout__link'
              }
            >
              الصفحة الرئيسية
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? 'layout__link layout__link--active' : 'layout__link'
              }
            >
              إدارة المستخدمين
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive ? 'layout__link layout__link--active' : 'layout__link'
              }
            >
              التقارير
            </NavLink>
          </li>
        </ul>
      </nav>
      <section className="layout__content">
        <Outlet />
      </section>
    </div>
  )
}

export default Layout

