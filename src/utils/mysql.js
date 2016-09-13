
import mysql            from 'mysql'

module.exports = config => {

    const conn = mysql.createConnection( config.mysql )
    const log  = config.debug.mysql

    conn.connect( err => {
        if ( err )
            return log('Error connect', err)
    } )


    return {
        query : ( query ) =>
            new Promise((resolve, reject) =>
                conn.query( query, ( err, rows ) => {
                    if ( err )
                        return reject( err )

                    return resolve( rows )
                } )
            ).catch( err => {
                log('Mysql error', err)
                return Promise.reject( err )
            }),

        insert : ( query, values ) =>
            new Promise((resolve, reject) =>
                conn.query( query, ( err, rows) => {
                    if ( err )
                        return reject( err )

                    return resolve( rows )
                } )
            ).catch( err => {
                log('Mysql error', err)
                return Promise.reject( err )
            }),

        delete : ( query, values ) =>
            new Promise((resolve, reject) =>
                conn.query( query, ( err, rows) => {
                    if ( err )
                        return reject( err )

                    return resolve( rows )
                } )
            ).catch( err => {
                log('Mysql error', err)
                return Promise.reject( err )
            }),
    }

}
