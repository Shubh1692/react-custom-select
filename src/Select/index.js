
/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import './Select.css'

const defaultOptions = {
  valueFieldName: 'value',
  labelFiledName: 'label',
  showPlaceHolder: true,
  placeHoldder: 'Select',
  multi: true
}

const defaultStyle = {
  width: '100%'
}
class Select extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func,
    selectOptions: PropTypes.array,
    options: PropTypes.object,
    name: PropTypes.string.isRequired,
    selected: PropTypes.any,
    disabled: PropTypes.bool,
    disabledClassName: PropTypes.string,
    required: PropTypes.bool,
    style: PropTypes.object
  };
  static defaultProps = {
    onSelect: () => { },
    selectOptions: [],
    options: defaultOptions,
    selected: null,
    disabled: false,
    disabledClassName: '',
    required: false
  };

  constructor (props) {
    super(props)
    this.state = {
      openDropdown: false
    }
  }

  componentDidMount () {
    document.addEventListener('mousedown', (event) => { this.handleClickOutside(event) })
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', (event) => { this.handleClickOutside(event) })
  }

  handleClickOutside (event) {
    if (this.dropdownRef && !this.dropdownRef.contains(event.target)) { this.setState({ openDropdown: false }) }
  }

  acessJsonByPath (path, json) {
    return path.split('.').reduce((o, k) => {
      return o && o[k]
    }, json)
  }

  selectedValue (valueFieldName, selected) {
    return this.acessJsonByPath(valueFieldName, selected) || selected
  }

  blankSelectedValue (valueFieldName, labelFiledName, placeHoldder) {
    let blankObj = {}
    valueFieldName.split('.').reverse().forEach((p, i) => {
      i === 0 ? blankObj[p] = '' : blankObj = { [p]: blankObj }
    })
    blankObj[labelFiledName] = placeHoldder
    console.log(blankObj)
    return blankObj
  }

  render () {
    const { openDropdown } = this.state
    const { selectOptions, options, onSelect, name, selected, disabled, disabledClassName, required, style } = this.props
    const realOPtions = { ...defaultOptions, ...options }
    const customStyle = { ...defaultStyle, ...style }
    const { valueFieldName, labelFiledName, showPlaceHolder, placeHoldder } = realOPtions
    const blankValue = this.blankSelectedValue(valueFieldName, labelFiledName, placeHoldder)
    const selectObject = selectOptions.find((option) => this.acessJsonByPath(valueFieldName, option) === this.selectedValue(valueFieldName, selected)) || blankValue
    console.log('selectObject', selectObject, selected)
    return (
      <div ref={node => {
        this.dropdownRef = node
      }} className={`react-custom-select ${openDropdown ? 'open' : ''}`} onClick={() => {
        if (!disabled) {
          this.setState({
            openDropdown: !openDropdown
          })
        }
      }} style={customStyle}>
        <select style={{
          display: 'none'
        }} value={selected || ''} required={required} onChange={() => { }}>
          {selectOptions.map(option => (<option key={this.acessJsonByPath(valueFieldName, option)} value={this.acessJsonByPath(valueFieldName, option)}>{this.acessJsonByPath(labelFiledName, option)}</option>))}
        </select>
        <span className={`current text-capitalize ${disabled ? disabledClassName || 'disabled' : ''}`}>{selectObject[labelFiledName]}</span><ul className='list' style={customStyle}>
          {showPlaceHolder && <li data-value='value' className={`option focus  text-capitalize ${this.acessJsonByPath(valueFieldName, selectObject) === '' ? 'selected' : ''}`} onClick={() => {
            onSelect(blankValue, name)
          }} style={customStyle}>{placeHoldder}</li>}
          {selectOptions.map(option => (<li key={this.acessJsonByPath(valueFieldName, option)} data-value='value' className={`option focus  text-capitalize ${this.selectedValue(valueFieldName, selected) === this.acessJsonByPath(valueFieldName, option) ? 'selected' : ''}`} onClick={() => {
            onSelect(option, name)
          }} style={customStyle}>{this.acessJsonByPath(labelFiledName, option)}</li>))}</ul></div>
    )
  }
}

export default Select
