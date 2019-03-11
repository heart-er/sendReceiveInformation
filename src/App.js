import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch,Link } from 'react-router-dom'
import Login from './components/Login/login'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Header from './components/header/header'
import AddProject from './components/AboutProject/addProject'
import GetProjectList from './components/AboutProject/getProjectList'
import PhoneGetMessage from './components/AboutMessage/phoneGetMessage'
import ProjectGetMessage from './components/AboutMessage/projectGetMessage'
import UpdateProject from './components/AboutProject/updateProject'
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;
class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => (
            <Redirect to='/login' />
          )} />
          <Route exact path='/login' component={Login} />
          <Layout >
            <Header />
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '50px 16px' }}>
              </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff', height: '600px' }}>
                  <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      style={{ height: '100%' }}
                    >
                      <SubMenu key="sub1" title={<span><Icon type="user" />项目相关</span>}>
                        <Menu.Item key="1"><Link to='/addProject'>新增项目</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/getProjectList'>获取项目列表</Link></Menu.Item>
                      </SubMenu>
                      <SubMenu key="sub2" title={<span><Icon type="laptop" />短信相关</span>}>
                        <Menu.Item key="6"><Link to='/phoneGetMessage'>获取短信列表</Link></Menu.Item>
                        <Menu.Item key="7"><Link to='/projectGetMessage'>获取最新短信</Link></Menu.Item>
                      </SubMenu>
                    </Menu>
                  </Sider>
                  <Content style={{ padding: '0 24px', minHeight: 280 }}>
                      <Route exact path='/addProject' component={AddProject} />
                      <Route exact path='/getProjectList' component={GetProjectList} />
                      <Route exact path='/phoneGetMessage' component={PhoneGetMessage} />
                      <Route exact path='/projectGetMessage' component={ProjectGetMessage} />
                      <Route exact path='/getProjectList/updateProject' component={UpdateProject} />
                  </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            </Footer>
          </Layout>
        </Switch>
      </Router>
    )
  }

}

export default App;
