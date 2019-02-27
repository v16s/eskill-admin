import React, { Component } from 'react'
import history from './history'
import NewCards from './NewCards'
import { Form, Icon, Input, Layout, Menu, Select, Card } from 'antd'
import moment from 'moment'
const { Header, Content, Footer, Sider } = Layout
const InputGroup = Input.Group
const Option = Select.Option
const { Meta } = Card
const { SubMenu } = Menu
const Search = Input.Search

class StudentCards extends React.Component{
    render () {
        
    return(
          <div>
          <Search
            placeholder='input search text'
            onSearch={value => console.log(value)}
           style={{ width: '100%' }}
          />
          <Card hoverable='true' bordered='false' 
            title='Test :   ID'
            onClick={() => {
              history.push('/questionpg')
            }}
            style={{ width: 300, marginTop: 16 }}
                     actions={[<Icon type="edit" theme="twoTone" twoToneColor="#a0d911" />]}>
              <Meta title='No of Teacher' description='30' />
            </Card>
          </div>
         )
      }
        }
export default StudentCards