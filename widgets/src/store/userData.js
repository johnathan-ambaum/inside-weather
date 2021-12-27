let userData = {};

const ptDataLayer = window.dataLayer.find(data => data.pt !== undefined);

userData.pt = undefined;
if(ptDataLayer){
  userData.pt = ptDataLayer.pt;
}

export default userData