import React from 'react';
import styles from './Contacts.module.scss';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {Telegram, Viber, Whatsapp, Line} from '../../assets';

const Contacts: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>пр. Гагарина 22 (Холл Автовокзала)</h1>

      <LoadScript googleMapsApiKey="AIzaSyDnD_3GhOlEg6lsmIF03pKiL_w__hJM424">
        <GoogleMap
          mapContainerStyle={{width: '100%', height: '90%'}}
          center={{lat: 49.979382, lng: 36.246298}}
          zoom={17}
        >
          <Marker position={{lat: 49.979382, lng: 36.246298}} />
        </GoogleMap>
      </LoadScript>

      <div className={styles.phone__numbers__container}>
        <span>+38 (095) 163 28 88</span>
        <div className={styles.socials__container}>
          <a href="#">
            <img src={Whatsapp} alt="whatsapp-icon" />
          </a>
          <a href="#" />
          <img src={Viber} alt="viber-icon" />
          <a href="#" />
          <img src={Telegram} alt="telegram-icon" />
          <a href="#" />
          <img src={Line} alt="line-icon" />
        </div>
        <span>+38 (067) 288 22 07</span>
      </div>
    </div>
  );
};

export default Contacts;
