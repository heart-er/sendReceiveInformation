import React, { Component } from 'react';
import { Form, Icon, Input, Button, notification, Spin } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    state = {
        username: '',
        password: '',
        isShow: false
    }
    handleName = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    loginUser = () => {
        const param = JSON.stringify({
            userName: this.state.username,
            password: this.state.password
        })
        this.setState({
            isShow: true
        })
        setTimeout(() => {
            this.setState({
                isShow: false
            })
        },1000)
        fetch('http://47.101.144.170:8112/api/login', {
            credentials:'include',
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: param
        }).then(res => {
            res.json().then(data => {
                if (data.rspMsg === '操作成功') {
                    localStorage.setItem('username',this.state.username);
                    localStorage.setItem("author",data.data);
                    const args = {
                        message: 'Success!',
                        description: '登录成功.',
                        duration: 1,
                    };
                    notification.open(args);
                    
                    this.props.history.push('/addProject');
                } else {
                    const args = {
                        message: 'Error!',
                        description: '登录失败.',
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
        const log = {
            textAlign: 'center !important',
            padding: '30px',
            width: '400px',
            height: '300px',
            background: 'rgba(255, 255, 255, 0.5)',
            position: 'absolute',
            left: '0',
            right: '0',
            top: '20%',
            bottom: '0',
            margin: '0 auto'
        }
        const pos={
            textAlign: 'center !important',
            padding: '30px',
            width: '400px',
            height: '300px',
            position: 'absolute',
            left: '0',
            right: '0',
            top: '30%',
            bottom: '0',
            margin: '0 auto',
            fontSize: '100',
            zIndex:'10000000'
        }
        const antIcon = this.state.isShow ? <Spin tip="登录中..." style={pos}></Spin> : "";
        return (
            <div className='login'>
                {antIcon}
                <img id="image" alt="img" src="lgBackground.jpg" style={{ position: 'absolute', width: '100%', height: '100%', backgroundSize: 'cover', filter: 'blur(5px)' }} />
                <div className='content' style={log}>
                    <Form className="login-form" style={{ marginTop: '2em' }}>
                        <FormItem>
                            <Input onChange={this.handleName} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        </FormItem>
                        <FormItem>
                            <Input onChange={this.handlePassword} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        </FormItem>
                        <FormItem>
                            <Button onClick={this.loginUser} type="primary" htmlType="submit" block className="login-form-button">
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Login;