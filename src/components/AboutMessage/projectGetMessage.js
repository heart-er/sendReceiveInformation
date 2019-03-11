import React, { Component } from 'react'
import { Form, Input, Button, Table, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
const Option = Select.Option;


class ProjectGetMessage extends Component {
    state = {
        name: "",
        data: [],
        getProjectName: '',
        getPhoneNumber: '',
        ProjectNameArrays: [],
        columns: [
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
        ]
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
            <div className='ProjectGetMessage'>
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
                            this.setState({
                                data: []
                            })
                            fetch(`http://47.101.144.170:8112/api/phoneSms/getByProjectIdPhone?projectId=c1f22c6be28b11e88348525400c5b7ee&phone=17139456534`, {
                                credentials: 'include',
                                method: 'get',
                                headers: {
                                    'content-type': 'application/json'
                                }
                            }).then(res => {
                                res.json().then(data => {
                                    console.log(data.data);
                                    data.data['key'] = 1;
                                    var unitTimestamp = new Date(data.data.receiveTime);
                                    data.data.receiveTime = unitTimestamp.toLocaleString();
                                    this.setState({
                                        data: [...this.state.data, data.data]
                                    })
                                    console.log(this.state.data);
                                })
                            }).catch(err => {
                                console.log(err);
                            })
                        }}>查询</Button>
                    </FormItem>
                </Form>
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
        )
    }
}

export default ProjectGetMessage;

