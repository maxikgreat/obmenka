import React, {ReactElement} from 'react';
import styles from './AuthLayout.module.scss';
import {Container, CssBaseline, Paper, Typography} from '@material-ui/core';

interface AuthLayoutProps {
  title: string;
  subTitle?: string;
  bottomElements?: () => ReactElement;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({children, bottomElements, subTitle}) => {
  // TODO: REMOVE
  let customEnv: string | undefined = process.env.REACT_APP_NODE_ENV;
  if (customEnv === 'production') customEnv = undefined;

  return (
    <Container className={styles.authContainer} maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} className={styles.authContainer__paper}>
        <p>{customEnv}</p>
        <Typography
          className={styles.authContainer__paper__title}
          component="h1"
          variant="h5"
        />
        {subTitle && (
          <Typography
            className={styles.authContainer__paper__subTitle}
            component="h1"
            variant="h5"
          >
            {subTitle}
          </Typography>
        )}
        {children}
        {bottomElements && bottomElements()}
      </Paper>
    </Container>
  );
};

export default AuthLayout;
