
export default ( options ) => ({
    item_history:  new require('./item_history')( options ),
    item_orders:   new require('./item_orders')( options ),
    item_prices:   new require('./item_prices')( options ),
    region_id:     new require('./region_id')( options ),
    solar_systems: new require('./solar_systems')( options ),
    station_rank:  new require('./station_rank')( options ),
})
