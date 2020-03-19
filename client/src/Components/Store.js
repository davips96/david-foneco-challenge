import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();

const initState = {
    commentData: []
};

function reducer (state, action) {
    switch (action.type) {
        case 'RECEIVE_ALL_COMMENTS':
            return {
                commentData: action.payload
            };
        case 'RECEIVE_COMMENT':
            const {username, email, postdate, msg} = action.payload;
            return {
                ...state,
                commentData: [
                    ...state.commentData,
                    {
                        username,
                        email,
                        postdate,
                        msg
                    }
                ]
            };
        default:
            return state;
    }
}

let socket;

function postCommentAction(value) {
    if (!socket.disconnected) {
        socket.emit('post comment', value);
    }
}

export default function Store(props) {

    const [comments, dispatch] = React.useReducer(reducer, initState);

    if (!socket) {
        socket = io();

        socket.on('display all comments', (value) => {
            dispatch({type: 'RECEIVE_ALL_COMMENTS', payload: value})
        });

        socket.on('display comment', (value) => {
            dispatch({type: 'RECEIVE_COMMENT', payload: value});
        });
    }

    return (
        <CTX.Provider value={{comments, postCommentAction}}>
            {props.children}
        </CTX.Provider>
    )
}