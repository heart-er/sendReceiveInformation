import React, { Component } from 'react'
import { Form, Input, Button, Table, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
const Option = Select.Option;
const columns = [
    {
        title: '发件人',
        dataIndex: 'sendPhone',
        key: 'sendPhone',
        align: 'center'
    },
    {
        title: '验证码',
        dataIndex: 'verCode',
        key: 'verCode',
        align: 'center'
    },
    {
        title: '接受短信时间',
        dataIndex: 'receiveTime',
        key: 'receiveTime',
        align: 'receiveTime'
    },
    {
        title: '短信内容',
        dataIndex: 'content',
        key: 'content',
        align: 'center'
    },
];

class PhoneGetMessage extends Component {
    state = {
        data: [],
        getProjectName: '',
        getPhoneNumber: '',
        ProjectNameArrays: []
    }



    componentDidMount() {
        fetch(`http://47.101.144.170:8112/api/project/listAll`, {
            credentials:'include',
            method: 'get',
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            res.json().then(data => {
                this.setState({
                    ProjectNameArrays: data.data
                })
            })
        }).catch(err => {
            console.log(err);
        })
    }

    handleGetProjectName = (value) => {
        this.setState({
            getProjectName: value
        })
    }

    handleGetPhoneNumber = (e) => {
        this.setState({
            getPhoneNumber: e.target.value
        })
    }



    render() {

        const nameArray = this.state.ProjectNameArrays.map((item) => (
            <Option key={item.id} value={item.id}>{item.projectName}</Option>
        ))
        return (
            <div className='PhoneGetMessage'>
                <Form layout="inline" >
                    <FormItem>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="项目名"
                            optionFilterProp="children"
                            onChange={this.handleGetProjectName}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {nameArray}
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Input placeholder="手机号" onChange={this.handleGetPhoneNumber} />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={() => {
                            Date.prototype.toLocaleString = function () {
                                return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + "  " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
                            }
                            console.log(this.state.getProjectName);
                            fetch(`http://47.101.144.170:8112/api/phoneSms/listByProjectIdPhone?projectId=${this.state.getProjectName}&phone=${this.state.getPhoneNumber}&page=1&pageSize=5`, {
                                credentials: 'include',
                                method: 'get',
                                headers: {
                                    'content-type': 'application/json'
                                }
                            }).then(res => {
                                res.json().then(data => {
                                    for (let i = 0; i < data.data.list.length; i++) {
                                        data.data.list[i]['key'] = i;
                                        var unitTimestamp = new Date(data.data.list[i].receiveTime);
                                        data.data.list[i].receiveTime = unitTimestamp.toLocaleString();
                                    }
                                    this.setState({
                                        data: data.data.list
                                    })
                                })
                            }).catch(err => {
                                console.log(err);
                            })
                        }}>查询</Button>
                    </FormItem>
                </Form>
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        )
    }
}

export default PhoneGetMessage;

