
import base     from './base'
import Region   from './region_id'
import request  from 'request'
import fs       from 'fs'
import path     from 'path'
import progress from 'request-progress'

const wait = delay => new Promise(resolve => setTimeout( resolve(), delay ))
const zlib = require('zlib');

export default class ItemHistory extends base {

    constructor({ config, tools }) {

        super( ...arguments )

        this.region = new Region( ...arguments )

        this.debug = config.debug
        this.debug.roads('ready')

        this.tools = tools
/*
        this.importFromMarketData([
            this.region.getByName('Heimatar').id,
            this.region.getByName('Devoid').id,
            this.region.getByName('Tash-Murkon').id,
            this.region.getByName('Kor-Azor').id,
            this.region.getByName('The Forge').id,
            this.region.getByName('Sinq Laison').id,
            this.region.getByName('Essence').id,
            this.region.getByName('Domain').id,
            this.region.getByName('Metropolis').id,
            this.region.getByName('Khanid').id,
            this.region.getByName('Genesis').id,
            //this.region.getByName('Derelik').id,
            this.region.getByName('Heimatar').id,
            this.region.getByName('Placid').id,
            this.region.getByName('The Citadel').id,

        ])*/

    }

    getLinkRegion( id ) {
        return `http://eve-marketdata.com/developers/mysql_items_history_30_${ id }.txt.gz`
    }

    download( r ) {
        return new Promise((resolve, reject) =>
            progress(request( r.link ))

                .on('progress', state => {
                    this.debug.roads('item history', r.id, 'progress', `${ state.percentage*100 }%`)
                })

                .on('error', err => reject( err ))

                .pipe( zlib.Gunzip() )

                .pipe( fs.createWriteStream( path.join( __dirname, 'tempory', `${ r.id }.txt` ) ) )

                .on('finish', () => {
                    this.debug.roads('item history', r.id, 'finish download')
                    resolve( r )
                })

                .on('error', err => reject( err ))
        )
    }

    insert( r, files ) {
        return new Promise(( resolve, reject ) => {
            fs.readFile(
                path.join( __dirname, 'tempory', `${ r.id }.txt` ),
                'utf8',
                ( err, request ) => {
                    if ( err )
                        return reject( err )

                    var tasks = Promise.resolve()

                    request.split("\n")
                        .filter( l => l != '' )
                        .map( line => line.replace('INSERT INTO', 'INSERT IGNORE INTO'))
                        .forEach( line =>
                            tasks = tasks.then( () => this.tools.mysql.query( line ) )
                        )
                    } )

                    tasks
                        .then( () => resolve() )
                        .catch( err => reject( err ))

                }
            )
        })
    }

    importFromMarketData( regions ) {

        let tasks = Promise.resolve()

        ;( regions || this.region.get() )
            .map( r => ({ id : r, link : this.getLinkRegion( r ) }) )
            .forEach( r => {

                this.debug.roads('prepare', r.link)

                tasks = tasks
                    .then(() => this.download( r )) // For tests this line is comment ( no spam download on source )
                    .then(() => wait( 500 )) /* wait file close cursor */
                    .then(() => this.insert( r ))
                    .then(() => wait( 1000 ))

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
