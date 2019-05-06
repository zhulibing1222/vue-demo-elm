const sData = require('./data.json');

module.exports = {
  lintOnSave: false,
  devServer:{
    before(app) {
      app.get('/api/seller',(req,res) => {
        res.json({
          errno:0,
          seller:sData.seller
        });
      });
      app.get('/api/goods',(req,res) => {
        res.json({
          errno:0,
          goods:sData.goods
        });
      });
      app.get('/api/ratings',(req,res) => {
        res.json({
          errno:0,
          ratings:sData.ratings
        });
      });
    }
  }
}
