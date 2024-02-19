import './Online.css';

import { useEffect, useState } from 'react';

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

            <p className='user-name'>{user.username}</p>
        </div>
    );
}



export default function Online() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        async function getOnlineUsers() {

            try {

                const response = await axios.get(`${BACKEND}/online-users`);

                if (!response.data.success) {

                    throw new Error(response.data.message);
                }

                console.log("AA RAHA HI: ",response.data.users);

                setUsers(response.data.users);

            } catch (e) {

                console.log(e);
            }
        }

        getOnlineUsers();

    }, []);

    return (

        <div className="user-list">

            {
                users.map((user, index) => (

                    <OnlineUser key={index} user={user} />
                ))
            }
        </div>
    );
}
