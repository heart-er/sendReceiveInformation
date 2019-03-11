import React, { Component } from 'react'
import { Form, Input, Button, notification } from 'antd';

const FormItem = Form.Item;
class addProject extends Component {

    state = {
        ProjectNameValue: '',
        ProjectRegexValue: ''
    }

    handleProjectName = (e) => {
        this.setState({
            ProjectNameValue: e.target.value
        })
    }

    handleProjectRegex = (e) => {
        this.setState({
            ProjectRegexValue: e.target.value
        })
    }

    addProjectInformation = (e) => {
        const param = JSON.stringify({
            projectName: this.state.ProjectNameValue,
            projectRegex: this.state.ProjectRegexValue
        })
        fetch('http://47.101.144.170:8112/api/project/create', {
            credentials:'include',
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: param
        }).then(res => {
            res.json().then(data => {
                if(data.rspCode==='000000'){
                    const args = {
                        message: 'Success!',
                        description: '创建成功.',
                        duration:1,
                    };
                    notification.open(args);
                }else if(data.rspPsg==='000222'){
                    const args = {
                        message: 'Warning!',
                        description: '该项目已存在.',
                        duration:1,
                    };
                    notification.open(args);
                }else{
                    const args = {
                        message: 'Error!',
                        description: '创建失败.',
                        duration:1,
                    };
                    notification.open(args);
                }
                
            })
        }).catch(err => {
            console.log(err);
            console.log("操作成功");
        })
    }

    render() {
        return (
            <div className='addProject' style={{ margin: '1em' }}>
                <div className='ProjectName' style={{ display: 'flex' }}>
                    <span style={{ width: '60px', fontSize: '16px', marginTop: '2px' }}>项目名: </span>
                    <Input onChange={this.handleProjectName} style={{ width: '300px' }} />
                </div>
                <div className='ProjectRegex' style={{ display: 'flex', marginTop: '1em' }}>
                    <span style={{ width: '130px', fontSize: '16px', marginTop: '2px' }}>验证码抽取规则: </span>
                    <Input onChange={this.handleProjectRegex} style={{ width: '300px' }} />
                </div>
                <FormItem
                    wrapperCol={{ span: 12, }}
                    style={{ marginLeft: '4.2em', marginTop: '1em' }}
                >
                    <Button type="primary" onClick={this.addProjectInformation} htmlType="submit">提交</Button>
                </FormItem>
            </div>
        )
    }
}
export default addProject;