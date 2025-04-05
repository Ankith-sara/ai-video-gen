"use client";

import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '@/configs/firebaseConfig';

function Authentication({ children }) {
    const provider = new GoogleAuthProvider();

    const onSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log('Signed in user:', user);
            })
            .catch((error) => {
                console.error('Error signing in:', error.message);
            });
    };

    return (
        <div onClick={onSignIn}>
            {children}
        </div>
    );
}

export default Authentication;
