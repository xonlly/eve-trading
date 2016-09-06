
import base     from './base'
import targz    from 'targz'
import Region   from './region_id'
import request  from 'request'
import fs       from 'fs'
import path     from 'path'
import progress from 'request-progress'

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

    importFromMarketData( regions ) {

        let tasks = new Promise(() => Promise.resolve)

        ;( regions || this.region.get() ).map( r => ({ id : r, link : this.getLinkRegion( r ) }) )
            .forEach( r => {
                this.debug.roads('prepare', r.link)
                tasks = tasks.then(() => new Promise((resolve, reject) => {
                    progress(request( r.link ), {
                        throttle: 2000,                    // Throttle the progress event to 2000ms, defaults to 1000ms
                        delay: 1000,
                    })
                        .on('progress', state => {
                            this.debug.roads(r.id, 'progress', state)
                        })
                        .on('error', err => this.debug.roads( 'Error', err ))
                        .pipe( fs.createWriteStream( path.join( __dirname, 'tempory', `${ r.id }.tar.gz` ) ) )
                }))
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
