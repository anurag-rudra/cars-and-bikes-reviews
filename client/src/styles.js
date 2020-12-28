// this is the CSS file for App.js which is the main container component of the React app

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles( (theme)  => ({ // styles resource makeStyles is imported in the App.js file 
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
    heading: {
    color: 'rgba(0,183,255, 1)',
    },
    image: {
    marginLeft: '15px',
    },
    [theme.breakpoints.down('sm','xs')]: { //run the below code only for small devices 'sm'
      mainContainer: {
        flexDirection: "column-reverse"
      }
    } 
   
}));