import React from 'react';
import {Field, Form, Formik} from 'formik';
import {Link as RouterLink} from 'react-router-dom';
import {Button, Grid, Link} from '@material-ui/core';
import styles from './Welcome.module.scss';
import Schema from '../utils/validationSchema';
import {Loader, TextField} from 'components';
import {useAuthActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import AuthLayout from '../common/AuthLayout/AuthLayout';
// import {AuthInfoKeeper} from 'auth';

interface LoginFormValues {
  email: string;
  password: string;
}

const Welcome: React.FC = () => {
  const actions = useAuthActions();
  const {isBusy} = useSelector((state) => state.auth);

  // const history = useHistory();

  // useEffect(() => {
  //   AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
  //     if (isAuthenticated) {
  //       history.push('/main');
  //     }
  //   });
  // }, []);

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const renderBottomElements = () => (
    <Grid container className={styles.bottomContainer}>
      <Grid item>
        <span className={styles.bottomContainer__text}>Забыли пароль? </span>
        <Link
          underline="always"
          color="inherit"
          component={RouterLink}
          to="/forgotPassword"
          className={styles.bottomContainer__text}
        >
          Восстановить
        </Link>
      </Grid>
    </Grid>
  );

  return (
    <AuthLayout title="Вход" bottomElements={renderBottomElements}>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema.LoginSchema}
        onSubmit={(values, formActions) => {
          actions.login(values);
          formActions.setSubmitting(false);
        }}
      >
        <Form className={styles.form}>
          <Field
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            autoComplete="email"
            name="email"
            as={TextField}
            s
            label="Email"
          />
          <Field
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            as={TextField}
          />
          <div className={styles.form__btnContainer}>
            {!isBusy ? (
              <Button
                className={styles.form__btnContainer__yellow}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Войти
              </Button>
            ) : (
              <Loader />
            )}
            <Button
              fullWidth
              className={styles.form__btnContainer__blue}
              variant="contained"
              color="default"
              component={RouterLink}
              to="/signUp"
            >
              Зарегестрироваться
            </Button>
          </div>
          <Grid container className={styles.form__forgotPassword}>
            <Grid item>
              <span className={styles.form__forgotPassword__text}>Не можете войти? </span>
              <Link
                underline="always"
                color="inherit"
                component={RouterLink}
                to="/forgotPassword"
                className={styles.form__forgotPassword__text}
              >
                Восстановление доступа
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </AuthLayout>
  );
};

export default Welcome;
