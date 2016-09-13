
import url      from 'url'
import fetch    from 'node-fetch'

export default class Base {

    constructor({ tools, config }) {

        this.api = {}

        this.log = config.debug.base

        this.api.eve = config.api.eveonline

    }

    getMarketOrdersAll( regions ) {
        return new Promise((resolve, reject) => {

            let tasks = Promise.resolve()

            ;( typeof regions == 'object' ? regions : [ regions ]).map( r => {

                const url = `${ this.api.eve }market/${ r }/orders/all/`

                this.log('request market orders all for region', r, url)

                tasks = tasks
                    .then( () => fetch( url ) )
                    .then( res => !res.ok || res.status != 200 ?
                            Promise.reject( res.statusText )
                        :   res.json()
                    )
                    .then( datas => {

                        if ( datas.next && datas.next.href )
                            datas.next = () => this.getMarketOrdersAll( datas.next.href )

                        return datas
                    })

            })

            tasks.then( resolve ).catch( reject )
        })
    }

}
