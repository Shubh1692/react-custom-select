import React, { Component } from 'react';
import Select from './Select';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCount : {}
    }
  }
  onSelect(selecteOptions, fieldName) {
    this.setState({
      [fieldName]: selecteOptions
    });
  }
  render() {
    const {viewCount} = this.state;
    const viewOptions = [{ label: 12, value: 12 }, { label: 24, value: 24 }, { label: 48, value: 48 }, { label: 96, value: 96 }];
    const viewCountSelectProps = {
      options: {
        valueFieldName: 'value',
        labelFiledName: 'label',
        showPlaceHolder: true,
      },
      selectOptions: viewOptions,
      selected: viewCount && viewCount.value ? viewCount.value : '',
      name: 'viewCount',
      required: true,
      disabled: false,
      onSelect: (selecteOptions, fieldName) => this.onSelect(selecteOptions, fieldName)
    }
    return (
      <div className="App">
        <Select {...viewCountSelectProps} />
      </div>
    );
  }
}

export default App;
