let currentHead = "./partials/head.ejs";
exports.home = ( req, res ) => res.render('./home', {title: 'Home', currentHead})
exports.about = ( req, res ) => res.render('./about', {title: 'About', currentHead} )
exports.shop = ( req, res ) => res.render('./shop', {title: 'Shop', currentHead} )
