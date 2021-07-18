import{Index}from"./index-min.js";import{HomeSliderInteraction}from"./homeSliderController-min.js";import{HomeSlider}from"./homeSlider-min.js";import{cameraController}from"./camera-min.js";import{mousemoveController}from"./mousemove-min.js";import{Info}from"./info-min.js";import{Route}from"./route-min.js";import{devicemotionController}from"./devicemotion-min.js";export const ButtonizeController=function(){let e,o;const t=document.querySelector("#infoButton"),n=document.querySelector("#infoButtonHover");let r;const a=document.querySelector("#container"),i=document.querySelectorAll(".homeSlide"),l=document.querySelector("#container"),m=document.querySelector("#logo"),c=document.querySelector("#sliderNav");function s(){TweenMax.killTweensOf(t),TweenMax.to(t,1,{opacity:0,y:50,rotation:-4,onComplete:function(){infoButton.classList.add("displayNone")}})}return{build:function(){o=Index.getPlanes(),e=cameraController.camera(),infoButton.addEventListener("mouseup",function(e){TweenMax.to(a,.5,{opacity:0}),r=HomeSliderInteraction.getCurrentSlide(),HomeSlider.getSliderData()[r].hide(),Info.show(),mousemoveController.setSize(2),devicemotionController.setSize(2),Route.setCurrentPageId(1);let o=cameraController.getCameraVectors();o.lookatTargetX=0,o.cameraTargetZ=.1,Index.getIsMobile(),TweenMax.to(m,.3,{opacity:1}),cameraController.setCameraVectors(o),TweenMax.to(n,.3,{height:0}),c.classList.add("displayNone"),s()},!1),infoButton.addEventListener("mouseenter",function(e){TweenMax.to(i,.3,{opacity:0}),TweenMax.to(l,1,{opacity:.2}),TweenMax.to(m,.3,{opacity:0}),TweenMax.to(c,.3,{opacity:0});let o=cameraController.getCameraVectors();o.lookatTargetX=0,o.cameraTargetZ=.1,Index.getIsMobile(),cameraController.setCameraVectors(o),TweenMax.to(n,1,{width:112,height:10})},!1),infoButton.addEventListener("mouseleave",function(e){if(1==Route.getCurrentPageId())return;1==Index.getIsMobile()?TweenMax.to(l,.3,{opacity:.5}):TweenMax.to(l,.3,{opacity:1}),TweenMax.to(i,.3,{opacity:1}),TweenMax.to(c,.3,{opacity:1}),TweenMax.to(m,.3,{opacity:1});let o=cameraController.getCameraVectors();o.cameraTargetZ=1,o.lookatTargetX=HomeSlider.getlastLookatTargetX(),cameraController.setCameraVectors(o),TweenMax.to(n,1,{height:0})},!1)},infoButtonShow:function(){TweenMax.killTweensOf(t),infoButton.classList.remove("displayNone"),TweenMax.to(t,0,{y:50,rotationZ:-4}),TweenMax.to(t,1,{opacity:1,y:0,rotationZ:0})},infoButtonHide:function(){s()}}}();