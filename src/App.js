import React, { Component } from 'react'
import Select from './Select'
import './App.css'
import { countryList } from './exampleOptions'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewCount: null,
      menuName: 'baisc'
    }
  }
  onSelect (selecteOptions, fieldName) {
    this.setState({
      [fieldName]: selecteOptions
    })
  }

  onMenuSelect (menuName) {
    this.setState({
      menuName: menuName
    })
  }
  render () {
    const { selected, menuName } = this.state
    const nestedViewOptions = [{
      label: 12,
      value: { name: 12 }
    }, { label: 24, value: { name: 24 } }, { label: 48, value: { name: 48 } }, { label: 96, value: { name: 96 } }]
    const viewCountSelectProps = {
      options: {
        valueFieldName: 'code',
        labelFiledName: 'name',
        showPlaceholder: true
      },
      selectOptions: countryList,
      selected,
      name: 'selected',
      required: true,
      disabled: false,
      style: {
        textAlign: 'center'
      },
      isSearch: true,
      isClearable: false,
      searchOptions: {
        placeholder: 'Please seach'
      },
      onSelect: (selecteOptions, fieldName) => this.onSelect(selecteOptions, fieldName)
    }
    const nestedOptionSelectProps = {
      options: {
        valueFieldName: 'value.name',
        labelFiledName: 'label',
        showPlaceholder: true
      },
      selectOptions: nestedViewOptions,
      selected,
      name: 'selected',
      required: true,
      disabled: false,
      style: {
        textAlign: 'center'
      },
      onSelect: (selecteOptions, fieldName) => this.onSelect(selecteOptions, fieldName)
    }
    console.log('menuName', menuName)
    return (
      <div className='App'>
        <div className='app-container'>
          <div className='vertical-menu'>
            <div className={`btn ${menuName === 'baisc' ? 'active' : ''}`} onClick={() => this.onMenuSelect('baisc')}>Baisc Select</div>
            <div className={`btn ${menuName === 'nestedObjectOption' ? 'active' : ''}`} onClick={() => this.onMenuSelect('nestedObjectOption')}>Nested Object Option Select</div>
            {/* <div className="btn ">Link 2</div>
            <div className="btn ">Link 3</div>
            <div className="btn ">Link 4</div> */}
          </div>
          <div className='vertical-container'>
            {menuName === 'baisc' && <div>
              <h1> Basic Select </h1>
              <div className='select-example-container'>
                <Select {...viewCountSelectProps} />
              </div>
            </div>}
            {menuName === 'nestedObjectOption' && <div>
              <h1> Nested Object Option Select </h1>
              <div className='select-example-container'>
                <Select {...nestedOptionSelectProps} />
              </div>
            </div>}
          </div>
        </div>
      </div>
    )
  }
}

export default App
