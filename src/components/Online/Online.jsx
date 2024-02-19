import { useEffect, useState } from 'react';

import './Online.css';
import axios from 'axios';


const BACKEND = import.meta.env.VITE_REACT_APP_API_URL;


export default function Online() {


    const [onlineUsers, setOnlineUsers] = useState(null);


    async function getOnlineUsers() {

        try {

            const response = await axios.get(`${BACKEND}/online-users`);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            console.log(response.data.onlineUsers);

            setOnlineUsers(response.data.onlineUsers);

        } catch (e) {

            console.log(e);
        }
    }

    useEffect(() => {

        getOnlineUsers();

    }, []);


    return (

        <div className="user-list">


            {
                onlineUsers &&
                onlineUsers.map((user, index) => (

                    <div className="user-card" key={index}>

                        <p className='online-sign'></p>

                        {
                            user.photo &&
                            <img className="user-photo" src={user.photo} alt={user.name} />
                        }
                    </div>

                ))
            }
        </div>
    );
}
