import React from 'react'
// import { Select, Space } from 'antd'
import { Button, Select, Space } from 'antd';

const SelectCategory = ({handleChange}) => {

  const categories = [
    "mmorpg", "shooter", "strategy", "moba", "racing", "sports",
    "social", "sandbox", "open-world", "survival", "pvp", "pve",
    "pixel", "voxel", "zombie", "turn-based", "first-person", "third-person",
    "top-down", "tank", "space", "sailing", "side-scroller", "superhero",
    "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps",
    "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg",
    "action", "military", "martial-arts", "flight", "low-spec",
    "tower-defense", "horror", "mmorts"
  ];
  const { Option } = Select;

  return (
    <Select
      allowClear="true"
      placeholder="select category"
      onChange={handleChange}
      optionLabelProp="label"
    >
      {
        categories.map(category => {
          return(
            <Option key={category} value={category} label={category}>
              <Space>
                {category}
              </Space>
            </Option>
          )
        })
      }
    </Select>
  )
}

export default SelectCategory