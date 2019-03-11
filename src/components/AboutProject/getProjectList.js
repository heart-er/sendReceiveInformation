import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, notification, Popconfirm } from 'antd';

class getProjectList extends Component {
    state = {
        data: [],
        columns: [
            {
                title: '项目名称',
                dataIndex: 'projectName',
                key: 'projectName',
                align: 'center'
            },
            {
                title: '抽取规则',
                dataIndex: 'projectRegex',
                key: 'projectRegex',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: 'doSomething',
                key: 'doSomething',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <div>
                            <Button type="primary" onClick={() => {
                                localStorage.setItem("needUpdateProjectId", record.id);
                            }}
                                style={{ borderRadius: '0px', color: 'white', border: 'none', width: '60px', height: '30px', fontSize: '6px' }}
                            >
                                <Link to="/getProjectList/updateProject">修改</Link>
                            </Button>
                            <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key, record.id)}>
                                <Button
                                    style={{ background: 'red', borderRadius: '0px', color: 'white', border: 'none', width: '60px', height: '30px', fontSize: '6px' }}
                                >
                                    删除
                            </Button>
                            </Popconfirm>

                        </div>
                    )
                }
            }
        ]
    }

    handleDelete = (key, id) => {
        fetch('http://47.101.144.170:8112/api/project/delete?id=' + id, {
            credentials:'include',
            method: 'get',
            headers: {
                'content-type': 'appplication/json'
            }
        }).then(res => {
            res.json().then(data => {
                if (data.rspCode === '000000') {
                    const args = {
                        message: 'Success!',
                        description: '删除成功.',
                        duration: 1,
                    };
                    notification.open(args);
                    const data = [...this.state.data];
                    this.setState({ data: data.filter(item => item.key !== key) });
                } else {
                    const args = {
                        message: 'Error!',
                        description: '删除失败.',
                        duration: 1,
                    };
                    notification.open(args);
                }
            })
        }).catch(error => {
            console.log(error);
        })
    }

    componentDidMount() {
        setTimeout(() => {
            fetch('http://47.101.144.170:8112/api/project/listAll', {
                credentials:'include',
                method: 'get',
                headers: {
                    'Accept':'application/json',
                    'content-type': 'application/json'
                }
            }).then(res => {
                res.json().then(data => {
                    for (let i = 0; i < data.data.length; i++) {
                        data.data[i]['key'] = i;
                    }
                    this.setState({
                        data: data.data
                    })
                })
            }).catch(err => {
                console.log(err);
            })
        }, 100)
    }

    render() {
        return (
            <div className='getProjectList'>
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
        );
    }
}

export default getProjectList;

