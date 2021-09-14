const money = price => (price ? `$${parseInt(price, 10).toLocaleString()}` : '');

export default money;
