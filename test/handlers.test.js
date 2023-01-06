describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})

exports.home = ( req, res ) => res.render('./home', {title: 'Home', currentHead})
const handlers = require( './../handlers' )
test( 'testing home page', () => {
    const req = {},
        res = { render: jest.fn() }
    handlers.home( req, res )
    expect( res.render.mock.calls[ 0 ][ 0 ] ).toBe( './home')
})

exports.about = ( req, res ) => res.render('./home', {title: 'Home', currentHead})
test( 'testing about page', () => {
    const req = {},
        res = { render: jest.fn() }
    handlers.about( req, res )
    expect( res.render.mock.calls[ 0 ][ 0 ] ).toBe( './about' )
})

exports.shop = ( req, res ) => res.render('./shop', {title: 'Shop', currentHead})
test( 'testing shop page', () => {
    const req = {},
        res = { render: jest.fn() }
    handlers.shop( req, res )
    expect( res.render.mock.calls[ 0 ][ 0 ] ).toBe( './shop' )
})