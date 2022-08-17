import React from 'react'

const Pages = ({imagesPerPage,totalImages,paginate}) => {

    const pageNumbers=[];
    for(let i=1;i<=Math.ceil(totalImages/imagesPerPage);i++){
      pageNumbers.push(i);
  }
  return (
    <div className="d-flex align-items-center justify-content-center text-center">
    <nav>
      <ul className='pagination text-center'>
        {pageNumbers.map(number => (
          <li key={number} active className='page-item'>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    </div>
  )
}

export default Pages
