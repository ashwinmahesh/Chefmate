import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import HeaderSearch from '../Headers/HeaderSearch';
import { CircularProgress, Typography } from '@material-ui/core';
import { theme } from '../theme/theme';
import { connect } from 'react-redux';

const useStyles = (colors) =>
    makeStyles((theme) => ({
        title: {
            color: colors.primaryText,
            fontWeight: 'bold',
            fontSize: '20pt',
            textAlign: 'left',
            padding: '0',
            margin: '0',
            marginTop: '20px',
            marginLeft: '20px',
        },
        wrapper: {
            background: colors.background,
            minHeight: '100vh',
        },
        pageDescription: {
            textAlign: 'left',
            padding: '0',
            margin: '0',
            marginTop: '5px',
            marginLeft: '20px',
            fontStyle: 'italic',
            color: colors.pageDescriptionPrimary,
        },
        panelsWrapper: {
            paddingLeft: '15px',
            paddingRight: '15px',
            paddingTop: '20px',
            paddingBottom: '20px',
        },
        loading: {
            color: 'rgb(230, 95, 85)',
            marginTop: '150px',
        },
    }));
type Props = {
    theme: String,
};

function Videos(props: Props) {
    const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
    const styles = useStyles(colors)();
    const [loginRedirect, changeLoginRedirect] = useState(false);
    const [isLoading, changeLoading] = useState(true);

    async function checkAuthentication() {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') return;
        const { data } = await axios.get('/checkAuthenticated');
        if (data.success === 0) {
            changeLoginRedirect(true);
        }
    }

   
   

    useEffect(() => {
        checkAuthentication();
    }, []);

   

    return (
        <div className={styles.wrapper}>
            {loginRedirect && <Redirect to="/" />}
            <HeaderSearch initialSearch="" />

            <Typography className={styles.title}>Your Videos</Typography>
            <Typography className={styles.pageDescription}>
                Your videos will be displayed here! 
      </Typography>
           
        </div>
    );
}
const mapStateToProps = (state) => ({
    theme: state.theme,
});

export default connect(mapStateToProps, {})(Videos);
