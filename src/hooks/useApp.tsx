
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useApp = () => {
    const context = useContext(AppContext)

    if (!context) throw new Error('App context must be use inside App Provider');

    return context;
};

export default useApp