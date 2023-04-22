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

    return (
        <div style={formContainerStyles}>
            {entryType == EntryType.Login ? (
                <LoginForm onUnregisteredClick={() => setEntryType(EntryType.Register)} />
            ) : (
                <RegForm />
            )}
        </div>
    );
};

export default EntryPage;
