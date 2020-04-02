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
// import LikeDislikeButtons from '../LikeDislikeButtons/LikeDislikeButtons';

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
    likeButtonDiv: {
        background: 'rgb(48,48,48)',
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
    body: String,
};

export default function HistoryResults(props: Props) {
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
                    {/* <Typography className={styles.likedOnText}>
                        {props.mode === 'like' ? 'Liked' : 'Disliked'} on: {props.likedOn}
                    </Typography> */}
                    <Typography className={styles.bodyText}>
                        {props.body.substr(0, maxBodyLength)}
                    </Typography>
                    {/* <div className={styles.flexRight}>
                        <div className={styles.likeButtonDiv}>
                            <LikeDislikeButtons
                                likeStatus={props.mode === 'like' ? 1 : -1}
                                url={props.url}
                            />
                        </div>
                    </div> */}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
