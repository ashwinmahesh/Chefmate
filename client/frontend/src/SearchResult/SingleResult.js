import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LikeDislikeButtons from '../LikeDislikeButtons/LikeDislikeButtons';

import { theme } from '../template/theme';
import { connect } from 'react-redux';

const useStyles = (colors) =>
  makeStyles((theme) => ({
  siteUrl: {
    fontSize: '12pt',
    margin: '0px',
    marginBottom: '5px',
    color: colors.searchTextPrimary,
  },
  link: {
    fontSize: '17pt',
    margin: '0px',
    textDecoration: 'none',
    color:colors.linkPrimary,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  sampleText: {
    color: colors.searchTextPrimary,
    margin: '0px',
    marginTop: '7px',
  },
  singleSiteContainer: {
    marginBottom: '30px',
  },
  likeCount: {
    color: colors.likedPagesPrimary,
    margin: '0px',
    display: 'inline-block',
    marginLeft: '20px',
  },
}));

type Props = {
  url: string,
  title: string,
  sampleText: string,
  likes: number,
  likeStatus: -1 | 0 | 1,
  theme: String, 
};

function SingleResult(props: Props) {
  //const styles = useStyles();
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
  const url = changeUrl();
  const redirectUrl = '/updateHistory?redirect=' + props.url;
  const maxLength = 170;

  function changeUrl() {
    var output = '';
    let i = props.url.substr(0, 8) == 'https://' ? 8 : 0;
    if (props.url.substr(i, 4) === 'www.') i += 4;
    for (i; i < props.url.length; i++) {
      if (props.url[i] == '/') {
        if (i !== props.url.length - 1) output += ' > ';
      } else output += props.url[i];
    }
    return output;
  }

  return (
    <div className={styles.singleSiteContainer}>
      <p className={styles.siteUrl}>{url}</p>
      <a className={styles.link} href={redirectUrl}>
        {props.title}
      </a>
      <p className={styles.sampleText}>{props.sampleText.substr(0, maxLength)}</p>
      <div>
        <LikeDislikeButtons url={props.url} likeStatus={props.likeStatus} />
        <p className={styles.likeCount}>{props.likes} users liked this page.</p>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(SingleResult);
