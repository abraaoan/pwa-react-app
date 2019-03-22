import React, { Component } from 'react';

const styles = ({
    toolbar: {
        marginLeft: 50,
        marginRight: 50,
        padding: '5px 5px 5px 5px',
        background: 'rgba(255, 0, 0, 0.1)',
    },
    search: {
        width: 500,
    }
});

export default class Toolbar extends Component {
    render() {
        return (
            <div class="d-flex flex-row justify-content-end" style={styles.toolbar}>
                <div class="mr-auto p-2">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary">Adicionar</button>
                        <button type="button" class="btn btn-primary">Listar</button>
                        <button type="button" class="btn btn-primary">Voltar</button>
                    </div>
                </div>
                <div class="p-2" >
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Buscar produto" aria-label="Username" aria-describedby="basic-addon1" />
                        <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary" type="button">Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}