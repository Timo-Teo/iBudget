import Header from "../components/layout/Header";
import '../styles/ibudget.css'
import Footer from "../components/layout/Footer";

const Ibudget = () => {
    return (
        <>
            <Header></Header>

            <section className="info-cards">
                <div className="info-cards__card">
                    <img src="/img/img-card-1.svg" alt=""/>
                    <div className="info-cards__card--container-text">
                        <div>
                            <h3 className="info-cards__card--title">La administración del dinero es una de las partes
                                más
                                importantes de su vida financiera.</h3>
                            <p className="info-cards__card--text">
                                Saber cómo preparar un presupuesto, cómo gastar y cómo ahorrar puede ayudarle a alcanzar
                                sus
                                metas financieras, a librarse de las deudas y a aumentar sus ahorros.</p>
                        </div>
                        <button className="info-cards__card--btn">Ir</button>
                    </div>
                </div>

                <div className="info-cards__card">
                    <img src="/img/img-card-2.svg" alt=""/>
                    <div className="info-cards__card--container-text">
                        <div>
                            <h3 className="info-cards__card--title">El presupuesto nos permite saber cuáles son nuestros
                                ingresos y gastos en un tiempo determinado</h3>
                            <p className="info-cards__card--text">
                                Conocer cuánto podemos destinar al ahorro, identificar en qué gastamos nuestro dinero,
                                cuánto necesitamos para cubrir nuestras necesidades, determinar en qué está gastando de
                                más
                                y tomar medidas.</p>
                        </div>
                        <button className="info-cards__card--btn">Ir</button>
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </>
    );
}

export default Ibudget;

