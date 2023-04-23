import { CSSProperties, useState } from 'react';
import LoginForm from '../../components/Form/LoginForm';
import { EntryType } from './EntryPageTypes';
import RegForm from '../../components/Form/RegForm';
import { useAppDispatch } from '../../../store';
import { registerUser, loginUser } from '../../../reducers/user/userSlice';
import { ILoginRequest, IRegisterRequest } from '../../../models/api/auth';

const formContainerStyles: CSSProperties = {
    flex: 1,
    position: 'relative',
};

const EntryPage = () => {
    const [entryType, setEntryType] = useState(EntryType.Login);
    const dispatch = useAppDispatch();

    const handleLogin = (data: object) => {
        console.log('Login with data', data);
        dispatch(loginUser(data as ILoginRequest));
    };

    const handleRegister = (data: object) => {
        console.log('Register with data', data);
        dispatch(registerUser(data as IRegisterRequest));
    };

    return (
        <div style={formContainerStyles}>
            {entryType == EntryType.Login ? (
                <LoginForm
                    onSubmit={handleLogin}
                    onUnregisteredClick={() => setEntryType(EntryType.Register)}
                />
            ) : (
                <RegForm onSubmit={handleRegister} />
            )}
        </div>
    );
};

export default EntryPage;
