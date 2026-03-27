import React from "react";
const Universe = () => {
  return (
    <div className="container  mb-5 text-center">
      <div className="row">
        <div className="col-12 mb-5">
          <h2 className="mb-3">The Zerodha Universe</h2>
          <p className="text-muted">
            Extend your trading and investment experience even further with our
            partner platforms
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 ">
          <div className="p-4">
            <img
              src="images/coin.png"
              alt="Coin"
              style={{ width: "200px" }}
              className="mb-3"
            />
            <h5>Coin</h5>
            <p className="text-muted small">
              Invest in direct mutual funds and ETFs
            </p>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="p-4">
            <img
              src="images/kiteconnect.png"
              alt="Kite Connect"
              style={{ width: "200px" }}
              className="mb-3"
            />
            <h5>Kite Connect API</h5>
            <p className="text-muted small">
              Build powerful trading platforms and experiences
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="p-4">
            <img
              src="images/varsity.png"
              alt="Varsity"
              style={{ width: "150px" }}
              className="mb-3"
            />
            <h5>Varsity</h5>
            <p className="text-muted small">
              Learn stock market trading and investing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Universe;
