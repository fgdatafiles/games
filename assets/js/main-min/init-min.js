import*as THREE from"./../vendor/Threejs/r105/build/three.module.js";import{Preloader}from"./preloader-min.js";export const initController=function(){return{build:function(){let e=.01*window.innerHeight;container.style.setProperty("--vh",`${e}px`),window.addEventListener("resize",function(){e=.01*window.innerHeight,container.style.setProperty("--vh",`${e}px`)}),Preloader.build()}}}();