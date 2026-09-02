import { BiArrowBack, BiSolidStar } from "react-icons/bi";
import barista from "../assets/bg-depoimentos.png";
import { useEffect, useState } from "react";
import { AXIOS } from "../services";

const DepoimentoCard = ({ estrelas = 0, texto = "", imagem = "", nome = "" }) => {

    return (
        <div className="w-100 bg-marron-white rounded-lg p-9 flex flex-col justify-between">
            <div>
                <div className="flex gap-1">
                    {
                        Array.from({ length: estrelas }, (_, posicao) => (
                            <BiSolidStar
                                key={`e-${nome}-${posicao}`}
                                size={26}
                                className="fill-marron-medio"
                            />
                        ))
                    }
                </div>
                <p className="text-marron-black-2 text-sm mt-4 mb-3">{texto}</p>
            </div>
            <div className="flex items-center gap-4">
                <img
                    src={imagem}
                    alt={nome}
                    className="w-15 h-15 rounded-full object-cover"
                />
                <h6 className="text-marron-black-2 font-semibold">{nome}</h6>
            </div>
        </div>
    );
}

const Depoimentos = () => {

    const [depoimentos, setDepoimentos] = useState([]);
    const [click, setClick] = useState(0);

    function proximo() {
        if (click < depoimentos.length - 2) {
            setClick(click + 1);
        }
    }

    function anterior() {
        if (click > 0) {
            setClick(click - 1);
        }
    }

    useEffect(() => {
        async function buscarDepoimentos() {
            // const req = await fetch("http://localhost:3000/depoimentos");
            // const res = await req.json();
            const resposta = await AXIOS.get("/depoimentos");
            setDepoimentos(resposta.data);
        }
        buscarDepoimentos();
    }, []);

    return (
        <div className="py-32.5">
            <h6 className="text-center text-marron-black-2 text-lg">Depoimentos</h6>
            <h2 className="text-center text-marron-medio text-[50px] leading-15 font-bold mb-15">Tudo sobre Tiamate Coffee</h2>

            <div className="relative">
                <img src={barista} alt="Barista" />
                <div className="w-270 overflow-hidden absolute top-7.5 right-0 h-81.5">
                    <div style={{ width: ((400 * depoimentos.length) + (40 * (depoimentos.length - 1))) + "px", left: `-${400 * click}px` }} className="duration-150 flex gap-10 absolute top-0 right-0">
                        {
                            (depoimentos || []).map(dep => (
                                <DepoimentoCard
                                    key={`d-${dep.id}`}
                                    nome={dep.nome}
                                    imagem={dep.imagem}
                                    texto={dep.texto}
                                    estrelas={dep.estrelas}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className="absolute bottom-0 right-0 flex gap-4 pr-18">
                    <BiArrowBack
                        onClick={anterior}
                        className="bg-marron-medio w-12 h-12 p-3 rounded-full text-3xl cursor-pointer hover:bg-gold duration-150 text-marron-black-2"
                    />
                    <BiArrowBack
                        onClick={proximo}
                        className="bg-marron-medio w-12 h-12 p-3 rounded-full text-3xl cursor-pointer hover:bg-gold duration-150 text-marron-black-2 rotate-y-180"
                    />
                </div>
            </div>
        </div>
    );
}

export default Depoimentos;