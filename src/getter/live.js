import zmq      from 'zmq'
import zlib     from 'zlib'
import debug    from 'debug'

const sock = zmq.socket('sub');
const log  = debug('eve:live')

const init = ( { tools } ) => new Promise((resolve, reject) => {

    const tcp = 'tcp://relay-us-east-1.eve-emdr.com:8050'

    sock.connect( tcp );

    sock.subscribe( '' );

    log('Worker connected to port 8050');
    log('On addr', tcp)

    listen( d => {
        tools.ee.emit('relay-us-east-1', parse( d ) )
    })

    resolve()

})



const parse = data => {

    data.version != '0.1' && log('Warning new data version', data.version)

    data.rowsets = data.rowsets.map( r => {
        r.rows = r.rows.map( row => {

            let newRow = {}

            data.columns.forEach((col, i) => {
                newRow[ col ] = row[ i ]
            })

            return newRow
        } )
        return r
    })

    return data

}

const disconnect = () => new Promise((resolve, reject) => {
    sock.unmonitor()
    resolve()
})

const listen = callback =>
    sock.on('message', msg =>
        zlib.unzip( msg, ( err, b ) =>
            callback( JSON.parse( b.toString() ) )
        )
    )


module.exports = { init, listen, parse, disconnect }
