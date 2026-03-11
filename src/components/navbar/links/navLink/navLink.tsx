'use client'

import styles from './navLink.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavItem } from '@/lib/types'



const NavLink = ({ item }: { item: NavItem }) => {
  const pathName = usePathname();

  return (
    <Link href={item.path} className={`${styles.container} ${pathName === item.path && styles.active}`}>
      {item.name}
    </Link>
  )
}

export default NavLink;
