import '../../styles/Header.css'
import Logueo from "../Logueo";
import {useState} from "react";
import Login from "../../pages/login";
import {BrowserRouter} from "react-router-dom";


const Header = () => {

    const [currentPage, setCurrentPage] = useState('home');

    function renderPage() {
        if (currentPage === 'login') {
            console.log('login')
            return (
                <div className="card-img-overlay">
                    <div className="modal-content">
                            <Logueo></Logueo>
                    </div>
                </div>
            )
        }
    }

    return (
        <>

            <header className="header">
                <nav className="navbar">
                    <div className="logo">
                        <img src="/img/img-logo-ibudget.svg" alt="ibudget" border="0"/>
                    </div>

                    <ul className="links">
                        <li><a href="#">Acerca de nosotros</a></li>
                        <li><a href="#">Regístrate</a></li>
                        <li>
                            <button className="btn-login" onClick={() => setCurrentPage('login')}>
                                Iniciar Sesión
                                <img alt='' src="/icons/i-user.svg"/>
                            </button>
                        </li>
                    </ul>
                </nav>
                <section className="info">
                    <div className="info__ibudget">
                        <h1 className="info__ibudget--title">iBudget</h1>
                        <p className="info__ibudget--text">Administrar dinero es algo que cualquiera puede hacer</p>
                        <p className="info__ibudget--text-start">¡Conviértete en un experto con nosotros!</p>
                        <button className="info__ibudget--btn" onClick={() => {
                            return (
                                <Logueo/>
                            )
                        }
                        }>
                            Empezar
                            <img src="" alt=""/>
                        </button>
                    </div>
                    <div className="info__img">
                        <img src="/img/img-banner.svg" alt=""/>
                    </div>

                </section>
                {renderPage()}
            </header>
        </>
    )
}

export default Header
