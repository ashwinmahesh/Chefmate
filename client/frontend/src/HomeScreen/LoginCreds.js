import React from 'react';
import './homeScreen.css';
import Box from '@material-ui/core/Box';
import logo from '../images/logo.png';
import LoginBox from './LoginBox';
import HomeScreen from '../HomeScreen/HomeScreen';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    login: {
        fontSize: '25px',
        letterSpacing: '3px',
        color: '#DC1F06',
        marginBottom: '-10px',
        fontWeight: 'bold',

    },
    creds: {
        width: '400px',
        height: '5px',
        borderRadius: '2px',
        padding: '2%',
        margin: '15px',
        marginLeft: '20px'
        // borderColor: '#DC1F06'
    },
    creds2: {
        width: '400px',
        height: '5px',
        borderRadius: '2px',
        padding: '2%',
        margin: '15px',
        marginLeft: '20px'

        // borderColor: '#DC1F06'
    },
    label: {
        marginLeft: '-500px',
        color: '#DC1F06',

    },
    label2: {
        marginLeft: '-470px',
        color: '#DC1F06',

    },
    submit: {
        backgroundColor: '#38698E',
        height: '30px',
        width: '180px',
        fontSize: '16px',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '4px',
        marginTop: '10px'

    }

}));


export default function LoginCreds(props) {
    const styles = useStyles();

    return (
        <>
            <HomeScreen></HomeScreen>
            <LoginBox>
                <form>
                    <p className={styles.login}> L O G I N</p>
                    <br></br>
                    
                    <label className={styles.label}>
                        Email <br></br>
                        <input className={styles.creds} type="text" placeholder="Enter Email" name="name" required></input>
                    </label>
                    <br></br>
                    <label className={styles.label2}>
                        Password <br></br>
                        <input className={styles.creds2} type="password" placeholder="Enter password" name='password'></input>
                    </label>
                    <br></br>
                    <input type="submit" className={styles.submit} value="Submit" />
                </form>
            </LoginBox>
        </>
    )
}