import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

function ProfilePage() {
    const userState = useSelector((state: RootState) => state.user);
    return <div style={{ flex: 1 }}>ProfilePage</div>;
}

export default ProfilePage;
