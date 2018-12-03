import React from 'react';

const Jumbotron = () => {
  return (
    <div className="jumbotron p-0">
      <div className="view overlay">
        <img style={{height: 300, width: '100%'}} src="https://mdbootstrap.com/img/Photos/Slides/img%20(134).jpg" className="img-fluid" alt="Sample image" />
        <a href="#">
          <div className="mask rgba-white-slight"></div>
        </a>
      </div>
      {/* <div className="card-body text-center mb-3">
        <h3 className="card-title h3 my-4"><strong>Card title</strong></h3>
        <p className="card-text py-2">Some quick example text to build on the card title and make up the bulk of the card's</p>
        <a href="#" className="btn purple-gradient btn-rounded mb-4">Button</a>
      </div> */}

    </div>
  );
}

export default Jumbotron;
