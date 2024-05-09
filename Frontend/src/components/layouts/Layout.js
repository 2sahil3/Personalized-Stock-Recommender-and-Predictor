import Footer from "./Footer.js";
import Header from "./Header.js";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Layout(props){
    return(
        <> 
        <Header/>
        <ToastContainer/>
        <main>{props.children}</main>

        <Footer/>
        </>
        
    );
}

export default Layout;