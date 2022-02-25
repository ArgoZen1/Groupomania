// import axios from "axios";


// export const GET_COMMENTS = "GET_COMMENTS";
// export const ADD_COMMENT = "ADD_COMMENT";

// export const getComments = () => {
//     return (dispatch) => {
//         return axios 
//         .get(`${process.env.REACT_APP_API_URL}api/comment`)
//         .then((res) => {
//             console.log(res)
//             dispatch({ type: GET_COMMENTS, payload: res.data })
//         })
//         .catch((err) => console.log(err))
//     }
// }

// export const addComment = (postId, userId, message) => {
//     return (dispatch) => {
//         return axios({
//             method: "post",
//             url: `${process.env.REACT_APP_API_URL}api/comment`,
//             data: { postId, userId, message }
//     })
//     .then((res) => {
//         dispatch({ type: ADD_COMMENT, payload:  postId, userId, message  })
//     })
//     .catch((err) => console.log(err))
//     }
// }
    


