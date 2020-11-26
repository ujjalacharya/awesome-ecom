import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { Table, Tag, Space } from "antd";

class RecentOrders extends Component {
  render() {
    const columns = [
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Item Name",
        dataIndex: "itemName",
        key: "itemName",
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = 'green';
              if (tag === 'purchased') {
                color = 'green';
              } else if (tag === 'cancelled') {
                color = 'blue'
              } else {
                color = 'red'
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: "Sold By",
        dataIndex: "soldBy",
        key: "soldBy",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Qty",
        dataIndex: "qty",
        key: "qty",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      //   {
      //     title: "Action",
      //     key: "action",
      //     render: (text, record) => (
      //       <Space size="middle">
      //         <a
      //           onClick={() =>
      //             this.setState({
      //               show: "form",
      //             })
      //           }
      //         >
      //           Edit
      //         </a>
      //       </Space>
      //     ),
      //   },
    ];

    const data = [
      {
        key: "1",
        image: <img src="/images/helmet.jpg" className="table-item-img" />,
        itemName: "Studds D2 Matte Double Visor Full Helmet - Black/white/grey",
        status: ["purchased"],
        soldBy: "STUDDS",
        qty: "1",
        price: "4000",
      },
      {
        key: "2",
        image: <img src="/images/prod-bag.jpg" className="table-item-img" />,
        itemName: "Auctor Sem Argu",
        status: ["cancelled"],
        soldBy: "Fashionista",
        qty: "2",
        price: "1500",
      },
    ];
    return (
      <div className="recent-orders">
        <Table
          className="orders-table table-wrapper" columns={columns} dataSource={data} expandable={{
            expandedRowRender: (record) =>
              <table className="expanded-table">
                <tbody>
                  <tr>
                    <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                    <td>Status</td>
                    <td><>
                      {record.status.map(tag => {
                        let color = 'green';
                        if (tag === 'purchased') {
                          color = 'green';
                        } else if (tag === 'cancelled') {
                          color = 'blue'
                        } else {
                          color = 'red'
                        }
                        return (
                          <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                          </Tag>
                        );
                      })}
                    </></td>
                  </tr>
                  {
                    Object.entries(record).map(([key, value], i) => {
                      if (key !== 'key' && key !== 'image' && key !== 'itemName' && key !== 'status') {
                        return (
                          <tr key={i}>
                            <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                            <td>{_.capitalize(key)}</td>
                            <td>{value}</td>
                          </tr>
                        )
                      }
                    })
                  }
                </tbody>
              </table>
          }} />
      </div>
    );
  }
}

export default RecentOrders;
