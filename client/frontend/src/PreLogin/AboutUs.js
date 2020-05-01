import React, { useState, useEffect, Component } from 'react';
import { ScrollTo } from "react-scroll-to";
import LoginBox from '../Login/LoginBox';
import { Redirect } from 'react-router-dom';
import HomepageBackground from '../Login/HomepageBackground';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import img1 from '../images/img1.jpeg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import img4 from '../images/img4.jpg';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: '#38698e',
        opacity: '.9',
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: '18px',
        justifyContent: 'center'
    },
    header: {
        width: '100%',
        height: '100px',
        paddingBottom: '20px',
        paddingTop: '3px',
        backgroundColor: 'black',
        color: 'white',
        border: '2px solid white',

    },
    font: {
        textAlignVertical: "center",// <-- the magic
        fontWeight: 'bold',
        fontSize: 30,
        paddingTop: '20px',
        paddingBottom: '10px',
        letterSpacing: '2px',
        color: 'white'

    },
    insideFont: {
        fontSize: '27px',
        marginLeft: '20px',
        marginRight: '20px',
        fontFamily: 'Ubuntu',
        fontWeight: 'bold',
        letterSpacing: '1px',
        color: 'white'
    },
    image: {
        float: 'left',
        marginTop: '50px',
        padding: '15px'
    
        
    },
    img: {
        width: '300px',
        height: '300px',
        borderColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '2px'

    },
    txtunder: {
        teextAlign: 'center',
        gridRow: '1',
        fontFamily: 'Ubuntu',
        color: 'white',
        fontSize: '17px',
        width: '300px'

    }
}));

export default function AboutUs(props) {
    const styles = useStyles();
    return (
         <div className={styles.wrapper}>
                <div className={styles.header}>
                    <p className={styles.insideFont}> 
                        ChefMate is a web application that will allow users to search for recipes across popular <br></br>
                        cooking websites and display results ranked according to their preferences. 
                    </p>
                 </div>
                <div className={styles.image}>
                <img src={img4} className={styles.img} />
                <p className={styles.txtunder}> 
                We have be ranked and recommended
                recipes to our users according to sites that 
                they frequently visit through our engine
                Traditional search engines have seeds
                throughout the entire internet, whereas
                ours has only the popular cooking sites,
                thus we've created a better cooking
                related search engine to enhance user
                experience. </p></div>
            <div className={styles.image}>
                <img src={img1} className={styles.img} />
                <p className={styles.txtunder}> 
                After retrieving all the relevant documents
                 containing parts of the query search, we
                 calculated each page’s metric using
                each individual page’s hub and authority 
                scores in relation to the query. Furthermore,
                we calculated the page rank for the  
                retrieved documents and return the
                best ranked pages. </p> </div>
            <div className={styles.image}>
                <img src={img3} className={styles.img} />
                <p className={styles.txtunder}> 
                Not only do we provide users with
                recipes, but we also show them video
                tutorials on how to make certain 
                recipes and allow them to download 
                their recipes as PDFs to their
                computers. We are focused on making 
                the user have a great  experience. 
                </p> </div>
            <div className={styles.image}>
                <img src={img2} className={styles.img} />
                <p className={styles.txtunder}> 
                We enabled users to like and dislike
                their pages and created appropriate UI 
                to show them their results. We also display
                 a history of their recently searched items.
                 If we do not recognize an item, we 
                 suggest them an item to help their search.
                </p></div>  
         </div>
           
    );
}
