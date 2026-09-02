import { useEffect, useState } from "react";
import { AXIOS } from "../services";
import { LuMapPin } from "react-icons/lu";

const Unidades = () => {

    const [unidades, setUnidades] = useState([]);

    async function buscarUnidades() {
        const resposta = await AXIOS.get("/unidades");
        setUnidades(resposta.data);
    }

    useEffect(() => {
        buscarUnidades();
    }, []);

    return (
        <div className="py-25 px-32.5">
            <h6 className="text-marron-black-2 text-center">Endereço</h6>
            <h2 className="text-marron-medio text-center font-bold text-[50px]">
                Vem tomar um café
            </h2>

            <div className="grid grid-cols-3">
                {
                    unidades.length == 0 ? (
                        <div>Nenhum endereço localizado</div>
                    ) : (
                        unidades.map(unidade => (
                            <div>
                                <h6 className="text-marron-medio">Unidade</h6>
                                <h5 className="text-marron-black-2 text-2xl mb-4">{unidade.nome}</h5>
                                <div className="h-px bg-black/10 mb-4"></div>
                                <div>
                                    <LuMapPin/>

                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default Unidades;