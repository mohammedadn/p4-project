import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import './HomePage.css';
import {motion} from 'framer-motion'
import NumberCounter from 'number-counter'
import Heart from '../../src/assets/heart.png'


function Home(){
    const transition={type: 'spring',duration:3}
    const transition1 = { duration: 4, ease: "easeInOut" }
    
    return (
    <div className="Home">  
     <div>

    <Navbar/>
     <motion.div className="intro" initial={{opacity:0}} animate={{opacity:1}} transition={transition1}>
<h12 className="text-heading">WELCOME TO FITNESS TRACKER.</h12>

    </motion.div>

    <div className="image-collage">
        <div className='left-r'>
            <img src="https://www.cultofmac.com/wp-content/uploads/2020/02/active-total-calories-1536x1152.jpg" alt=" 1" className="person1" />
            <img src="https://i.pinimg.com/564x/5a/5e/10/5a5e10dbd4ccc3469486caf5ed826f4d.jpg" alt=" 2" className="person2" />
            <img src="https://i.pinimg.com/564x/6b/e4/bf/6be4bfa49d0dab5e502e53f94ba89368.jpg" alt=" 3" className="person3" />
            <img src="https://i.pinimg.com/564x/43/e0/c7/43e0c7c08a9dfb0c52b158f0f8560e6c.jpg" alt=" 4" className="person4" />
      
        </div>

        <div className="right-r">
        <motion.div
                initial={{right:'-1rem'}}
                whileInView={{right:'4rem'}}
                transition={transition}
                className='heartrate'>
                    <img src={Heart} alt='' className='' />
                    <span>Heart Rate</span>
                    <span><NumberCounter end={114} start={20} delay='7' suffic="bpm" /></span>
                </motion.div>
        <h3 className='stroketext'>Fulfil your </h3><h4 className='stroketext2'>Daily needs</h4>
    
         <p className='paragraph'>1. Train faster and smarter than before</p>
                        <p className='paragraph'>2.Track your required Progress</p>
                        <p className='paragraph'>3. Reliable Partners</p>
                <p className='paragraph'>4. Over 10+ expert coaches</p>


        </div>
    </div> 

    
                   
   <div className="footer" >

            
                <div className="col-md-42">
                    <header>
                        <h5 id="call">Call Us</h5>
                    </header>
                
                    <a className="text-white" href="0705237806">
                        <span>0705237806</span>
                    </a>
                    
                    
                </div>
              
                <div className="col-md-41 " >
                    <header>
                        <h6>Business Hours</h6>
                    </header>
                    <ul>
                    <li id="num">Monday-Friday: 8:30am to 5:30pm</li>
                    <li id="num">Saturday: 9:00am to 5:00pm</li>
                    <li id="num">Sorry We are Closed On Sunday</li>
                    </ul>
                </div>

                <div className="centerFooter">
                    <h10>Follow Us:</h10>
                    <div className="icons">
                        <a href='https://www.instagram.com/'><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="https://github.com/gitaunthama"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="https://web.whatsapp.com/"><FontAwesomeIcon icon={faWhatsapp} /></a>
                    </div>
                </div>
               
                    

                    

               
            </div>
     
        </div>
    </div>    
        
    )

}
export default Home;