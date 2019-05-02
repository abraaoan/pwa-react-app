import React, { Component } from 'react';

 const Status = (props) => {

    const { value } = props;
    var currentStatus = "Aberto";
    var statusColor = 'warning';

    if (value === 'C') {
      currentStatus = "Cancelado";
      statusColor = "danger";
    } else if (value === 'E') {
      currentStatus = "Entregue";
      statusColor = "success";
    }

    return (
      <div {...props}>
        <span className={`badge badge-pill badge-${statusColor}`}>{currentStatus}</span>
      </div>
    )
}

export default Status
