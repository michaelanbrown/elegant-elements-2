import React from "react";
import NavBar from "./NavBar";

function Header({ productCount, custAddresses }) {

  return (
    <div className="Header">
      <header>
        <div>
            <h1 className="elegant-header">Elegant Elements</h1>
            <p className="active"><em>✨Adding a touch of inspiration and elegance to your every day life✨</em></p>
            <img className="eleganceimg" src={"https://i.imgur.com/upX3ZLK.png"} alt="Elegant Elements" width="20%" height="20%"/>
            <NavBar productCount={productCount} custAddresses={custAddresses}/>
        </div>  
      </header>
    </div>
  );
}

export default Header;