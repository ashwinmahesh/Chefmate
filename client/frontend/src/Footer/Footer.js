import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { FaGithub, FaGit } from 'react-icons/fa';


const useStyles = makeStyles({
    root: {
        justifyContent: 'center',
        position: 'absolute',
        left: '0',
        bottom: '0',
        right: '0',
    },
    footerWriting: {
        color: 'grey',
        textDecoration: 'italics',
    },
    github: {
        fontSize: '30px',
        color: 'black',
        marginLeft: '20px',
        padding: '10px',
        "&:hover": {
            color: "#DC1F06"
        },
    }
});

export default function Footer() {
    const styles = useStyles();
    return (
        <BottomNavigation className={styles.root}>
            <p className={styles.footerWriting}> Copyright 2020 Chefmate. All Rights Reserved. <br></br>
                <BottomNavigationAction className={styles.github} icon={<FaGithub />} href='https://github.com/amahesh98/Chefmate' />
            </p> 
 
        </BottomNavigation>
    );
}