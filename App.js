// App.js
import React from 'react';
import RootNavigation from './src/navigation';
import { AuthProvider } from './contexts/AuthContext';
const App = () => {

    return( 
    <AuthProvider>
    <RootNavigation />
    </AuthProvider>
    );
};

export default App;
