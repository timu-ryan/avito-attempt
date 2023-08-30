import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api';
import { Button } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';

const GamePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentGame, setCurrentGame] = useState({
    thumbnail: '',
    screenshots: [],
    release_date: '',
    publisher: '',
    developer: '',
    genre: '',
    minimum_system_requirements: {os: ''}
  })
  const [isLoading, setIsLoading] = useState(false)

  // api.getSpecificGame(id)
  //   .then(res => setCurrentGame(res))
  //   .catch(err => console.log(err))
  useEffect(() => {
    setIsLoading(true)
    api.getSpecificGame(id)
      .then(res => {
        setCurrentGame(res)
        return res;
      })
      .catch(err => console.log(err))
      .finally(res => setIsLoading(false))
  }, []);

  const handleBackClick = () => {
    navigate('/')
  }
  // название
  // дата релиза (в российском формате)
  // издатель
  // разработчик
  // жанр
  // картинка/постер
  // карусель скриншотов
  // системные требования

  return (
    <>
      <Spin spinning={isLoading} />
      <Button 
        type="default" 
        shape="circle" 
        icon={<CaretLeftOutlined />} 
        size='middle' 
        onClick={handleBackClick} 
      />
      <h1>{currentGame.title}</h1>
      <Image
        width={500}
        src={currentGame.thumbnail}
      />
      <p>фотогалерея скриншотов: </p>
      <Image.PreviewGroup
        items={currentGame.screenshots.map(game => game.image)}
      >
        <Image
          width={200}
          src={currentGame.thumbnail}
        />
      </Image.PreviewGroup>
      <ul>
        <li>{currentGame.release_date}</li>
        <li>{currentGame.publisher}</li>
        <li>{currentGame.developer}</li>
        <li>{currentGame.genre}</li>
      </ul>
      <p>минимальные системные требования:</p>
      <ul>
        {/* {Object.entries(currentGame.minimum_system_requirements).map(arr => (
          <li>
            {arr[0]}: {arr[1]}
          </li>
        ))} */}
      </ul>
      <p>{currentGame.description}</p>
    </>
  )
}

export default GamePage