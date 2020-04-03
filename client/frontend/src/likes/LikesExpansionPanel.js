import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FaStar } from 'react-icons/fa';
import LikeDislikeButtons from '../LikeDislikeButtons/LikeDislikeButtons';
import { theme } from '../template/theme';
import { connect } from 'react-redux';

const useStyles = (colors) =>
  makeStyles((theme) => ({
    expansionPanel: {
      background: colors.secondaryBackground,
    },
    titleText: {
      color: colors.primaryText,
      fontSize: '13pt',
      marginLeft: '20px',
    },
    expandIcon: {
      color: colors.primaryText,
      size: 16,
    },
    expansionDetailsDiv: {
      textAlign: 'left',
      width: '100%',
    },
    likedOnText: {
      color: colors.secondaryText,
      marginBottom: '15px',
    },
    bodyText: {
      color: colors.primaryText,
    },
    url: {
      color: colors.primaryText,
      textDecoration: 'none',
      '&:visited': {
        color: colors.primaryText,
      },
    },
    urlTypography: {
      display: 'inline-block',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    likeButtonDiv: {
      background: colors.tertiaryBackground,
      width: 'fit-content',
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '10px',
      paddingRight: '10px',
      borderRadius: '10px',
      marginTop: '15px',
    },
    flexRight: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }));

type Props = {
  title: String,
  url: String,
  likedOn: String,
  body: String,
  mode: 'like' | 'dislike',
  theme: String,
};

function LikesExpansionPanel(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
  const maxBodyLength = 2000;

  return (
    <ExpansionPanel className={styles.expansionPanel}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon color="white" />}
        classes={{ expandIcon: styles.expandIcon }}
      >
        <FaStar size={24} color={props.mode === 'like' ? 'gold' : 'grey'} />
        <Typography className={styles.titleText}>{props.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={styles.expansionDetailsDiv}>
          <a href={props.url} className={styles.url}>
            <Typography className={styles.urlTypography}>{props.url}</Typography>
          </a>
          <Typography className={styles.likedOnText}>
            {props.mode === 'like' ? 'Liked' : 'Disliked'} on: {props.likedOn}
          </Typography>
          <Typography className={styles.bodyText}>
            {props.body.substr(0, maxBodyLength)}
          </Typography>
          <div className={styles.flexRight}>
            <div className={styles.likeButtonDiv}>
              <LikeDislikeButtons
                likeStatus={props.mode === 'like' ? 1 : -1}
                url={props.url}
              />
            </div>
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(LikesExpansionPanel);
