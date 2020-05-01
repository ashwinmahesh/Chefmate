import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        textAlign: 'left',
        marginLeft: '100px',
        minWidth: '30px',
        display: 'block',
    },
    vid: {
        height: '95px',
        width: '150px',
        paddingTop: '15px'
        
    },
    underline: {
        textDecoration: 'none'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '17pt',
        textAlign: 'left',
        margin: '0',
        marginTop: '20px',
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            color: 'rgb(210,107,107)',
            textDecoration: 'underline'
        }
    },
    link: {
        fontSize: '13pt',
        textAlign: 'left',
        padding: '3px',
        textDecoration: 'italic',
        color: 'darkgreen'
    },
    font: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: 'rgb(40,40,40)',
    },
    subtitle: {
        fontStyle: 'italic',
    },
    content: {
        display: 'flex',
    },
    description:{
        paddingLeft: '10px',
        width: '700px',
        color: 'grey'

    }
}));

export default function Youtube() {
    const styles = useStyles();
    return (
        <div>
        <div className={styles.wrapper}>
            <a className={styles.underline} href= 'https://youtu.be/a03U45jFxOI'>
                <Typography className={styles.title}> Butter Chicken - YouTube</Typography>
                <Typography className={styles.link}>https://youtu.be/a03U45jFxOI > watch</Typography>
            </a>
            <div className={styles.content}>
                <iframe className={styles.vid} src="https://www.youtube.com/embed/a03U45jFxOI" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <p className={styles.description}> <b>March 22, 2016 - Uploaded by Get Curried</b> <br></br>

                Learn how to make Butter Chicken, a heavenly chicken gravy recipe by Chef Varun Inamdar.
                Butter Chicken is probably one of the most popular Indian chicken 
                recipes liked by all & hence chef Varun Inamdar brings to your kitchen, 
                your favorite delicacy from the restaurant. So watch and learn how to make 
                butter chicken at home only on Get Curried. </p>
            </div>
        </div>
        <div className={styles.wrapper}>
            <a className={styles.underline} href= 'https://youtu.be/a03U45jFxOI'>
                    <Typography className={styles.title}> Dilliwala Butter Chicken Recipe | Cooksmart | Sanjeev Kapoor Khazana - YouTube</Typography>
                    <Typography className={styles.link}>https://youtu.be/a03U45jFxOII > watch</Typography>
            </a>
            <div className={styles.content}>
                    <iframe className={styles.vid} src="https://www.youtube.com/embed/E9bSLVgw0qI" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <p className={styles.description}> <b>March 17, 2017 - Uploaded by Sanjeev Kapoor Khazana</b> <br></br>
                    Chef Sanjeev Kapoor shows you how to make a classic Delhi style butter 
                    chicken from scratch. Rich and creamy, with just the perfect amount of 
                    spices and succulent pieces of grilled chicken - this recipe is fool proof. 
                    Have it with crisp tondoori or thin rumali rotis for a taste of food heaven.  </p>
            </div>
        </div>
            <div className={styles.wrapper}>
                <a className={styles.underline} href='https://youtu.be/JKs-cRneTyE'>
                    <Typography className={styles.title}> Butter Chicken Recipe | Jamie & Maunika - YouTube</Typography>
                    <Typography className={styles.link}>https://youtu.be/JKs-cRneTyE > watch</Typography>
                </a>
                <div className={styles.content}>
                    <iframe className={styles.vid} src="https://www.youtube.com/embed/JKs-cRneTyE" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <p className={styles.description}> <b>August 3, 2014 - Uploaded by Sanjeev Kapoor Khazana</b> <br></br>
                    Jamie introduces the wonderful Maunika Gowardhan to the Food Tube family with a bang, 
                    as she teaches him how to master the most delicious and tender Indian butter chicken recipe. Recreate the tandoor feel 
                    right in your own home. This'll certainly make you think twice before getting take out...
                    It's not often you see Jamie being taught recipes on Food Tube, but this perfect method blew his 
                    socks off, it really is a must!  </p>
                </div>
            </div>
            <div className={styles.wrapper}>
                <a className={styles.underline} href='https://youtu.be/HMfUsS9zeuw'>
                    <Typography className={styles.title}> The BEST Chicken Tikka Masala - YouTube</Typography>
                    <Typography className={styles.link}>https://youtu.be/HMfUsS9zeuw > watch</Typography>
                </a>
                <div className={styles.content}>
                    <iframe className={styles.vid} src="https://www.youtube.com/embed/HMfUsS9zeuw" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <p className={styles.description}> <b>December 16, 2016 - Uploaded by Sanjeev Kapoor Khazana</b> <br></br>
                    Chicken Tikka Masala is one of my favourite dishes, and this recipe 
                    is the bomb! Everything is made in the same pan, so the flavour of the 
                    meat transfers into the curry making for a meaty, rich, and creamy sauce 
                    that is to die for. This is one of those recipes that I guarantee you'll 
                    make again and again for years to come :)  </p>
                </div>
            </div>
        </div>
    );
}
