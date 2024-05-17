import { colors } from "@mui/material";
import { create } from "domain";
import {createThemes} from "tw-colors";

const {withUt} =require("uploadthing/tw");
/** @type {import('tailwindcss').Config} */

module.exports = withUt({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '700px',
     
      'md': '800px',
      
      'lg': '1024px',
     
      'xl': '1280px',
     
      '2xl': '1536px',
     
    },
    colors: {
      gray: '#3c4852',
      primary:'#007BFF',
      transparent: 'transparent',
      white:'#fff',
      white1: '#f4f5f7',
      black: "#000",
      black2: '#1D2636',
      danger: '#f33066',
      destructive: "#F54438",
      warning: '#ff9b20',
      success: '#27b737',
      'light-green': '#7CBF2F',
      purple: '#906AD4',
      blue: '#09B9B1',
      orange: '#FF9800',
      ranking: '#FDC41F',
      grey: '#E5E8F3',
      linkedIn: '#0077b5',
      facebook: '#3b5998',
      purple2: '#9672CF',
      blue1: '#00ADFF',
      grey2: '#C0C0C0',
      grey3: '#F3F3F3',
      yellow: "#fefcbf",
    },

    animationDelay: {
      '10': '-10s',
      '20': '-20s'

    },


    extend: {
        boxShadow: {
          'custom': 'rgba(62, 28, 131, 0.1) 0px 0px 20px 0px',
          'custom-2': 'rgba(62, 28, 131, 0.15) 0px 0px 28px 0px',
            'xs' : '0px 0px 6px rgba(0, 0, 0, 0.3)',    
          
        },


       keyframes: {
         scroller : {
          '0%': {  transform: 'translateX(100%)'},
         
          '100%': {  transform: 'translateX(-100%)'}, 
         },
         
         scroller1 : {
          '0%': {  transform: 'translateX(0%)'},
         
          '100%': {  transform: 'translateX(-200%)'}, 
         } ,

         "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },

       },
      
       animation: {
        'infinity': 'scroller 20s linear infinite',
        'infinity1': 'scroller1 20s linear infinite',
        "caret-blink": "caret-blink 1.25s ease-out infinite",

},    
     
      fontFamily: {
        muli: ['muli', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [
    require("tailwind-gradient-mask-image"),
    require("tailwindcss-animation-delay"),
    createThemes({
      light: {
        gray: '#3c4852',
        primary:'#007BFF',
        transparent: 'transparent',
        white:'#fff',
        white1: '#f4f5f7',
        black: "#000",
        black2: '#1D2636',
        danger: '#f33066',
      destructive: "#F54438",
        warning: '#ff9b20',
        success: '#27b737',
        'light-green': '#7CBF2F',
        purple: '#906AD4',
        blue: '#09B9B1',
        orange: '#FF9800',
        ranking: '#FDC41F',
        grey: '#E5E8F3',
        linkedIn: '#0077b5',
        facebook: '#3b5998',
        purple2: '#9672CF',
        blue1: '#00ADFF',
        grey2: '#C0C0C0',
        grey3: '#F3F3F3',
        yellow: "#fefcbf",
      }, 
      dark: {
        gray: '#3c4852',
        primary:'#007BFF',
        transparent: 'transparent',
        white:'#0A0F1A',
        white1: '#1D2636',
        black: "#F4F5F7",
        black2: '#000',
        danger: '#f33066',
        destructive: "#F54438",
        warning: '#ff9b20',
        success: '#27b737',
        'light-green': '#7CBF2F',
        purple: '#906AD4',
        blue: '#09B9B1',
        orange: '#FF9800',
        ranking: '#FDC41F',
        grey: '#ccc',
        linkedIn: '#0077b5',
        facebook: '#3b5998',
        purple2: '#9672CF',
        blue1: '#00ADFF',
        grey2: '#C0C0C0',
        grey3: '#F3F3F3',
        yellow: "#fefcbf",
      },

    }, {
      defaultTheme: 'light'
    })

  ],
});

