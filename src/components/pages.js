import React, { Component } from 'react';

export default class Pages extends Component {

  render() {

    const { pagination, currentPage, path } = this.props;
    const cPage =  parseInt(currentPage);
    const total = pagination.length;
    const shouldEnablePrevious = cPage > 1;
    const shouldDisableNext = cPage === total;
    const pages = [];

    const left = cPage - 1;
    const right = cPage + 1;
    
    // Left
    if (left > 0)
      pages.push(left);
    
    pages.push(cPage);

    // Right
    if (right <= total) {
      if (left > 0)
        pages.push(right)
      else if (total > 2)
        pages.push(right, right + 1);
      else
        pages.push(right);
    } else if (currentPage > 2) {
        pages.splice(0, 0, currentPage - 2);
    }

    return (
      <div style={total === 0 ? {opacity: '0'} : {opacity: '1'}}>
        <nav aria-label="Page navigation example" style={{marginTop: 4}}>
          <ul className="pagination justify-content-end">
            <li className={shouldEnablePrevious ? "page-item" : "page-item disabled"}>
              <a className="page-link" href={`${process.env.PUBLIC_URL}/${path}?page=${currentPage - 1}`}
               tabIndex="-1" 
               aria-disabled="true">
               Anterior
              </a>
            </li>
            {
              
              pages.map(page => {
                return (
                  <li className={page ===cPage ? "page-item active" : "page-item"} key={page}>
                    <a className="page-link" href={`${process.env.PUBLIC_URL}/${path}?page=${page}`}>{page}</a>
                  </li>
                );
              })

            }
            <li className={shouldDisableNext ? "page-item disabled" : "page-item"}>
              <a className="page-link" href={`${process.env.PUBLIC_URL}/${path}?page=${currentPage + 1}`}>Próxima</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
