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
    <section className='form'>
      <SelectPlatform handleChange={handlePlatformChange} className="form__input"/>
      <SelectCategory handleChange={handleCategoryChange} className="form__input"/>
      <SelectSorting handleChange={handleSortingChange} className="form__input"/>
      <Button type='primary' onClick={handleSubmit} className='form__button'>search</Button>
    </section>
    
  )
}

export default SelectForm