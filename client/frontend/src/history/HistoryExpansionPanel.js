import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FaHistory } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  expansionPanel: {
    background: 'rgb(72,72,72)',
  },
  titleText: {
    color: 'white',
    fontSize: '13pt',
    marginLeft: '20px',
  },
  expandIcon: {
    color: 'white',
    size: 16,
  },
  expansionDetailsDiv: {
    textAlign: 'left',
    width: '100%',
  },
  likedOnText: {
    color: 'rgb(192,192,192)',
    marginBottom: '15px',
  },
  bodyText: {
    color: 'white',
    marginTop: '15px',
  },
  url: {
    color: 'white',
    textDecoration: 'none',
    '&:visited': {
      color: 'white',
    },
  },
  urlTypography: {
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

type Props = {
  title: String,
  url: String,
  body: String,
};

export default function HistoryExpansionPanel(props: Props) {
  const styles = useStyles();
  const maxBodyLength = 2000;

  return (
    <ExpansionPanel className={styles.expansionPanel}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon color="white" />}
        classes={{ expandIcon: styles.expandIcon }}
      >
        <FaHistory size={24} color={'white'} />
        <Typography className={styles.titleText}>{props.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={styles.expansionDetailsDiv}>
          <a href={props.url} className={styles.url}>
            <Typography className={styles.urlTypography}>{props.url}</Typography>
          </a>
          <Typography className={styles.bodyText}>
            {props.body.substr(0, maxBodyLength)}
          </Typography>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
