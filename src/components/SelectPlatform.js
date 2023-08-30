import React from 'react'
import { Button, Select, Space } from 'antd';

const SelectPlatform = ({handleChange}) => {
  const platforms = [
    "pc", "browser", "all"
  ];
  const { Option } = Select;
  return (
    <Select
      allowClear="true"
      style={{
        width: '30%',
      }}
      placeholder="select platform"
      onChange={handleChange}
      optionLabelProp="label"
    >
      {
        platforms.map(platform => {
          return(
            <Option key={platform} value={platform} label={platform}>
              <Space>
                {platform}
              </Space>
            </Option>
          )
        })
      }
    </Select>
  )
}

export default SelectPlatform