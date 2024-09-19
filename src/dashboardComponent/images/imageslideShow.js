"use client"
import React,{ useEffect, useState } from "react";
import {Image} from "antd";
import foddies from '@/assets/logofood.jpg';
import forku1 from '@/assets/forku1.jpg';
import ella from '@/assets/ella.jpg';
import furkuras from '@/assets/furkuras.jpg';
import reche from '@/assets/reche.jpg';
import Styles from '@/app/components/images/images.module.css';
const images=[
    {image:foddies, alt:'A delicious, juicy burger'},
    {image:forku1, alt:'A delicious, spicy curry'},
    {image:ella, alt:'Steamed dumplings'},
    {image:furkuras, alt:'a delicious pizza'},
    {image:reche, alt:'Mac and cheese'}
]

const ImageSlide =()=>{
    const [currentimageindex, setCurrentImageindex] =useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentImageindex((prev)=>prev < images.length - 1 ? prev + 1 : 0);
        },5000);
        return ()=>clearInterval(interval);

    },[])
    return(<>
        <div className={Styles.slideShow}>
            {images.map((image, index)=>{
                return <Image key={index}
                src={image.image}
                className={index === currentimageindex ? Styles.active :''}
                alt={image.alt}/>
            })}
        </div>
    </>)
}

export default ImageSlide;