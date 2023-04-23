import { CSSProperties, useState } from 'react';
import LoginForm from '../../components/Form/LoginForm';
import { EntryType } from './EntryPageTypes';
import RegForm from '../../components/Form/RegForm';

const formContainerStyles: CSSProperties = {
    flex: 1,
    position: 'relative',
};

const EntryPage = () => {
    const [entryType, setEntryType] = useState(EntryType.Login);

    const handleLogin = (data: object) => {
        console.log('Login with data', data);
    };

    const handleRegister = (data: object) => {
        console.log('Register with data', data);
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
