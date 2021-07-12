import React,{useState} from "react";
import {NavLink} from "react-router-dom"
// import {useHistory } from "react-router-dom";
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Divider from '@material-ui/core/Divider';
// import Drawer from '@material-ui/core/Drawer';
// import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import MenuIcon from '@material-ui/icons/Menu';
// import Toolbar from '@material-ui/core/Toolbar';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
// import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
// import KitchenRoundedIcon from '@material-ui/icons/KitchenRounded';
// import RestaurantMenuRoundedIcon from '@material-ui/icons/RestaurantMenuRounded';
// import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
// import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';
import "./Navbar.css";

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   drawer: {
//     [theme.breakpoints.up('sm')]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   appBar: {
//     [theme.breakpoints.up('sm')]: {
//       width: `calc(100% - ${drawerWidth}px)`,
//       marginLeft: drawerWidth,
//     },
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

// function Navbar(props) {  
//   const { window } = props;
//   const classes = useStyles();
//   const theme = useTheme();
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const history = useHistory();

//   const routeChange = (path) =>{ 
//       history.push(path);
//   }

//   const drawer = (
//     <div>
//       <div style={{background:'blue'}} className={classes.toolbar}></div>
//       <Divider />
//       <List>
//         {['Anasayfa', 'Malzemeler', 'Raporlar', 'Menu', 'Misafirler'].map((text, index) => (
//           <ListItem onClick={()=>routeChange(text)} button key={text}>
//             <ListItemIcon >{
//             index === 0 ? <HomeRoundedIcon/> 
//             : index === 1 ? <KitchenRoundedIcon/>
//             : index === 2 ? <AssignmentRoundedIcon/>
//             : index === 3 ? <RestaurantMenuRoundedIcon/>
//             :  <PersonAddIcon/>}
//             </ListItemIcon>  
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <div className="configuration_list_items">
//       <List>
//         {['Ayarlar', 'Müşteri Hizmetleri'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <SettingsRoundedIcon /> : <HelpOutlineRoundedIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       </div>
//     </div>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar style={{ color:'blue',background: '#ffffff' }} position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             className={classes.menuButton}
//           >
//             <MenuIcon />
//           </IconButton>

//         </Toolbar>
//       </AppBar>
//       <nav className={classes.drawer} aria-label="mailbox folders">
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Hidden smUp implementation="css">
//           <Drawer
//             container={container}
//             variant="temporary"
//             anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             ModalProps={{
//               keepMounted: true, // Better open performance on mobile.
//             }}
//           >
//             {drawer}
//           </Drawer>
//         </Hidden>
//         <Hidden xsDown implementation="css">
//           <Drawer
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             variant="permanent"
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Hidden>
//       </nav>
      
//         <div className={classes.toolbar} />
            
      
//     </div>
//   );
// }

function Navbar(){

  var initialToggleValue = false;
  const [isToggle,setIsToggle] = useState(initialToggleValue);
  const [activeButton,setActiveButton] = useState(6);

  return (
    <div className={isToggle === false ? "navbar-body" : "navbar-body body-pd"} id="body-pd">
    {console.log(activeButton)}
      <div>
        <header className={isToggle === false ? "header": "header body-pd"} id="header">
            <div onClick={()=> setIsToggle(initialToggleValue => !initialToggleValue)} className="header__toggle">
                <i className={isToggle === false ? "bx bx-menu" : "bx bx-menu bx-x"} id="header-toggle"></i>
            </div>
            <div className="header-user">
              <p>Prof Dyt Ozlem Dinc</p>
              <div className="header__img">
                    <img src="https://media-exp1.licdn.com/dms/image/C4E03AQGVeQxbwzSn1w/profile-displayphoto-shrink_800_800/0/1606858817584?e=1631750400&v=beta&t=7AjndoreYtHZG30SjLzARChgcsDldWIfTDkjAIjAOfc" alt=""/>
              </div>
            </div>
        </header>

        <div className={isToggle === false ? "l-navbar" : "l-navbar show"} id="nav-bar">
              <nav className="nav">
                  <div>
                      <a href="Anasayfa" className="nav__logo">
                          <i className='bx bxs-heart nav__logo-icon'></i>
                          <span className="nav__logo-name">Dietry</span>
                      </a>

                      <div className="nav__list">
                          <NavLink exact to="Anasayfa" className="nav__link">
                          <i className='bx bx-grid-alt nav__icon' ></i>
                              <span className="nav__name">Anasayfa</span>
                          </NavLink>

                          <NavLink exact to="Malzemeler" className="nav__link">
                              <i className='bx bx-fridge nav__icon' ></i>
                              <span className="nav__name">Malzemeler</span>
                          </NavLink>
                          
                          <NavLink exact to="Raporlar" className="nav__link">
                              <i className='bx bxs-report nav__icon' ></i>
                              <span className="nav__name">Raporlar</span>
                          </NavLink>

                          <NavLink exact to="Menu" className="nav__link">
                              <i className='bx bx-food-menu nav__icon' ></i>
                              <span className="nav__name">Menu</span>
                          </NavLink>

                          <NavLink exact to="Misafirler" className="nav__link">
                              <i className='bx bx-user nav__icon' ></i>
                              <span className="nav__name">Misafirler</span>
                          </NavLink>

                          {/* <NavLink exact to="#" className="nav__link">
                              <i className='bx bx-bar-chart-alt-2 nav__icon' ></i>
                              <span className="nav__name">Analytics</span>
                          </NavLink>  */}
                      </div>
                  </div>

                  <a href="#" className="nav__link">
                      <i className='bx bx-log-out nav__icon' ></i>
                      <span className="nav__name">Log Out</span>
                  </a>
              </nav>
          </div>
      </div>
    </div>
    
  )  
}
export default Navbar;