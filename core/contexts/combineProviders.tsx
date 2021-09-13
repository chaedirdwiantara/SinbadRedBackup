import React from 'react';

export const combineProviders = (...providers: React.FC[]): React.FC => {
  return providers.reduce(
    (CollectedProvider, CurrentProvider) => {
      return ({ children }: React.ComponentProps<React.FC>): JSX.Element => {
        return (
          <CollectedProvider>
            <CurrentProvider>{children}</CurrentProvider>
          </CollectedProvider>
        );
      };
    },
    ({ children }) => <>{children}</>,
  );
};
