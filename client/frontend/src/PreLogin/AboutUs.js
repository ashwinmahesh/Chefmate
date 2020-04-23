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
        minHeight: '100vh'
    },
    header: {
        width: '100%',
        height: '80px',
        marginTop: '10px',
        backgroundColor: '#FFCCCB',
    
    },
    font: {
        textAlignVertical: "center",// <-- the magic
        fontWeight: 'bold',
        fontSize: 30,
        paddingTop: '20px',
        letterSpacing: '2px'
    },
   
    insideFont: {
        padding: '30px',
        fontSize: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        
    },
    image: {
        float: 'left',
        marginLeft: '40px',
        marginTop: '150px',
    },
    img: {
        width: '300px',
        height: '300px',
    },
    txtunder: {
        teextAlign: 'center',
        gridRow: '1',
        

    }
}));

export default function AboutUs(props) {
    const styles = useStyles();
    

    return (
         <div className={styles.wrapper}>
                <div className={styles.header}>
                   <p className={styles.font}> What we do </p>
                    <p className={styles.insideFont}> 
                        ChefMate is a web application that will allow users to search for recipes across popular <br></br>
                        cooking websites and display results ranked according to their preferences. 
                    </p>
            </div>
                <div className={styles.image}>
                <img src={img4} className={styles.img} />
                <p className={styles.txtunder}> 
                We have be ranked and recommended <br>
                </br> recipes to our users according to sites that <br>
                </br> they frequently visit through our engine.<br>
                </br>Traditional search engines have seeds <br>
                </br>throughout the entire internet, whereas <br>
                </br>ours has only be popular cooking sites, <br>
                </br>thus we've created a better cooking<br>
                </br> related search engine to engance user<br>
                </br>experience. </p></div>

            <div className={styles.image}>
                <img src={img1} className={styles.img} />
                <p className={styles.txtunder}> 
                After retrieving all the relevant documents <br>
                </br> containing parts of the query search, we <br>
                </br> calculated each page’s metric using <br>
                </br>each individual page’s hub and authority <br>
                </br>scores in relation to the query. Furthermore,<br>
                </br> we calculated the page rank for the <br> 
                </br> retrieved documents and return the <br>
                </br>best ranked pages. </p> </div>

            <div className={styles.image}>
                <img src={img3} className={styles.img} />
                <p className={styles.txtunder}> 
                Not only do we provide users with <br>
                </br> recipes, but we also show them video <br>
                </br>  tutorials on how to make certain <br>
                </br>  recipes and allow them to download <br>
                </br> their recipes as PDFs to their <br>
                </br>  computers. We are focused on making <br>
                </br>  the user have a great  experience.  <br>
                </br>
                </p> </div>

            <div className={styles.image}>
                <img src={img2} className={styles.img} />
                <p className={styles.txtunder}> 
                We enabled users to like and dislike <br></br> 
                their pages and created appropriate UI <br>
                </br> to showthem their results. We also display <br>
                </br> a history of their recently searched items.<br>
                </br> If we do not recognize an item, we <br>
                </br> suggest them an item to help their search.
                </p></div>  
         </div>
           
    );
}
