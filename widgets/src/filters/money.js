const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
};

const money = price => (price ? `$${parseInt(price, 10).toLocaleString(undefined, options)}` : '');

export default money;
