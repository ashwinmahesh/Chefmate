import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LikeDislikeButtons from '../LikeDislikeButtons/LikeDislikeButtons';
import SearchTerm from './SearchTerm'

const useStyles = makeStyles((theme) => ({
  siteUrl: {
    fontSize: '12pt',
    margin: '0px',
    marginBottom: '5px',
  },
  link: {
    fontSize: '17pt',
    margin: '0px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  sampleText: {
    margin: '0px',
    marginTop: '7px',
  },
  singleSiteContainer: {
    marginBottom: '30px',
  },
  likeCount: {
    color: 'green',
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
};

export default function SingleResult(props: Props) {
  const styles = useStyles();
  const url = changeUrl();
  const redirectUrl = '/updateHistory?redirect=' + props.url;
  const maxLength = 170;
  const searchTerm = getSearchTermFromURL()

  function getSearchTermFromURL() {
    var url = new URL(document.location.href)
    var pathName = url.pathname
    var lastSlashIndex = pathName.lastIndexOf("/")
    var searchTerm = decodeURIComponent(pathName.substring(lastSlashIndex+1))
    
    return searchTerm
  }

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

  function getBoldedDesc() {
    const surroundingText = props.sampleText.split(searchTerm)
    var output = []

    for(var i=0; i < surroundingText.length; i++) {
      const text = surroundingText[i]

      output.push(
        <>
        {text}
        </>
      )

      if(i < surroundingText.length-1) {
        output.push(
          <>
          <b>{searchTerm}</b>
          </>
        )
      }
    }

    return output
  }

  return (
    <div className={styles.singleSiteContainer}>
      <p className={styles.siteUrl}>{url}</p>
      <a className={styles.link} href={redirectUrl}>
        {props.title}
      </a>

      <p className={styles.sampleText}>{getBoldedDesc()}</p>
      <div>
        <LikeDislikeButtons url={props.url} likeStatus={props.likeStatus} />
        <p className={styles.likeCount}>{props.likes} users liked this page.</p>
      </div>
    </div>
  );
}
