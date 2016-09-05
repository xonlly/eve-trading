

CREATE DATABASE `eve-trading` /*!40100 COLLATE 'latin1_swedish_ci' */;

create table items_history (
  region_id      int          not null           comment 'eve_map_regions.region_id'
, date           date         not null           comment 'date for the entry'
, type_id        int          not null           comment 'eve_inv_types.type_id'
, price_low      double       not null default 0 comment 'low price'
, price_high     double       not null default 0 comment 'high price'
, price_average  double       not null default 0 comment 'average price'
, quantity       bigint       not null default 0 comment 'quantity moved'
, num_orders     bigint       not null default 0 comment 'number of orders'
, created        datetime     not null           comment 'date we received the first data'
, primary key    (region_id, type_id, date)
, key i_main           (type_id, region_id, date)
, key i_type_id        (type_id)
, key i_region_id      (region_id)
, key i_date           (date)
)
partition by range(region_id) (
  partition p10000001 values less than (10000002) # Derelik
, partition p10000002 values less than (10000003) # The Forge
, partition p10000003 values less than (10000005) # Vale of the Silent
, partition p10000005 values less than (10000006) # Detorid
, partition p10000006 values less than (10000007) # Wicked Creek
, partition p10000007 values less than (10000008) # Cache
, partition p10000008 values less than (10000009) # Scalding Pass
, partition p10000009 values less than (10000010) # Insmother
, partition p10000010 values less than (10000011) # Tribute
, partition p10000011 values less than (10000012) # Great Wildlands
, partition p10000012 values less than (10000013) # Curse
, partition p10000013 values less than (10000014) # Malpais
, partition p10000014 values less than (10000015) # Catch
, partition p10000015 values less than (10000016) # Venal
, partition p10000016 values less than (10000018) # Lonetrek
, partition p10000018 values less than (10000020) # The Spire
, partition p10000020 values less than (10000021) # Tash-Murkon
, partition p10000021 values less than (10000022) # Outer Passage
, partition p10000022 values less than (10000023) # Stain
, partition p10000023 values less than (10000025) # Pure Blind
, partition p10000025 values less than (10000027) # Immensea
, partition p10000027 values less than (10000028) # Etherium Reach
, partition p10000028 values less than (10000029) # Molden Heath
, partition p10000029 values less than (10000030) # Geminate
, partition p10000030 values less than (10000031) # Heimatar
, partition p10000031 values less than (10000032) # Impass
, partition p10000032 values less than (10000033) # Sinq Laison
, partition p10000033 values less than (10000034) # The Citadel
, partition p10000034 values less than (10000035) # The Kalevala Expanse
, partition p10000035 values less than (10000036) # Deklein
, partition p10000036 values less than (10000037) # Devoid
, partition p10000037 values less than (10000038) # Everyshore
, partition p10000038 values less than (10000039) # The Bleak Lands
, partition p10000039 values less than (10000040) # Esoteria
, partition p10000040 values less than (10000041) # Oasa
, partition p10000041 values less than (10000042) # Syndicate
, partition p10000042 values less than (10000043) # Metropolis
, partition p10000043 values less than (10000044) # Domain
, partition p10000044 values less than (10000045) # Solitude
, partition p10000045 values less than (10000046) # Tenal
, partition p10000046 values less than (10000047) # Fade
, partition p10000047 values less than (10000048) # Providence
, partition p10000048 values less than (10000049) # Placid
, partition p10000049 values less than (10000050) # Khanid
, partition p10000050 values less than (10000051) # Querious
, partition p10000051 values less than (10000052) # Cloud Ring
, partition p10000052 values less than (10000053) # Kador
, partition p10000053 values less than (10000054) # Cobalt Edge
, partition p10000054 values less than (10000055) # Aridia
, partition p10000055 values less than (10000056) # Branch
, partition p10000056 values less than (10000057) # Feythabolis
, partition p10000057 values less than (10000058) # Outer Ring
, partition p10000058 values less than (10000059) # Fountain
, partition p10000059 values less than (10000060) # Paragon Soul
, partition p10000060 values less than (10000061) # Delve
, partition p10000061 values less than (10000062) # Tenerifis
, partition p10000062 values less than (10000063) # Omist
, partition p10000063 values less than (10000064) # Period Basis
, partition p10000064 values less than (10000065) # Essence
, partition p10000065 values less than (10000066) # Kor-Azor
, partition p10000066 values less than (10000067) # Perrigen Falls
, partition p10000067 values less than (10000068) # Genesis
, partition p10000068 values less than (10000069) # Verge Vendor
, partition p10000069 values less than (10000070) # Black Rise
, partition pother values less than maxvalue
);
