module.exports = (router,app) => {
    require('../routes/auth')(router,app);
    require('../routes/category')(router,app);
};