import { useCallback, useState } from 'react';
import Storage from './Storage';

export default function UseStorage(key) {
    const [state, setState] = useState(() => Storage.get(key));

    const set = useCallback(newValue => {
        Storage.set(key, newValue);
        setState(newValue);
    }, [key]);

    const remove = useCallback(() => {
        Storage.remove(key);
        setState(undefined);
    }, [key]);

    return [state, set, remove];
}