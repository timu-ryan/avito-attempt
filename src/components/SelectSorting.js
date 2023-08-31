import React from 'react'
import { Select, Space } from 'antd'

const SelectSorting = ({handleChange}) => {

  const { Option } = Select;
  const sortBy = ["release-date", "popularity", "alphabetical", "relevance"];
  return (
    <Select
      // mode="multiple"
      // style={{
      //   width: '30%',
      // }}
      placeholder="choose how to sort"
      // defaultValue={['china']}
      onChange={handleChange}
      name="sorting"
      optionLabelProp="label"
    >
      {
        sortBy.map(sortBy => {
          return(
            <Option key={sortBy} value={sortBy} label={sortBy}>
              <Space>
                {sortBy}
              </Space>
            </Option>
          )
        })
      }
    </Select> 
  )
}

export default SelectSorting