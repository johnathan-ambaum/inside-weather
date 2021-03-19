let customer = [];
if (window.pnwCfg && window.pnwCfg.historyProducts) {
  customer = window.pnwCfg.historyProducts;
}

let local = [];

if (localStorage.getItem('historyProducts')) {
  try {
    local = JSON.parse(localStorage.getItem('historyProducts'));
  } catch (err) {
    console.warn('Invalid favorites data detected');
  }
}

export const customerHistory = customer;
export const localHistory = local;
export const history = customerHistory.length ? [...customerHistory] : [...localHistory];

export default {
  customerHistory,
  localHistory,
  history,
};
