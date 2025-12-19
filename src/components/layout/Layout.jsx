import Navbar from './Navbar';
// import Footer from './Footer'; // To be created

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen font-sans text-primary">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
