import React from 'react';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser'
import { Table, Avatar } from 'antd';

import { useGetExchangesQuery } from '../services/cryptoApi';

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if(isFetching) return 'Loading Exchanges...';

  const tableColumns = [
    { title: '', dataIndex: 'avatar', key: 'avatar', width: 50, render: iconUrl => <Avatar className="exchange-image" src={iconUrl} /> },
    { title: 'Exchanges', dataIndex: 'exchanges', key: 'exchanges' },
    { title: '24h Trade Volume', dataIndex: 'TradeVolume', key: 'TradeVolume' },
    { title: 'Markets', dataIndex: 'markets', key: 'markets' },
    { title: 'Change', dataIndex: 'change', key: 'change' },
  ]

  const dataTable = exchangesList.map((exchange) => (
    {
      key: exchange.id,
      avatar: exchange.iconUrl,
      exchanges: `${exchange.rank}. ${exchange.name}`,
      TradeVolume: millify(exchange.volume),
      markets: millify(exchange.numberOfMarkets),
      change: `${millify(exchange.marketShare)}%`,
      description: HTMLReactParser(exchange.description || ''),    
    }
  ));

  console.log(exchangesList);
  return (
    <>
      <Table
        columns={tableColumns}
        expandable={{
          expandedRowRender: exchange => exchange.description,
          rowExpandable: exchange => exchange.description,
          expandIcon: ({ expanded, onExpand, record }) => '',
        }}
        expandRowByClick={true}
        dataSource={dataTable}
        pagination={{ pageSize: 19}}
      />
    </>
  )
}

export default Exchanges;