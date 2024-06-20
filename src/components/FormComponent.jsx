import React from "react";
import axios from "axios";
import  "../styles/FormComponent.css"


const FormComponent = () => {
    

        return(

            <div className="main">
                <form id="form">
                    <label htmlFor="nome">Nome Completo</label>
                    <input className="nome" name="nome" type="text" />

                    <label htmlFor="cpf">CPF</label>
                    <input className="cpf" name="cpf" type="text" />

                    <label htmlFor="cidade">Cidade</label>
                    <input className="cidade" disabled name="cidade" type="text" />

                    <label htmlFor="email">Email</label>
                    <input className="email" name="email" type="email" />

                    <label htmlFor="telefone">Telefone</label>
                    <input className="telefone" name="telefone" type="text" />

                    <label htmlFor="sexo">Sexo</label>
                    <select name="sexo" id="">
                        <option value="Selecione o sexo" disabled selected>Selecione o sexo</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminimo">Feminimo</option>
                    </select>

                    <label htmlFor="camisa">Tamanho da Camisa</label>
                    <select name="camisa" id="">
                    <option value="Selecione o tamanho da camisa" selected disabled>Selecione o tamanho da camisa</option>
                        <option value="P">P</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                        <option value="GG">GG</option>
                        
                    </select>
                </form>
            </div>

        );

};

export default FormComponent;




