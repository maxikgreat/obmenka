import React from 'react';
import {useHistory, Link, useLocation} from 'react-router-dom';
import {createStyles, Drawer, makeStyles, MenuItem, MenuList} from '@material-ui/core';
import styles from './AdminLayout.module.scss';

import {
  CourierIconActive,
  LogoutIcon,
  RateIcon,
  RateIconActive,
  RestaurantIconActive,
  SettingsIcon,
  SidebarLogo,
  Notifications,
  Chat,
  Map,
  AddUser,
  CrossRateIcon,
  RequestIcon,
  HistoryIcon,
  ProfileIcon,
  ContactsIcon,
  ActiveCrossRateIcon,
  MapIcon,
  ActiveHistoryIcon,
  ActiveProfileIcon,
  ActiveContactsIcon,
  ActiveSettingsIcon,
} from '../../assets';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';
import CustomSnackBar from '../../components/SnackBar/SnackBar';

const drawerWidth = 230;

interface MenuLink {
  label: string;
  path: string;
  icon: string;
  activeIcon?: string; // TODO: WAIT for all icons
  dev?: boolean;
}

interface BarItem {
  path: string;
  icon: string;
  onClick?: void;
}

const useStyles = makeStyles(() =>
  createStyles({
    drawerPaper: {
      width: drawerWidth,
      position: 'relative',
      background: '#EEEEEE',
      border: 'none',
    },
    selected: {
      backgroundColor: '#EEF2F6 !important',
      '&:hover': {
        backgroundColor: '#EEF2F6 !important',
      },
    },
  }),
);

const AdminLayout: React.FC = ({children}) => {
  const {t} = useTranslation('adminLayout');
  const classes = useStyles();
  const {pathname} = useLocation();

  // const [authVisible, setAuthVisible] = useState<boolean>(false);

  const barItems: BarItem[] = [
    {
      path: 'customers',
      icon: Notifications,
    },
    {
      path: 'customers',
      icon: Chat,
    },
    {
      path: 'sets',
      icon: Map,
    },
    {
      path: 'auth',
      icon: AddUser,
    },
  ];

  const links: MenuLink[] = [
    {
      label: 'Курс валют',
      path: 'rate',
      icon: RateIcon,
      activeIcon: RateIconActive,
    },
    {
      label: 'Крос-курс',
      path: 'customers',
      icon: CrossRateIcon,
      activeIcon: ActiveCrossRateIcon,
    },
    {
      label: 'Заявка',
      path: 'couriers',
      icon: RequestIcon,
      activeIcon: CourierIconActive,
      dev: true,
    },
    {
      label: 'Карта',
      path: 'restaurants',
      icon: MapIcon,
      activeIcon: RestaurantIconActive,
      dev: true,
    },
    {
      label: 'История',
      path: 'payments/couriers',
      icon: HistoryIcon,
      activeIcon: ActiveHistoryIcon,
      dev: true,
    },
    {
      label: 'Профиль',
      path: 'cuisines',
      icon: ProfileIcon,
      activeIcon: ActiveProfileIcon,
      dev: true,
    },
    {
      label: 'Контакты',
      path: 'sets',
      icon: ContactsIcon,
      activeIcon: ActiveContactsIcon,
    },
    {
      label: 'Настройки',
      path: 'weekMenu',
      icon: SettingsIcon,
      activeIcon: ActiveSettingsIcon,
      dev: true,
    },
    {label: t('logout'), path: 'logout', icon: LogoutIcon},
  ];

  const history = useHistory();

  const renderBar = (barItem: BarItem) => {
    return (
      <div>
        {barItem.path === 'sets' ? (
          <div onClick={() => history.push('/sets')}>
            <img
              src={barItem.icon}
              alt={barItem.path}
              className={styles.barItem__image}
            />
          </div>
        ) : (
          <div onClick={() => (barItem.path === 'auth' ? history.push('/auth') : {})}>
            <img
              src={barItem.icon}
              alt={barItem.path}
              className={styles.barItem__image}
            />
          </div>
        )}
      </div>
    );
  };

  const renderMenuLink = (link: MenuLink, path: string) => {
    const isSelected = `/${link.path}` === path;
    return (
      <MenuItem
        className={styles.adminContainer__aside__drawer__list__item}
        classes={{selected: classes.selected}}
        selected={isSelected}
        component={Link}
        to={link.dev ? '#' : `/${link.path}`}
        key={Math.random()}
      >
        <img
          src={isSelected && link.activeIcon ? link.activeIcon : link.icon}
          alt={link.path}
          className={styles.menuItemIcon}
        />
        <span
          className={classNames(styles.adminContainer__aside__drawer__list__item__text, {
            [styles.activeLink]: isSelected,
          })}
        >
          {link.label}
          {link.dev && <span className={styles.dev__tag}>Скоро</span>}
        </span>
      </MenuItem>
    );
  };

  return (
    <>
      <div className={styles.barItem}>{barItems.map((item) => renderBar(item))}</div>
      <div className={styles.adminContainer}>
        <CustomSnackBar />
        <aside className={styles.adminContainer__aside}>
          <Drawer
            className={styles.adminContainer__aside__drawer}
            classes={{paper: classes.drawerPaper}}
            variant="permanent"
          >
            <div className={styles.adminContainer__aside__drawer__logo}>
              <img src={SidebarLogo} alt="logo" />
              <div className={styles.adminContainer__aside__drawer__logo__titleContainer}>
                <span className={styles.adminContainer__aside__drawer__logo__firstTitle}>
                  Obmen
                </span>
                <span className={styles.adminContainer__aside__drawer__logo__secondTitle}>
                  -ka
                </span>
              </div>
            </div>
            <MenuList className={styles.adminContainer__aside__drawer__list}>
              {links.map((link) => renderMenuLink(link, pathname))}
            </MenuList>
          </Drawer>
        </aside>
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
