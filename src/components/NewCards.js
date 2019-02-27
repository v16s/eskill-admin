import React, { Component } from 'react'
import history from './history'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Layout, Menu, Select, Card } from 'antd'
import moment from 'moment'
import { Button } from 'antd/lib/radio';
const { Header, Content, Footer, Sider } = Layout
const InputGroup = Input.Group
const Option = Select.Option
const { Meta } = Card
const { SubMenu } = Menu
class NewCards extends React.Component {
  constructor(props){
    super(props);
  }

    render () {
      return (
        <Card hoverable='true' bordered='false' 
        title='Test :   ID'
        onClick={() => {
          history.push('/testassign')
        }}
        style={{ width: 300, marginTop: 16 }}
                 actions={[<Icon type="edit" theme="twoTone" twoToneColor="#a0d911" />]}>
          <Meta title='No of students' description={this.props.sn} />
          <Meta title='No of Teacher' description='30' />
        </Card>
      )
    }
  }
  
  export default NewCards;
  