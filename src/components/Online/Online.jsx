import './Online.css';

import { useEffect, useState } from 'react';

import { PiDotsNineBold } from "react-icons/pi";

import axios from 'axios';

const BACKEND = import.meta.env.VITE_REACT_APP_API_URL;



function OnlineUser({ user }) {

    return (

        <div className='user-cards'>

            <div className="user-card">

                <p className='online-sign'></p>

                {
                    user.photo && <img className="user-photo" src={user.photo} alt={user.name} />
                }

            </div>

            {/* <p className='user-name'>{user.username}</p> */}
        </div>
    );
}



export default function Online() {


    const [clicked, setClicked]=useState(false);

    const [users, setUsers] = useState(false);



    useEffect(() => {

        async function getOnlineUsers() {

            try {

                const response = await axios.get(`${BACKEND}/online-users`);

                if (!response.data.success) {

                    throw new Error(response.data.message);
                }

                console.log("AA RAHA HI: ", response.data.users);

                setUsers(response.data.users);

            } catch (e) {

                console.log(e);
            }
        }

        getOnlineUsers();

    }, []);



    if (clicked) {

        return (

            <div className="user-list"  onClick={(prev)=>setClicked(!clicked)}>

                {
                    users.map((user, index) => (

                        <OnlineUser key={index} user={user} />
                    ))
                }
            </div>
        )

    } else {

        return (

            <div className='clicked' onClick={(prev)=>setClicked(!clicked)} >
                <PiDotsNineBold />
            </div>
        )
    }
}
