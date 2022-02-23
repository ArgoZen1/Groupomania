import React, { useEffect, useState } from 'react';
import { UidContext } from './components/AppContext';
import Routes from "./components/Routes"
import axios from 'axios';
import { useDispatch } from "react-redux";
import { getUser } from './actions/user.actions';

const App = () => {
    const [uid, setUid] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // on se stock l'id de notre utilisateur
        const fetchToken = async () => {


            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true
            })
                .then((res) => {
                
                setUid(res.data);
                })
                
                .catch((err) => console.log("no token"))
        }
        fetchToken();
// à partir du moment ou on a l'id, on rentre dans la condition
   if (uid) dispatch(getUser(uid));
    }, [uid]); // on met un callback pour que la fonction ne soit pas joué à l'infini

    return (
        <UidContext.Provider value={uid}>
            <Routes />
        </UidContext.Provider>
    );
};

export default App;