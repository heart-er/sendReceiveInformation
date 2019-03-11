import React, { Component } from 'react';
import {notification} from 'antd'
import {withRouter} from 'react-router-dom'

import '../../assets/style.css'

class Header extends Component{
    
    logOUt=()=>{
        fetch('http://47.101.144.170:8112/api/loginOut',{
            credentials:'include',
            method: 'get',
            headers: {
                'content-type': 'application/json'
            }
        }).then(res=>{
            
            res.json().then(data=>{
                if(data.rspMsg==='操作成功'){
                    localStorage.setItem('author',"");
                    this.props.history.push('/login');
                    const args = {
                        message: 'Success!',
                        description: '登出成功.',
                        duration: 1,
                    };
                    notification.open(args);
                }else{
                    const args = {
                        message: 'Success!',
                        description: '登出失败.',
                        duration: 1,
                    };
                    notification.open(args);
                    return;
                }
            })
        }).catch(error=>{
            const args = {
                message: 'Success!',
                description: '登出失败.',
                duration: 1,
            };
            notification.open(args);
            console.log(error);
        })
    }
    render(){
        const name=localStorage.getItem('username');

        const logOut={
            color:'white',
            marginLeft:'6px',
        }
        const divUser=name?<div className='username' style={{marginRight:'55px',marginTop:'1em'}}>
                        <span style={{color:'black',fontSize:'20px'}}>{name}</span>
                        <span style={logOut} className='logOut' onClick={this.logOUt}>退出</span>
                    </div>:"";
        return(
            <div className="headerMenu" style={{height:'80px',background:'#0099FF',display:'flex',justifyContent:'space-between'}}>
                <div className='headerContent' style={{marginLeft:'3em',marginTop:'1em'}}>
                    <img src="logo.png" style={{width:'50px',height:'50px'}} alt=""/>
                    <span style={{color:'white',fontSize:'35px',fontFamily:'隶书',marginLeft:'0.5em',verticalAlign:'top'}}>短信收发平台</span>
                </div>
                {divUser}
            </div>
        )
    }
}
export default withRouter(Header)
