import React, { useState } from 'react';
import LoginForm from '../../components/Form/LoginForm';
import { EntryType } from './EntryPageTypes';
import RegForm from '../../components/Form/RegForm';

const EntryPage = () => {
    const [entryType, setEntryType] = useState(EntryType.Login);

    return entryType == EntryType.Login ? (
        <LoginForm onUnregisteredClick={() => setEntryType(EntryType.Register)} />
    ) : (
        <RegForm />
    );
};

export default EntryPage;
