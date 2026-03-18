"use client";

import { useState } from 'react';
import styles from './links.module.css'
import NavLink from './navLink/navLink';
import Image from 'next/image';
import { handleLogout } from '@/lib/action';
import { Session } from '@/lib/types';

const Links = ({ session }: { session: Session }) => {
  const links = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'About', path: '/about' },
    { id: 3, name: 'Blog', path: '/blog' },
    { id: 4, name: 'Contact', path: '/contact' },
  ];

  const [open, setOpen] = useState(false);

  // TEMPORARY HARD-CODED AUTH VALUES
  // const isAdmin = true;


  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.id} />
        ))}
        {session?.user ? (<>{session.user?.isAdmin && <NavLink item={{ id: 6, name: 'Admin', path: '/admin' }} />}
          <form action={handleLogout}><button className={styles.logout}>Logout</button></form>
        </>) : (
          <NavLink item={{ id: 7, name: 'Login', path: '/login' }} />
        )}
      </div>

      {/* <button className={styles.menuButton} onClick={() => setOpen((prev) => !prev)}>Menu</button> */}
      <Image src="/menu.png" alt="" className={styles.menuButton} width={30} height={30} onClick={() => setOpen((prev) => !prev)} />
      {open && (<div className={styles.mobileLinks}>
        {links.map((link) => (<NavLink item={link} key={link.id} />))}
      </div>)}
    </div>
  )
}

export default Links
