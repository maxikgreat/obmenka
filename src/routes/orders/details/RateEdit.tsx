import React, {useState} from 'react';
import styles from './RateEdit.module.scss';
import {useRateEditActions} from '../../../state/hooks/UseActions';
import Loader from 'react-loader-spinner';

interface RateEditProp {
  rate: {
    id: string | false;
    name: string | false;
    buy: number | false;
    sell: number | false;
    image: string | false;
  };
}

const RateEdit: React.FC<RateEditProp> = ({rate}) => {
  const actions = useRateEditActions();

  const [updating, setUpdating] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const [buy, setBuy] = useState<string>(rate.buy ? rate.buy.toString() : '0');
  const [sell, setSell] = useState<string>(rate.sell ? rate.sell.toString() : '0');

  const updateRate = () => {
    setUpdating(true);
    actions.updateRate({
      id: rate.id ? rate.id : '',
      buy: +buy,
      sell: +sell,
    });

    const upd = () => {
      setUpdated(true);
      setTimeout(() => setUpdated(false), 5000);
    };

    setTimeout(() => {
      setUpdating(false);
      upd();
    }, 2000);
  };

  return (
    <div className={styles.rate__card}>
      <span className={styles.rate__name}>{rate.name}</span>
      <div className={styles.rate__inner}>
        <div>
          <span className={styles.rate__price}>
            <input
              className={styles.extraInfo__input}
              type="text"
              value={buy}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBuy(e.target.value)
              }
            />
          </span>
          <span className={styles.rate__price__title}>buy</span>
        </div>
        <div>
          <span className={styles.rate__price}>
            <input
              className={styles.extraInfo__input}
              type="text"
              value={sell}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSell(e.target.value)
              }
            />
          </span>
          <span className={styles.rate__price__title}>sell</span>
        </div>
      </div>
      {!updating ? (
        <button
          type="button"
          className={styles.update__rate}
          onClick={() => updateRate()}
        >
          &#10004;
        </button>
      ) : (
        <button
          type="button"
          className={styles.update__rate}
          onClick={() => updateRate()}
        >
          <Loader type="Oval" color="#242424" height={20} width={20} />
        </button>
      )}
      {updated && <div className={styles.updated}>Updated</div>}
      {rate.image && (
        <img src={rate.image} alt="rate_footer" className={styles.rate__footer} />
      )}
    </div>
  );
};

export default RateEdit;
