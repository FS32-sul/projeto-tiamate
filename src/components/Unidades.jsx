/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { AXIOS } from "../services";
import { LuClock, LuMapPin, LuPhone } from "react-icons/lu";

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

            <div className="grid grid-cols-3 gap-10 mt-10">
                {
                    unidades.length == 0 ? (
                        <div>Nenhum endereço localizado</div>
                    ) : (
                        unidades.map(unidade => (
                            <div>
                                <h6 className="text-marron-medio">Unidade</h6>
                                <h5 className="text-marron-black-2 text-2xl mb-4">{unidade.nome}</h5>
                                <div className="h-px bg-black/10 mb-4"></div>
                                <div className="flex gap-3 items-center mb-3 font-semibold text-marron-medio">
                                    <LuMapPin/>
                                    {unidade.endereco}
                                </div>
                                <div className="flex gap-3 items-center mb-3 font-semibold text-marron-medio">
                                    <LuClock/>
                                    {unidade.horario}
                                </div>
                                <div className="flex gap-3 items-center mb-3 font-semibold text-marron-medio">
                                    <LuPhone/>
                                    {unidade.telefone}
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