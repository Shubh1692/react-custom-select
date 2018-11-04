
/* eslint-disable react/forbid-prop-types */
/* eslint-disable space-before-function-paren */
import React from 'react'
import PropTypes from 'prop-types'
import './Select.css'

const defaultOptions = {
  valueFieldName: 'value',
  labelFiledName: 'label',
  showPlaceholder: true,
  placeholder: 'Select',
  multi: true
}

const defaultStyle = {
  width: '100%'
}

const defaultListStyle = {
  maxHeight: 200,
  overflowY: 'auto',
  width: '100%'
}

const deafultSearchOptions = {
  placeholder: 'Search'
}

const defaultSelectedStyle = {
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
    style: PropTypes.object,
    isSearch: PropTypes.bool,
    searchOptions: PropTypes.object,
    listStyle: PropTypes.object,
    selectedStyle: PropTypes.object
  };
  static defaultProps = {
    onSelect: () => { },
    selectOptions: [],
    options: defaultOptions,
    selected: null,
    disabled: false,
    disabledClassName: '',
    required: false,
    isSearch: false,
    searchoPtions: {
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      openDropdown: false,
      searchList: props.selectOptions,
      search: ''
    }
  }
  componentWillMount() {
    document.onkeydown = e => {
      switch (e.keyCode) {
        case 38:
          console.info('up')
          break
        case 40:
          console.info('down')
          break
      }
    }
  }
  componentDidMount() {
    document.addEventListener('mousedown', (event) => { this.handleClickOutside(event) })
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', (event) => { this.handleClickOutside(event) })
  }

  handleClickOutside(event) {
    if (this.dropdownRef && !this.dropdownRef.contains(event.target)) { this.setState({ openDropdown: false }) }
  }

  acessJsonByPath(path, json) {
    return path.split('.').reduce((o, k) => {
      return o && o[k]
    }, json)
  }

  selectedValue(valueFieldName, selected) {
    return this.acessJsonByPath(valueFieldName, selected) || selected
  }

  blankSelectedValue(valueFieldName, labelFiledName, placeholder) {
    let valudFieldObject = {}
    let labelFiledObject = {}
    valueFieldName.split('.').reverse().forEach((p, i) => {
      i === 0 ? valudFieldObject[p] = '' : valudFieldObject = { [p]: valudFieldObject }
    })
    labelFiledName.split('.').reverse().forEach((p, i) => {
      i === 0 ? labelFiledObject[p] = placeholder || '' : labelFiledObject = { [p]: labelFiledObject }
    })

    console.log(valudFieldObject, labelFiledObject)
    return { ...labelFiledObject, ...valudFieldObject }
  }

  filterList(event, valueFieldName, labelFiledName) {
    let searchList = this.props.selectOptions
    searchList = searchList.filter((option) => {
      return (this.selectedValue(valueFieldName, option).toString().toLowerCase().search(
        event.target.value.toLowerCase()) !== -1) || (this.selectedValue(labelFiledName, option).toString().toLowerCase().search(event.target.value.toLowerCase()) !== -1)
    })
    this.setState({ searchList, search: event.target.value })
  }

  onSelect(option, name) {
    this.setState({
      openDropdown: false,
      search: ''
    }, () => {
      this.props.onSelect(option, name)
    })
  }

  onSelectOpen(openDropdown, disabled) {
    if (!disabled) {
      this.setState({
        openDropdown: !openDropdown,
        search: ''
      }, () => {
        if (this.searchInputRef) {
          this.searchInputRef.focus()
        }
      })
    }
  }

  render() {
    const { openDropdown, search, searchList } = this.state
    const { selectOptions, options, name, selected, disabled, disabledClassName, required, style, isSearch, searchOptions, listStyle, selectedStyle } = this.props
    const realOPtions = { ...defaultOptions, ...options }
    const customStyle = { ...defaultStyle, ...(style || {}) }
    const customListStyle = { ...defaultListStyle, ...(listStyle || {}) }
    const customSelectedStyle = { ...defaultSelectedStyle, ...(selectedStyle || {}) }
    const customSearchOptions = { ...deafultSearchOptions, ...searchOptions }
    const { valueFieldName, labelFiledName, showPlaceholder, placeholder } = realOPtions
    const blankValue = this.blankSelectedValue(valueFieldName, labelFiledName, placeholder)
    const selectObject = selectOptions.find((option) => this.acessJsonByPath(valueFieldName, option) === this.selectedValue(valueFieldName, selected)) || blankValue
    console.log('selectObject', selectObject, selected)
    return (
      <div ref={node => {
        this.dropdownRef = node
      }} className={`react-custom-select ${openDropdown ? 'open' : ''}`} style={customStyle}>
        <select style={{
          display: 'none'
        }} value={selected || ''} required={required} onChange={() => { }}>
          {selectOptions.map(option => (<option key={this.acessJsonByPath(valueFieldName, option)} value={this.acessJsonByPath(valueFieldName, option)}>{this.acessJsonByPath(labelFiledName, option)}</option>))}
        </select>
        <div className='selected' onClick={() => this.onSelectOpen(openDropdown, disabled)} style={customSelectedStyle}>
          <span className={`current text-capitalize ${disabled ? disabledClassName || 'disabled' : ''}`}>{this.acessJsonByPath(labelFiledName, selectObject)}</span> </div>
        <ul className='list' style={customListStyle}>
          {isSearch && <div className='select-search' style={customStyle}>
            <input ref={searchInputRef => (this.searchInputRef = searchInputRef)} type='text' value={search} className='' placeholder={customSearchOptions.placeholder} onChange={(event) => this.filterList(event, valueFieldName, labelFiledName)} style={customStyle} />
          </div>}
          {showPlaceholder && search.trim().length === 0 && <li data-value='value' className={`option focus  text-capitalize ${this.acessJsonByPath(valueFieldName, selectObject) === '' ? 'selected' : ''}`} onClick={() => {
            this.onSelect(blankValue, name)
          }} style={customStyle}>{placeholder}</li>}
          {searchList.map(option => (<li key={this.acessJsonByPath(valueFieldName, option)} data-value='value' className={`option focus  text-capitalize ${this.selectedValue(valueFieldName, selected) === this.acessJsonByPath(valueFieldName, option) ? 'selected' : ''}`} onClick={() => {
            this.onSelect(option, name)
          }} style={customStyle}><div className='select-option'>{this.acessJsonByPath(labelFiledName, option)}</div></li>))}
        </ul></div >
    )
  }
}

export default Select
