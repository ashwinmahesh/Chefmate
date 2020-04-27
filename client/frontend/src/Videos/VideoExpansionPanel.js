import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    colors,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FaVideo } from 'react-icons/fa';
import { theme } from '../theme/theme';
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
            color: 'rgb(192,192,192)',
            marginBottom: '15px',
        },
        bodyText: {
            color: colors.primaryText,
            marginTop: '15px',
        },
        url: {
            color: colors.linkPrimary,
            textDecoration: 'none',
            '&:visited': {
                color: colors.visitedLinkPrimary,
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
    theme: String,
};

function VideoExpansionPanel(props: Props) {
    const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
    const styles = useStyles(colors)();
    const maxBodyLength = 2000;

    return (
        <ExpansionPanel className={styles.expansionPanel}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon color="white" />}
                classes={{ expandIcon: styles.expandIcon }}
            >
                <FaVideo size={24} color={'white'} />
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
const mapStateToProps = (state) => ({
    theme: state.theme,
});

export default connect(mapStateToProps, {})(VideoExpansionPanel);
