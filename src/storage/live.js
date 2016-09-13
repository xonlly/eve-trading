
export default class Live {

    constructor({ tools, config }) {

        this.log   = config.debug.insert
        this.mysql = tools.mysql

        tools.ee.on('relay-us-east-1', r => this.insert( r ))
    }

    insert( r ) {
        if ( r.resultType != "orders" )
            return this.log('result type not found', r.resultType, r)




    }

}
