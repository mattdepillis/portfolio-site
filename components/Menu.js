import cs from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../styles/custom-css/Menu.module.css'
import { siteLinks, socialLinks } from './Links'

export const Menu = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <footer className={styles.dockOuter}>
        <div className={styles.dockInner}>
          {siteLinks.map((page) => (
            <div
              className={cs(
                styles.siteLinkContainer,

                // * if the active path of the site === page href, style path button in dock
                (router.pathname === page.href) && styles.activeRoute
              )}
            >
              <Link href={page.href}>
                <a
                  className={cs(styles.action, styles[page.name])}
                  key={page.name}
                  title={page.title}  
                >
                  <div className={styles.page}>
                    <div className={styles.pagePane} />
                  </div>

                  <div className={styles.page}>
                    <p className={styles.siteLinkIcon}>{page.icon}</p>
                  </div>
                </a>
              </Link>
            </div>
          ))}

          <div className={styles.divider}></div>

          {socialLinks.map((social) => (
            <div>
              <a
                className={cs(styles.action, styles[social.name])}
                href={social.href}
                key={social.name}
                title={social.title}
                target='_blank'
                rel='noopener noreferrer'
              >
                <div className={styles.social}>
                  <div className={styles.socialPane} />
                </div>

                <div className={styles.social}>{social.icon}</div>
              </a>
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default Menu
