import React, { Component } from 'react'
import { Form, Input, Button, Icon , notification } from 'antd';
import { Link } from 'react-router-dom'
const FormItem = Form.Item;

class UpdateProject extends Component {
    state = {
        ProjectName:'',
        ProjectRegexValue: ''
    }
    handleProjectName = (e) => {
        this.setState({
            ProjectName: e.target.value
        })
    }

    handleProjectRegex = (e) => {
        this.setState({
            ProjectRegexValue: e.target.value
        })
    }

    updateProjectInformation = () => {
        const param = JSON.stringify({
            id: localStorage.getItem("needUpdateProjectId"),
            projectName:this.state.ProjectName,
            projectRegex: this.state.ProjectRegexValue
        })
        console.log(param);
        fetch('http://47.101.144.170:8112/api/project/update', {
            credentials:'include',
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: param
        }).then(res => {
            res.json().then(data => {
                if (data.rspCode === '000000') {
                    const args = {
                        message: 'Success!',
                        description: '修改成功.',
                        duration: 1,
                    };
                    notification.open(args);
                } else {
                    const args = {
                        message: 'Error!',
                        description: '创建失败.',
                        duration: 1,
                    };
                    notification.open(args);
                }
            })
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className='updateProject' style={{ margin: '1em' }}>
                <Link to="/getProjectList"><Icon type="left" style={{ cursor: 'pointer' }} /></Link>
                <div className='ProjectRegex' style={{ display: 'flex', marginTop: '1em' }}>
                    <span style={{ width: '130px', fontSize: '16px', marginTop: '2px' }}>项目名称: </span>
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
                    <Button type="primary" onClick={this.updateProjectInformation} htmlType="submit">提交</Button>
                </FormItem>
            </div>
        )
    }
}
export default UpdateProject;