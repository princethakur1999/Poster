import User from './../models/user.js';
import Online from './../models/online.js';


export async function userData(req, res) {

    try {

        const { username } = req.params;

        console.log("username: ", username);

        if (!username) {

            return res.status(400).json({

                success: false,
                message: "Username is required"
            });
        }


        const user = await User.findOne({ username }).populate({ path: 'posts', options: { sort: { createdAt: -1 } } }).exec();

        if (!user) {

            return res.status(404).json({

                success: false,
                message: 'User not found'
            });
        }

        delete user.password;

        console.log("user:", user);

        return res.status(200).json({

            success: true,
            message: 'Here are the user details',
            user
        })

    } catch (e) {

        console.error(e);

        return res.status(500).json({

            success: false,
            message: e.message || 'Server Error'
        });

    }
}


export async function getOnlineUsers(req, res){

    try{


        const onlineUsers = await Online.find({status:true});

        if(!onlineUsers){

            return  res.status(404).json({

                success:false,
                message: "No user is online"
            })
        }

        console.log('online users: ', onlineUsers);



        return res.status(200).json({
            success:true,
            users: onlineUsers
        })


    }catch(e){


        console.error(e);

        return res.status(500).json({

            success: false,
            message: e.message || 'Server Error'
        });

    }
}