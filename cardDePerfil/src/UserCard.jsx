import './index.css'
import Socials from './Socials';

function UserCard({name, role, image, bio}){
    return(
        <div className="card">
            <div className="banner"></div>
            <img src={image} alt="profile picture" className='profile-pic'/>
            <h3>{name}</h3>
            <div className="info">
                <h4>{role}</h4>
                <div className="line"></div>
                <Socials />
                <p className='bio'><br />{bio}</p>
            </div>
            <div className="socials"></div>
        </div>
        
    );
}

export default UserCard