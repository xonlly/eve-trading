
import base from './base'

export default class ItemHistory extends base {

    constructor({ config }) {

        super( ...arguments )

        this.debug = config.debug

        this.debug.roads('ready')

    }

    autoImport() {

    }

}
