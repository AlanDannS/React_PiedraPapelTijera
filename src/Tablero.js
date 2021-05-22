import React, { useState, useEffect } from "react";
import Opciones from "./Opciones";
import axios from "axios";

const Tablero = () => {
    //Dentro del state jugador guardaremos la informacion traida desde el API que consulta a la DB
    const [jugador, setJugador] = useState([]);
    //Dentro del state opcion almacenamos las elecciones de ambos jugadores para evaluarlas posteriormente
    const [opcion, setOpcion] = useState();

    //La funcion acElemento realiza multiples envios al API que se encargaran de devolver las opciones a su estado inicial 
    const acElemento = async () => {
        await axios.post(
            `http://localhost/api_juegoDos/?METHOD=PUT&jugador=1&value=`
        );
        await axios.post(
            `http://localhost/api_juegoDos/?METHOD=PUT&jugador=2&value=`
        );
        await axios.post(
            `http://localhost/api_juegoDos/?METHOD=PUT&jugador=1&turno=1`
        );
        await axios.post(
            `http://localhost/api_juegoDos/?METHOD=PUT&jugador=2&turno=0`
        );
    };

    /*La funcion peticionGet se encarga de realizar un call al api para traer la informacion de este y llenar el state jugador
        tambien se encarga de llamar a la funcion eleccion que llenara el state opcion.
    */
    const peticionGet = async () => {
        const respuesta = await axios.get("http://localhost:80/api_juegoDos/");
        const { data } = respuesta;
        setJugador(data);
        eleccion();
    };     
    
    //La funcion coleccion es la encargada de llenar el state opcion.
    const eleccion = () =>{
        let eleccion = [];
        //Hacemos un map a jugador para poder extraer los valores de este, acumularlos en eleccion y llenar opcion
        jugador.map((j, i)=>{
            eleccion[i]=j.eleccion
        })
        setOpcion(eleccion)
    };
    //Esta funcion evalua si opcion tiene informacion o si a algun jugador le falta jugar para poder liberar el resultado de la partida
    const resultado = () =>{
        //Si el arreglo esta vacio returna false
        if(!opcion){
            return false;
            //si opcion tiene 1 campo vacio regresara false
        }else if(opcion[0]=="" || opcion[1]==""){
            return false;
        }
        //Si no cumple con alguna condicion anterior retornara true
        return true;
    };


    //Esta funcion evalua los resultadoos para poder determinar si el ganador es el jugador 1 ,2 o es un empate 
    const rstd =  () =>{
        if(opcion[0] == 'rock' && opcion[1] == 'scissors'){return "Ganador: Jugador 1"}
        if(opcion[0] == 'scissors' && opcion[1] == 'paper'){return "Ganador: Jugador 1"}
        if(opcion[0] == 'paper' && opcion[1] == 'rock'){return "Ganador: Jugador 1"}

        if(opcion[1] == 'rock' && opcion[0] == 'scissors'){return "Ganador: Jugador 2"}
        if(opcion[1] == 'scissors' && opcion[0] == 'paper'){return "Ganador: Jugador 2"}
        if(opcion[1] == 'paper' && opcion[0] == 'rock'){return "Ganador: Jugador 2"}

        if(opcion[1] == 'rock' && opcion[0] == 'rock'){return "Empate"}
        if(opcion[1] == 'scissors' && opcion[0] == 'scissors'){return "Empate"}
        if(opcion[1] == 'paper' && opcion[0] == 'paper'){return "Empate"}


        
    }

    //UseEffect actualiza la informacion de los componentes cada que exista una alteracion al state jugador
    useEffect(() => {
        setTimeout(()=>{
            peticionGet();
        },2500);
    }, [jugador]);

    //Regresa el componente de tablero que nos permite visualizar ambos tableros de juego
    return (
        <div className="tablero">

            {/*Hacemos un map a jugador para nos muestre los dos jugadores e indicar a que jugador le toca tirar*/}
            {jugador.map((jug, i) => {
                return (
                    <div className="tarjeta" key={i}>
                        <h3>Jugador {jug.jugador}</h3>
                        <Opciones 
                        jugador={jug.jugador} 
                        turno={jug.turno}
                        />
                    </div>
                );
            })}
            <div className="content-btn">

            {/*Evaluamos si resultado es true o false si es true nos muestra el resultado de quien gano la partida
            y si resultado es true retorna el mensaje con el ganador*/}
                {
                    (resultado()) ?
                    
                    (<h3>{rstd()}</h3>)
                    :
                    (<h3></h3>)
                }
                {/*El boton Reiniciar llama a la funcion acElemento para poder reiniciar los valores de la bd al darle click*/}
                <button
                    className="btn-reinicio"
                    onClick={() => {
                        acElemento();
                    }}
                >
                    Reiniciar
                </button>
            </div>
        </div>
    );
};

export default Tablero;
