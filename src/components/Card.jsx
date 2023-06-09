import React from 'react';
import './Card.css';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from "react-router-dom";

export default function Card ({min, max, name, img, onClose, id}) {
    return (
      <div className="card">
        <div id="closeIcon" className="row">
            <button onClick={onClose} className="btn btn-sm btn-danger">X</button>
        </div>
        <div className="card-body">
          <Link to={`/${id}`}><h5 className="card-title">{name}</h5></Link>
          <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4">
              <p>Min</p>
              <p>{min}°</p>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <p>Max</p>
              <p>{max}°</p>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <img className="iconoClima" src={"http://openweathermap.org/img/wn/"+img+"@2x.png"} width="80" height="80" alt="" />
            </div>
            <div>
              <button className='favourites'>
              <p>Agregar a Favoritos</p>
              <AiOutlineHeart height={9} color={'red'}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};
