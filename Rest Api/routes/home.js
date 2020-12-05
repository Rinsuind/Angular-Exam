module.exports = {
    path: '/',
    config: (router) => {
        router.get('/', (req, res) => res.json({ name: 'Ivan' }));
        return router;
    },
};
