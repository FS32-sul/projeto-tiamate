import Banner from "../components/Banner";
import banner from "../assets/banner-1.png";
import banner2 from "../assets/banner-2.png";
import Introducao from "../components/Introducao";
import Valores from "../components/Valores";
import Galeria from "../components/Galeria";
import Cardapio from "../components/Cardapio";
import FormLead from "../components/FormLead";
import Depoimentos from "../components/Depoimentos";

const Home = () => {
    return (
        <>
            <Banner
                texto={"Um café quentinho aqui na Tiamate muda o dia."}
                imagem={banner}
                aDireita={false}
                links={true}
            />
            <Introducao />
            <Valores />
            <Banner 
                texto={"Café Autêntico Chegou nosso café! Direto da fazenda."}
                imagem={banner2}
                aDireita={false}
                links={false}
            />
            <Galeria />
            <Cardapio />
            <FormLead />
            <Depoimentos />
        </>
    );
}

export default Home;