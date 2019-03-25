import React, { Component } from 'react';
import Back from '../assets/back';

const styles = ({
    toolbar: {
        marginLeft: 50,
        marginRight: 50,
        // background: 'rgba(255, 0, 0, 0.1)'
    },
    search: {
        width: 500,
    }
});

export default class Toolbar extends Component {
    render() {
        return (
            <div className="d-flex flex-row justify-content-end" style={styles.toolbar}>
                <div className="mr-auto p-2">
                    <a href="/" className="d-flex" style={{color: "blue", height: 26}}>
                      <div className="p-0">
                        <Back style={{marginTop: 10}} fill="blue"/>
                      </div>
                      <div className="p-2" style={{fontSize: 14, marginLeft: -6}}>Voltar para home</div>
                    </a>
                    <h2>{this.props.title}</h2>
                </div>
                <div className="p-4" >
                    <div className="input-group" style={{width: 400, marginRight:-18}}>
                        <input type="text" className="form-control" placeholder="Buscar produto" aria-label="Username" aria-describedby="basic-addon1" />
                        <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary" type="button">Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
