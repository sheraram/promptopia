import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/global.css';

export const metadata = {
  title: 'Promptia',
  description: 'Discover & Share AI Prompts'
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
      </body>
      <Provider>
        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </html>
  );
};

export default RootLayout;
