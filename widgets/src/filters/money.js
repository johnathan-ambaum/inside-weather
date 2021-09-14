const money = (price) => {
  console.log(price);
  return (price ? `$${Number(parseInt(price, 10)).toLocaleString()}` : '');
};

export default money;
