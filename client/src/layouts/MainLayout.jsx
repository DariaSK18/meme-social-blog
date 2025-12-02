import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({children}) {
    return (
        <>
            <Header/>
                <main className="main">
                    <Outlet/>
                </main>
                <main className="main">{children}</main>
            <Footer/>
        </>
    )
}