import React from 'react'
import SelectCategory from './SelectCategory'
import SelectSorting from './SelectSorting'
import SelectPlatform from './SelectPlatform'
import { Button } from 'antd'
import { useState } from 'react'

const SelectForm = ({ onSearch }) => {
  const [formValue, setFormValue] = useState({ //--
    platform: '',
    category: '',
    sorting: ''
  })
  // const navigate = useNavigate();
  
  const handleCategoryChange = (value) => {
    setFormValue({
      ...formValue,
      category: value
    })
  }

  const handleSortingChange = (value) => {
    setFormValue({
      ...formValue,
      sorting: value
    })
  }

  const handlePlatformChange = (value) => {
    setFormValue({
      ...formValue,
      platform: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formValue);
  }

  return (
    <>
      <SelectPlatform handleChange={handlePlatformChange} />
      <SelectCategory handleChange={handleCategoryChange} />
      <SelectSorting handleChange={handleSortingChange} />
      <Button type='primary' onClick={handleSubmit}>search</Button>
    </>
    
  )
}

export default SelectForm