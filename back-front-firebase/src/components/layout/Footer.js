import '../../styles/Footer.css'

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <img src="/icons/i-isotipo-ibudget.svg" alt="ibudget"/>
                <div className="footer__container">
                    <div className="footer__container--info">
                        <b>iBudget</b>
                        <p>Administrar dinero es algo que cualquiera puede hacer
                            ¡Conviértete en un experto con nosotros!
                            Somos una empresa que se dedica a la administración de dinero, con el fin de ayudar a las
                            personas a mejorar su calidad de vida.
                            Únete a nosotros y convíertete en un experto en administración de dinero.
                        </p>
                    </div>
                    <div className="footer__container--oficinas">
                        <b className="subtitulo">Oficinas</b>
                        <p>Quito - Ecuador, Ladrón de Guevara</p>
                        <p>022564645 - 099256897</p>
                        <p>ibudget@info.com</p>
                    </div>
                    <div className="footer__container--redes">
                        <b>Redes Sociales</b>
                        <div className="footer__container--redes--icons">
                            <img src="" alt=""/>
                            <a>linkedin.com/in/ibudget</a>
                        </div>
                        <div className="footer__container--redes--icons">
                            <img src="" alt=""/>
                            <a>facebook.com/ibudget</a>
                        </div>
                        <div className="footer__container--redes--icons">
                            <img src="" alt=""/>
                            <a>twitter.com/ibudget</a>
                        </div>
                        <div className="footer__container--redes--icons">
                            <img src="" alt=""/>
                            <a>instagram.com/ibudget</a>
                        </div>

                    </div>
                </div>
                <hr/>
                <p className="text-center">iBudget ® JENIMO 2022</p>
            </footer>
        </>
    )
}

export default Footer