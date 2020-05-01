import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderSearch from '../Headers/HeaderSearch';
import { Typography } from '@material-ui/core';
import { theme } from '../theme/theme';
import { connect } from 'react-redux';
import Footer from '../Footer/Footer';
import Youtube from './Youtube';

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
            minHeight: '100vh'
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
            minHeight: '100vh'
        },
    }));
type Props = {
    theme: String,
};
function Videos(props: Props) {
    const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
    const styles = useStyles(colors)();

    return (
        <div className={styles.wrapper}>
            <HeaderSearch initialSearch="" />
            <Typography className={styles.title}>Videos</Typography>
            <Youtube></Youtube>
            <Footer></Footer>
        </div>
    );
}
const mapStateToProps = (state) => ({
    theme: state.theme,
});

export default connect(mapStateToProps, {})(Videos);
