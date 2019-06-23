import React from 'react';

const ApiContext = React.createContext({});

export const ApiProvider = ApiContext.Provider;
export const ApiConsumer = ApiContext.Consumer;
export default ApiContext;
