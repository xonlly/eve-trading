
import base     from './base'
import targz    from 'targz'
import Region   from './region_id'
import request  from 'request'
import fs       from 'fs'
import path     from 'path'
import progress from 'request-progress'

const wait = delay => new Promise(resolve => setTimeout( resolve(), delay ))

export default class ItemHistory extends base {

    constructor({ config }) {

        super( ...arguments )

        this.region = new Region( ...arguments )

        this.debug = config.debug
        this.debug.roads('ready')

        this.importFromMarketData([
            /* Regions */
            this.region.getByName('Heimatar').id,
        ])

    }

    getLinkRegion( id ) {
        return `http://eve-marketdata.com/developers/mysql_items_history_30_${ id }.txt.gz`
    }

    unGz( src, dest ) {
        return new Promise((resolve, reject) => {
            targz.decompress({
                src : path.join( __dirname, 'tempory', src),
                dest : path.join( __dirname, 'tempory' )
            }, err => {
                if ( err )
                    return reject( err )

                this.debug.roads('item history', src, 'finish untar')

                return resolve()
            })
        })
    }

    download( r ) {
        return new Promise((resolve, reject) =>
            progress(request( r.link ))

                .on('progress', state => {
                    this.debug.roads('item history', r.id, 'progress', `${ state.percentage*100 }%`)
                })

                .on('error', err => reject( err ))

                .pipe( fs.createWriteStream( path.join( __dirname, 'tempory', `${ r.id }.txt.gz` ) ) )

                .on('finish', () => {
                    this.debug.roads('item history', r.id, 'finish download')
                    resolve( r )
                })
        )
    }

    insert( r ) {
        return new Promise(( resolve, reject ) => {
            /* Work in progress ... */
        })
    }

    importFromMarketData( regions ) {

        let tasks = Promise.resolve()

        ;( regions || this.region.get() ).map( r => ({ id : r, link : this.getLinkRegion( r ) }) )
            .forEach( r => {

                this.debug.roads('prepare', r.link)

                tasks = tasks
                    .then(() => this.download( r ))
                    .then(() => wait( 100 )) /* wait file close cursor */
                    .then(() => this.unGz(`${ r.id }.txt.gz`))
                    .then(() => this.insert())

            } )

        tasks
            .then(() => {
                this.debug.roads('downloads finish')
            })
            .catch(err => {
                this.debug.roads('error on download or insert db', err)
            })
    }

}
