import React from 'react'
import axios from 'axios';
//Opciones recibe mediante props jugador, turno, ganador
const Opciones = ({jugador ,turno, ganador }) => {
    //opciones es un arreglo que nos ayudara a generar los botones del juego
    const opciones = ["rock", "paper", "scissors"];
    //Actualizar manda una actualizacion a la bd en este caso del turno del jugador 
    const actualizar = async (jugador, turno) => {
        await axios.post(`http://localhost/api_juegoDos/?METHOD=PUT&jugador=${jugador}&turno=${turno}`);
    }
    //AcElemento es una funcion que nos permite actualizar el elemento seleccionado por el jugador
    const acElemento = async (jugador, elemento) => {
        await axios.post(`http://localhost/api_juegoDos/?METHOD=PUT&jugador=${jugador}&value=${elemento}`);
    }
    //La opcion handleValue nos permite llamar a la funcion actualizar para poder modificar los turnos y las elecciones de cada jugador
    const handleValue = (elemento) => {
        if(jugador=="1"){
            actualizar(1,0);
            actualizar(2,1);
            acElemento(1,elemento);
            console.log(ganador);
        }

        if(jugador=="2"){
            actualizar(1,0);
            actualizar(2,0);
            acElemento(2,elemento);
            console.log(ganador);
        }        

    }


    return (
        
        <div className="opciones">
        {/*Este operador ternario nos permite evaluar el turno del jugador para habilitar las opciones
            mientras que el map que se le hace a opciones nos permite mostrar las 3 opciones de los botones
            y tambien generar las clases para los estilos de las opciones.*/}
        {
            (turno==1) ?
            (
                opciones.map((opcion, i) => {
                    let clase = "btn opcion-"+opcion;
                    let icon = "far fa-hand-"+opcion;
                    return <button
                            key={i} 
                            className={clase} 
                            onClick={()=>handleValue(opcion)}>
                            <i className={icon}></i>
                            </button> 
                })  

            )
            :
            (
                <h3 className="espera">Espera tu turno</h3>
            )
        }
        </div>
    )
}

export default Opciones
