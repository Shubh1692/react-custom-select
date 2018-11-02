
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './Select.css';

const defaultOptions = {
  valueFieldName: 'value',
  labelFiledName: 'label',
  showPlaceHolder: true,
  placeHoldder: 'Select',
  multi: true
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
    required: PropTypes.bool
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

  constructor(props) {
    super(props);
    this.state = {
      openDropdown: false
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', (event) => { this.handleClickOutside(event) });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', (event) => { this.handleClickOutside(event) });
  }

  handleClickOutside(event) {
    if (this.dropdownRef && !this.dropdownRef.contains(event.target))
      this.setState({ openDropdown: false });
  }

  render() {

    const { openDropdown } = this.state;
    const { selectOptions, options, onSelect, name, selected, disabled, disabledClassName, required } = this.props;
    const realOPtions = {...defaultOptions, ...options};
    const { valueFieldName, labelFiledName, showPlaceHolder, placeHoldder } = realOPtions;
    const selectObject = selectOptions.find((option) => option[valueFieldName] === selected) || { [valueFieldName]: '', [labelFiledName]: placeHoldder };
    return (
      <div ref={node => {
        this.dropdownRef = node;
      }} className={`react-custom-select ${openDropdown ? 'open' : ''}`} onClick={() => {
        if (!disabled) {
          this.setState({
            openDropdown: !openDropdown
          });
        }
      }}>
        <select style={{
          display: 'none'
        }} value={selected} required={required} onChange={()=>{}}>
          {selectOptions.map(option => (<option key={option[valueFieldName]} value={option[valueFieldName]}>{option[labelFiledName]}</option>))}
        </select>
        <span className={`current text-capitalize ${disabled ? disabledClassName || 'disabled' : ''}`}>{selectObject[labelFiledName]}</span><ul className="list">
          {showPlaceHolder && <li data-value="value" className={`option focus  text-capitalize ${selectObject[valueFieldName] === '' ? 'selected' : ''}`} onClick={() => {
            onSelect({ [valueFieldName]: '', [labelFiledName]: placeHoldder }, name);
          }}>{placeHoldder}</li>}
          {selectOptions.map(option => (<li key={option[valueFieldName]} data-value="value" className={`option focus  text-capitalize ${selected === option[valueFieldName] ? 'selected' : ''}`} onClick={() => {
            onSelect(option, name);
          }}>{option[labelFiledName]}</li>))}</ul></div>
    );
  }
}

export default Select;
