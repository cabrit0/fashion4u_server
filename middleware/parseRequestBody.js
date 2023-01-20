const parseRequestBody = (req, res, next) => {
  const { text, brands, clothes } = req.body;
  console.log(req.body)
  req.text = text;
  req.brands = brands;
  req.clothes = clothes;
  next();
};

module.exports = parseRequestBody;
