/* eslint-disable react-hooks/set-state-in-effect */
import { BiSolidCoffeeTogo, BiSolidEnvelope, BiSolidHome, BiSolidMap, BiSolidPhone, BiSolidUserCircle } from "react-icons/bi";
import img from "../assets/form-bg.png";
import { useEffect, useRef, useState } from "react";
import { AXIOS } from "../services";
const FormLead = () => {

    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [bloqueado, setBloqueado] = useState(false)
    const inputNome = useRef(null);
    const inputEmail = useRef(null);
    const inputTelefone = useRef(null);
    const inputEstado = useRef(null);
    const inputCidade = useRef(null);
    const inputComo = useRef(null);
    const form = useRef(null);

    async function buscarEstados() {
        try {
            const req = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
            const res = await req.json();
            setEstados(res);
        } catch (error) {
            alert(error.message)
        }
    }

    async function buscarCidades(estadoId) {
        try {
            const req = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            const res = await req.json();
            setCidades(res);
        } catch (error) {
            alert(error.message)
        }
    }

    async function enviar(){
        event.preventDefault();
        try {
            setBloqueado(true);
            const lead = {
                nome: inputNome.current.value,
                email: inputEmail.current.value,
                telefone: inputTelefone.current.value,
                estado: inputEstado.current.value,
                cidade: inputCidade.current.value,
                como: inputComo.current.value
            }
    
            if(lead.nome == "" && lead.nome.length <= 4){
                alert("O Nome está inválido");
                setBloqueado(false);
                return;
            }
            if(lead.telefone == "" && lead.telefone.length <= 4){
                alert("O Telefone está inválido");
                setBloqueado(false);
                return;
            }
            if(lead.email == "" && lead.email.length <= 4){
                alert("O Email está inválido");
                setBloqueado(false);
                return;
            }
    
            const resposta = await AXIOS.post("/interessados", lead);
            
            setBloqueado(false);
            form.current.reset();
    
            alert(resposta.data.mensagem);
        } catch (error) {
            alert(error.message)
        }

    }

    useEffect(() => {
        buscarEstados();
    }, []);

    return (
        <div className="bg-marron-black-2 flex justify-between items-center">
            <div className="pl-33.75 pr-17.5">
                <h6 className="text-marron-white-2 text-lg">Entre em contato</h6>
                <h2 className="text-marron-white text-[50px] leading-15 font-bold">Abra sua Franquia</h2>
                <p className="text-marron-white-2 mb-5">Preencha o formulário abaixo que entraremos em contato com você o mais rápido possível.</p>
                <form ref={form} onSubmit={enviar}>
                    <div className="bg-marron-white flex items-center rounded pl-4 gap-4 mb-3">
                        <BiSolidUserCircle className="w-10 h-10 bg-marron-medio fill-marron-black-2 rounded-full p-2" />
                        <input
                            ref={inputNome}
                            type="text"
                            placeholder="Nome e Sobrenome"
                            className="h-15 flex-1 bg-transparent focus:outline-0"
                        />
                    </div>
                    <div className="bg-marron-white flex items-center rounded pl-4 gap-4 mb-3">
                        <BiSolidEnvelope className="w-10 h-10 bg-marron-medio fill-marron-black-2 rounded-full p-2" />
                        <input
                            ref={inputEmail}
                            type="email"
                            placeholder="email@exemplo.com"
                            className="h-15 flex-1 bg-transparent focus:outline-0"
                        />
                    </div>
                    <div className="bg-marron-white flex items-center rounded pl-4 gap-4 mb-3">
                        <BiSolidPhone className="w-10 h-10 bg-marron-medio fill-marron-black-2 rounded-full p-2" />
                        <input
                            ref={inputTelefone}
                            type="tel"
                            placeholder="Telefone com DDD"
                            className="h-15 flex-1 bg-transparent focus:outline-0"
                        />
                    </div>
                    <div className="flex gap-4 *:flex-1">
                        <div className="bg-marron-white flex items-center rounded pl-4 gap-4 mb-3 pr-4">
                            <BiSolidMap className="w-10 h-10 bg-marron-medio fill-marron-black-2 rounded-full p-2" />
                            <select
                                ref={inputEstado}
                                className="h-15 flex-1 bg-transparent focus:outline-0"
                                onChange={(e) => buscarCidades(e.target.value)}
                            >
                                <option disabled selected>UF</option>
                                {
                                    (estados || []).map(estado => (
                                        <option key={`e-${estado.id}`} value={estado.id}>{estado.nome}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="bg-marron-white flex items-center rounded pl-4 gap-4 mb-3 pr-4">
                            <BiSolidHome className="w-10 h-10 bg-marron-medio fill-marron-black-2 rounded-full p-2" />
                            <select
                                ref={inputCidade}
                                className="h-15 flex-1 bg-transparent focus:outline-0 disabled:cursor-not-allowed"
                                disabled={cidades.length == 0}
                            >
                                <option disabled selected>Cidade</option>
                                {
                                    (cidades || []).map(cidade => (
                                        <option key={`c-${cidade.id}`} value={cidade.id}>{cidade.nome}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="bg-marron-white flex items-center rounded pl-4 gap-4 mb-3 pr-4">
                        <BiSolidCoffeeTogo className="w-10 h-10 bg-marron-medio fill-marron-black-2 rounded-full p-2" />
                        <select
                            ref={inputComo}
                            className="h-15 flex-1 bg-transparent focus:outline-0"
                        >
                            <option disabled selected>Como conheceu a timate?</option>
                            <option>Facebook</option>
                            <option>Instagram</option>
                            <option>Google</option>
                            <option>Indicação</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={bloqueado}
                        className="w-full h-15 bg-marron-white-2 disabled:bg-gray-200 disabled:cursor-not-allowed text-marron-black-2 font-semibold rounded duration-150 hover:bg-gold cursor-pointer"
                    >
                        Enviar Cadastro
                    </button>
                </form>
            </div>
            <div>
                <img src={img} alt="" />
            </div>
        </div>
    );
}

export default FormLead;