import cs from 'classnames'
import Link from 'next/link'

import styles from '../styles/custom-css/Menu.module.css'
import { siteLinks, socialLinks } from './Links'


export const Menu = () =>
  <div className={styles.container}>
    <footer className={styles.pageAside}>
      {siteLinks.map((page) => (
        <Link href={page.href}>
          <a
            className={cs(styles.action, styles[page.name])}
            key={page.name}
            title={page.title}  
          >
            <div className={styles.actionBg}>
              <div className={styles.actionBgPane} />
            </div>

            <div className={styles.actionBg}>
              <p>{page.icon}</p>
            </div>
          </a>
        </Link>
      ))}

      <div className={styles.divider}></div>
      {socialLinks.map((action) => (
        <a
          className={cs(styles.action, styles[action.name])}
          href={action.href}
          key={action.name}
          title={action.title}
          target='_blank'
          rel='noopener noreferrer'
        >
          <div className={styles.actionBg}>
            <div className={styles.actionBgPane} />
          </div>

          <div className={styles.actionBg}>{action.icon}</div>
        </a>
      ))}
    </footer>
  </div>

export default Menu
