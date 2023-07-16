function SplashScreen() {
  return (
    <div id="fuse-splash-screen">
      <div className="center">
        <div className="logo">
          <img className="w-100" src="..\assets\images\logo-dark.png" alt="logo" />
        </div>
        <div className="spinner-wrapper">
          <div className="spinner">
            <div className="inner">
              <div className="gap" />
              <div className="left">
                <div className="half-circle" />
              </div>
              <div className="right">
                <div className="half-circle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
