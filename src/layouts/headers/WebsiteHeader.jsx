import React from 'react'
import styles from './WebsiteHeader.module.scss'
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

const WebsiteHeader = () => {
  return (
    <header>
      <nav className={cn('navbar', 'navbar-expand-lg', 'navbar-light', styles['custom-navbar'])}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/logo.png" alt="logo" className={styles['logo-img']} />
          </a>
          <button className={cn('navbar-toggler', styles['custom-toggle'])} type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className={cn(['navbar-toggler-icon', styles['custom-icon']])}></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={cn(['nav-link', 'text-light', 'px-3'])} aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className={cn(['nav-link', 'text-light', 'px-3'])} href="#">About</a>
              </li>
              <li className="nav-item">
                <a className={cn(['nav-link', 'text-light', 'px-3'])} href="#">Contact</a>
              </li>

            </ul>

            <NavLink to={'/register'} className={cn('btn', 'me-2', styles['header-btn'])}>Register</NavLink>

            <NavLink to={'/login'} className={cn('btn', styles['header-btn'])} >Login</NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default WebsiteHeader