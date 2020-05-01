import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaExclamationCircle } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  iconStyle: {
    color: 'rgb(40,40,40)',
    fontSize: '40px',
    marginTop: '80px',
  },
  font: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: 'rgb(40,40,40)',
  },
  subtitle: {
    fontSize: '16pt',
  },
  linkText: {
    color: 'blue',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
}));

type Props = {
  didUMean: String,
};
export default function NoResults(props: Props) {
  const styles = useStyles();
  return (
    <div>
      <FaExclamationCircle className={styles.iconStyle} />
      <p className={styles.font}>Bummer, we couldn't find anything</p>
      <p className={styles.subtitle}>
        Did you mean:{' '}
        <a href={`/result/${props.didUMean}`} className={styles.linkText}>
          {props.didUMean}
        </a>
        ?
      </p>
    </div>
  );
}
