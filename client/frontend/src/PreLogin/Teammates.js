import React, { useState, useEffect, Component } from 'react';
import { ScrollTo } from "react-scroll-to";
import LoginBox from '../Login/LoginBox';
import { Redirect } from 'react-router-dom';
import HomepageBackground from '../Login/HomepageBackground';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import profile1 from '../images/profile1.jpg';
import profile2 from '../images/profile2.jpg';
import profile3 from '../images/profile3.jpg';
import profile4 from '../images/profile4.jpg';
import profile5 from '../images/profile5.jpg';
import profile6 from '../images/profile6.jpg';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: '#38698e',
        opacity: '.95',
        display: 'flex',
        flexWrap: 'wrap'
    },
    header: {
        width: '100%',
        height: '70px',
        borderBottom: '2px solid lightgrey',
        borderTop: '2px solid lightgrey',
        paddingBottom: '8px',
        paddingTop: '10px',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'Ubuntu',
        opacity: '.9'

    },
    font: {
        textAlignVertical: "center",// <-- the magic
        fontWeight: 'bold',
        margin: '12px',
        fontSize: 30,
        letterSpacing: '2px',
        fontFamily: 'Vernon Adams',
    },
    insideFont: {
        padding: '35px',
        fontSize: '20px',
        marginLeft: '20px',
        marginRight: '20px',
    },
    image: {
        float: 'left',
        marginLeft: '200px',
        marginTop: '20px',
    },
    img: {
        width: '200px',
        height: '200px',
        justifyContent: 'center',
        border: '2px solid white'
    },
    txtunder: {
        teextAlign: 'center',
        gridRow: '1',
        fontFamily: 'Ubuntu',
        fontSize: '18px',
        color: 'white'
    }
}));

export default function Teammates(props) {
    const styles = useStyles();
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p className={styles.font}> Our Team </p>
            </div>
        <div className={styles.image}>
            <img src={profile1} className={styles.img} />
            <p className={styles.txtunder}>
                    <b>Ashwin Mahesh</b> <br></br>
                System Architect</p>
        </div>
            <div className={styles.image}>
                <img src={profile3} className={styles.img} />
                <p className={styles.txtunder}>
                    <b>Turner Dunlop</b><br></br>
                    Systems Engineer </p>
            </div>
        <div className={styles.image}>
                <img src={profile2} className={styles.img} />
                <p className={styles.txtunder}>
                    <b>Vishva Pandya</b><br></br>
                    Software Engineer </p>
        </div>
            <div className={styles.image}>
                <img src={profile5} className={styles.img} />
                <p className={styles.txtunder}>
                    <b>Nate Venckus</b> <br></br>
                    Software Engineer</p>
            </div>
            <div className={styles.image}>
                <img src={profile4} className={styles.img} />
                <p className={styles.txtunder}>
                    <b>Arshad Alikhan</b><br></br>
                    UI Engineer </p>
            </div>
            <div className={styles.image}>
                <img src={profile6} className={styles.img} />
                <p className={styles.txtunder}>
                    <b>Richa Tenany</b><br></br> 
                    UI Engineer</p>
            </div>
     </div>
    );
}