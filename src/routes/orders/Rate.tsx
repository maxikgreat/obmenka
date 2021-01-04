import React, {useEffect, useState} from 'react';
import styles from './Rate.module.scss';
import {OptToggle, Rate1, Rate2, Rate3, Rate4, Rate5, Rate6} from '../../assets';
import {useRateActions, useSessionsActions} from '../../state/hooks/UseActions';
import {useSelector} from '../../state/hooks';
import RateEntity from 'entities/Rate';
import RateEdit from './details/RateEdit';
import {useHistory} from 'react-router-dom';

const Rate: React.FC = () => {
  const history = useHistory();
  const rateList = useSelector((state) => state.rates);
  const user = useSelector((state) => state.session);

  // useEffect(() => {
  //   AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
  //     if (!isAuthenticated) {
  //       history.push('/auth');
  //     }
  //   });
  // }, []);

  const [optValue, setOptValue] = useState<boolean>(false);
  const [rozRate, setRozRate] = useState<RateEntity[]>([]);
  const [optRate, setOptRate] = useState<RateEntity[]>([]);

  const [isEditing, setEdit] = useState<boolean>(false);

  const [singleView, setSingleView] = useState<boolean>(true);

  const rateActions = useRateActions();
  const sessionActions = useSessionsActions();

  const checkAdmin = () => {
    if (user.exists) {
      if (user.isSuccess) {
        if (user.account.info.isAdmin) {
          setEdit(true);
        }
      }
    }
  };

  const setRates = () => {
    if (rateList.isSuccess) {
      const rozRate = rateList.rates.filter((r) => r.type === 'R');
      setRozRate(rozRate);
      const optRate = rateList.rates.filter((r) => r.type === 'O');
      setOptRate(optRate);
    }
  };

  useEffect(() => {
    rateActions.fetchRates();
    sessionActions.fetchSession();
    checkAdmin();
  }, []);

  useEffect(() => {
    checkAdmin();
  }, [user.exists && user.isSuccess && user.account]);

  useEffect(() => {
    setRates();
  }, [rateList]);

  const rates = [
    {
      id: rozRate.length > 0 && rozRate.filter((r) => r.name === 'USD/UAH')[0].id,
      name: rozRate.length > 0 && rozRate.filter((r) => r.name === 'USD/UAH')[0].name,
      buy: rozRate.length > 0 && rozRate.filter((r) => r.name === 'USD/UAH')[0].buy,
      sell: rozRate.length > 0 && rozRate.filter((r) => r.name === 'USD/UAH')[0].sell,
      image: Rate1,
    },
    {
      id: rozRate.length > 0 && rozRate.filter((r) => r.name === 'EUR/UAH')[0].id,
      name: rozRate.length > 0 && rozRate.filter((r) => r.name === 'EUR/UAH')[0].name,
      buy: rozRate.length > 0 && rozRate.filter((r) => r.name === 'EUR/UAH')[0].buy,
      sell: rozRate.length > 0 && rozRate.filter((r) => r.name === 'EUR/UAH')[0].sell,
      image: Rate2,
    },
    {
      id: rozRate.length > 0 && rozRate.filter((r) => r.name === 'RUB/UAH')[0].id,
      name: rozRate.length > 0 && rozRate.filter((r) => r.name === 'RUB/UAH')[0].name,
      buy: rozRate.length > 0 && rozRate.filter((r) => r.name === 'RUB/UAH')[0].buy,
      sell: rozRate.length > 0 && rozRate.filter((r) => r.name === 'RUB/UAH')[0].sell,
      image: Rate3,
    },
    {
      id: rozRate.length > 0 && rozRate.filter((r) => r.name === 'PLN/UAH')[0].id,
      name: rozRate.length > 0 && rozRate.filter((r) => r.name === 'PLN/UAH')[0].name,
      buy: rozRate.length > 0 && rozRate.filter((r) => r.name === 'PLN/UAH')[0].buy,
      sell: rozRate.length > 0 && rozRate.filter((r) => r.name === 'PLN/UAH')[0].sell,
      image: Rate4,
    },
    {
      id: rozRate.length > 0 && rozRate.filter((r) => r.name === 'CZK/UAH')[0].id,
      name: rozRate.length > 0 && rozRate.filter((r) => r.name === 'CZK/UAH')[0].name,
      buy: rozRate.length > 0 && rozRate.filter((r) => r.name === 'CZK/UAH')[0].buy,
      sell: rozRate.length > 0 && rozRate.filter((r) => r.name === 'CZK/UAH')[0].sell,
      image: Rate5,
    },
    {
      id: rozRate.length > 0 && rozRate.filter((r) => r.name === 'GBR/UAH')[0].id,
      name: rozRate.length > 0 && rozRate.filter((r) => r.name === 'GBR/UAH')[0].name,
      buy: rozRate.length > 0 && rozRate.filter((r) => r.name === 'GBR/UAH')[0].buy,
      sell: rozRate.length > 0 && rozRate.filter((r) => r.name === 'GBR/UAH')[0].sell,
      image: Rate6,
    },
  ];

  const optRates = [
    {
      id: optRate.length > 0 && optRate.filter((r) => r.name === 'USD/UAH')[0].id,
      name: optRate.length > 0 && optRate.filter((r) => r.name === 'USD/UAH')[0].name,
      buy: optRate.length > 0 && optRate.filter((r) => r.name === 'USD/UAH')[0].buy,
      sell: optRate.length > 0 && optRate.filter((r) => r.name === 'USD/UAH')[0].sell,
      image: Rate1,
    },
    {
      id: optRate.length > 0 && optRate.filter((r) => r.name === 'EUR/UAH')[0].id,
      name: optRate.length > 0 && optRate.filter((r) => r.name === 'EUR/UAH')[0].name,
      buy: optRate.length > 0 && optRate.filter((r) => r.name === 'EUR/UAH')[0].buy,
      sell: optRate.length > 0 && optRate.filter((r) => r.name === 'EUR/UAH')[0].sell,
      image: Rate2,
    },
    {
      id: optRate.length > 0 && optRate.filter((r) => r.name === 'RUB/UAH')[0].id,
      name: optRate.length > 0 && optRate.filter((r) => r.name === 'RUB/UAH')[0].name,
      buy: optRate.length > 0 && optRate.filter((r) => r.name === 'RUB/UAH')[0].buy,
      sell: optRate.length > 0 && optRate.filter((r) => r.name === 'RUB/UAH')[0].sell,
      image: Rate3,
    },
    {
      id: optRate.length > 0 && optRate.filter((r) => r.name === 'PLN/UAH')[0].id,
      name: optRate.length > 0 && optRate.filter((r) => r.name === 'PLN/UAH')[0].name,
      buy: optRate.length > 0 && optRate.filter((r) => r.name === 'PLN/UAH')[0].buy,
      sell: optRate.length > 0 && optRate.filter((r) => r.name === 'PLN/UAH')[0].sell,
      image: Rate4,
    },
    {
      id: optRate.length > 0 && optRate.filter((r) => r.name === 'CZK/UAH')[0].id,
      name: optRate.length > 0 && optRate.filter((r) => r.name === 'CZK/UAH')[0].name,
      buy: optRate.length > 0 && optRate.filter((r) => r.name === 'CZK/UAH')[0].buy,
      sell: optRate.length > 0 && optRate.filter((r) => r.name === 'CZK/UAH')[0].sell,
      image: Rate5,
    },
    {
      id: optRate.length > 0 && optRate.filter((r) => r.name === 'GBR/UAH')[0].id,
      name: optRate.length > 0 && optRate.filter((r) => r.name === 'GBR/UAH')[0].name,
      buy: optRate.length > 0 && optRate.filter((r) => r.name === 'GBR/UAH')[0].buy,
      sell: optRate.length > 0 && optRate.filter((r) => r.name === 'GBR/UAH')[0].sell,
      image: Rate6,
    },
  ];

  return (
    <div className={styles.container}>
      <svg
        className={styles.burger}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 7.5H25"
          stroke="#9191AF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 15H17.5"
          stroke="#9191AF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 22.5H22.5"
          stroke="#9191AF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className={styles.change__view}
        onClick={() => setSingleView(!singleView)}
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 23.6099V17.3599H8.25M2 12.3599C2.28011 9.61002 3.56283 7.05946 5.60342 5.19491C7.644 3.33035 10.2996 2.2823 13.0636 2.25073C15.8276 2.21916 18.5064 3.20628 20.5891 5.02374C22.6717 6.8412 24.0124 9.3618 24.3552 12.1046C24.6981 14.8474 24.0191 17.6205 22.4479 19.8947C20.8768 22.1688 18.5233 23.785 15.8366 24.4348C13.1499 25.0845 10.318 24.7224 7.88125 23.4175C5.44448 22.1126 3.5734 19.9563 2.625 17.3599L2 12.3599Z"
          stroke="#9191AF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className={styles.login__user}
        onClick={() => history.push('/auth')}
        width="28"
        height="27"
        viewBox="0 0 28 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.25 12C12.0114 12 14.25 9.76142 14.25 7C14.25 4.23858 12.0114 2 9.25 2C6.48858 2 4.25 4.23858 4.25 7C4.25 9.76142 6.48858 12 9.25 12Z"
          stroke="#9191AF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.75 24.5V22C1.75 20.6739 2.27678 19.4021 3.21447 18.4645C4.15215 17.5268 5.42392 17 6.75 17H11.75C13.0761 17 14.3479 17.5268 15.2855 18.4645C16.2232 19.4021 16.75 20.6739 16.75 22V24.5"
          stroke="#9191AF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.75 8.25V15.75M18 12H25.5H18Z"
          stroke="#9191AF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className={styles.toggle__container}>
        <button
          type="button"
          onClick={() => setOptValue(!optValue)}
          className={styles.toggle__btn}
        >
          <img src={OptToggle} alt="toggle" />
          {!optValue ? 'Розничные' : 'Оптовые'}
        </button>
      </div>
      <div className={styles.rate__inner}>
        <div
          className={singleView ? styles.rate__container : styles.rate__container__multi}
        >
          {isEditing
            ? (!optValue ? rates : optRates).map((rate, index) => {
                return <RateEdit rate={rate} key={rate.id ? rate.id : index} />;
              })
            : (!optValue ? rates : optRates).map((rate, index) => {
                return (
                  <div className={styles.rate__card} key={rate.id ? rate.id : index}>
                    <span className={styles.rate__name}>{rate.name}</span>
                    <div className={styles.rate__inner}>
                      <div>
                        <span className={styles.rate__price}>{rate.buy}</span>
                        <span className={styles.rate__price__title}>buy</span>
                      </div>
                      <div>
                        <span className={styles.rate__price}>{rate.sell}</span>
                        <span className={styles.rate__price__title}>sell</span>
                      </div>
                    </div>
                    <img
                      src={rate.image}
                      alt="rate_footer"
                      className={styles.rate__footer}
                    />
                  </div>
                );
              })}
        </div>
        <div className={styles.footer__container}>
          <div className={styles.footer__block}>
            <div className={styles.footer__title}>
              <svg
                width="74"
                height="71"
                viewBox="0 0 74 71"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M61.6667 32.5416C60.9126 27.3356 58.3955 22.5119 54.503 18.8135C50.6105 15.1151 45.5586 12.7472 40.1255 12.0746C34.6924 11.4019 29.1795 12.4619 24.436 15.0912C19.6926 17.7204 15.9817 21.7731 13.875 26.625M12.3333 11.8333V26.625H27.75"
                  stroke="#607D8B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.3333 38.4583C13.0874 43.6643 15.6045 48.4881 19.497 52.1865C23.3895 55.8849 28.4414 58.2528 33.8745 58.9254C39.3076 59.598 44.8205 58.5381 49.564 55.9088C54.3074 53.2795 58.0183 49.2268 60.125 44.375M61.6667 59.1666V44.375H46.25"
                  stroke="#607D8B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Выгодный курс</span>
            </div>
            <div className={styles.footer__description}>
              Самый выгодный и актуальный курс обмена валют в Харькове и Харьковской
              области
            </div>
          </div>
          <div className={styles.footer__block}>
            <div className={styles.footer__title}>
              <svg
                width="70"
                height="66"
                viewBox="0 0 70 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.25 38.5L43.75 22"
                  stroke="#607D8B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27.7083 24.75C28.5137 24.75 29.1667 24.1344 29.1667 23.375C29.1667 22.6156 28.5137 22 27.7083 22C26.9029 22 26.25 22.6156 26.25 23.375C26.25 24.1344 26.9029 24.75 27.7083 24.75Z"
                  fill="black"
                  stroke="#607D8B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.2917 38.5C43.0971 38.5 43.75 37.8844 43.75 37.125C43.75 36.3656 43.0971 35.75 42.2917 35.75C41.4863 35.75 40.8334 36.3656 40.8334 37.125C40.8334 37.8844 41.4863 38.5 42.2917 38.5Z"
                  fill="black"
                  stroke="#607D8B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5834 57.75V13.75C14.5834 12.2913 15.198 10.8924 16.2919 9.86091C17.3859 8.82946 18.8696 8.25 20.4167 8.25H49.5834C51.1305 8.25 52.6142 8.82946 53.7082 9.86091C54.8021 10.8924 55.4167 12.2913 55.4167 13.75V57.75L46.6667 52.25L40.8334 57.75L35 52.25L29.1667 57.75L23.3334 52.25L14.5834 57.75Z"
                  stroke="#607D8B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Скидки</span>
            </div>
            <div className={styles.footer__description}>
              Для постоянных клиентов действуют особые правила обмена и акционные
              программы
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rate;
